const Event = require('../../structures/Event');
const { MessageReaction, User, MessageEmbed } = require("discord.js");
const discord = require("discord.js");
const Discord = require("discord.js");
const moment = require('moment')
const config = require('../../config.json')
/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = class extends Event {
	async run(messageReaction, user) {
	
//ignore bot's reactions
if (this.client.user === user) return;

const { message, emoji } = messageReaction;

// fetch the member
const member = message.guild.members.cache.get(user.id);

// needed for ticket name
let id = user.id.toString().substr(0, 4) + user.discriminator;
let chann = `ticket${user.username}`;


if(emoji.toString() === config.emoji){

	let role;
	if(config.support_role_id){
		role =  message.guild.roles.cache.get(config.support_role_id);
	} else role = message.guild.roles.cache.find(r => r.name === "Ticket Support");

	if(!role) {
		return await message.guild.roles.create({data:{name: "Ticket Support", permissions: 0}, reason: 'Ticket Support Role'});
	  };

	let category;
	if(config.category_id){
		category = message.guild.channels.cache.get(config.category_id)
	} else category = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
	
    if(!category) {
			return await message.guild.channels.create("tickets", {type: "category", position: 1});
	};

    let limit = config.ticket_limit;

	if(limit && Number(limit)){
    limit = Number(limit)
	} else limit = 1

	let array = []
  
	// check for ticket limit
	message.guild.channels.cache.forEach(channel => {
    if(channel.name == chann) array.push(channel.id)
	});


	if(array.length >= limit){
		return message.channel.send(`Ticket Limit Reached. Limit: ${limit}`).then((s)=>[
			s.delete({timeout: 5000}).catch(()=>{})
		])
	};

	  message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})
      message.guild.channels.create(chann, { permissionOverwrites:[
	      {
            deny: 'VIEW_CHANNEL',
            id: message.guild.id
          },
          {
            allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
            id: user.id 
          },
          {
            allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
            id: role.id
          },
		  {
            allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'MANAGE_CHANNELS'],
            id: message.guild.me
          },
        ],
        parent: category.id,
        reason: `Ticket Module`,
        topic: `**ID:** ${user.id} | **Tag:** ${user.tag}`
      }).then(async(channel)=>{
        


        const openEmbed = new discord.MessageEmbed()
		.setColor(message.client.color.green)
		.setDescription(` ${user}!\n\n**Γράψτε το πρόβλημα σας και κάποιος αρμόδιος θα σας εξυπηρετήσει σύντομα!.**`)

		const closeEmbed = new discord.MessageEmbed()
		.setColor(message.client.color.red)
		.setDescription(`**Με react 🔒 μπορείς να κλείσεις το ticket σου .**`)


        channel.send(openEmbed);
		channel.send(closeEmbed).then((pog)=>{
			pog.react('🔒')
	  })

		const embedLog = new discord.MessageEmbed()
		.setColor(message.client.color.green)
		.setThumbnail(`https://cdn.discordapp.com/attachments/911638739695067146/912053383303667712/Chihuahua-hotdogs-logo.png`)
		.setTitle("Νέο Ticket")
		.addField("Information" , `**Ο χρήστης**${user}**άνοιξε το ticket** \`${channel.name}\` \n${moment(new Date()).format
			("```dddd, MMMM Do YYYY    ```")} `)
		
        let logChannel; 
		if(config.log_channel_id){
			logChannel = await message.guild.channels.cache.get(config.log_channel_id)

			if(logChannel){	
				logChannel.send(embedLog)
			}
		}
	  })

      

   



} else if(emoji.toString() === "🔒"){
    
	const ticketClose = new discord.MessageEmbed()
	.setColor(message.client.color.red)
	.setThumbnail(`https://cdn.discordapp.com/attachments/911638739695067146/912053383303667712/Chihuahua-hotdogs-logo.png`)
	.setTitle("Διαγραφή Ticket")
	.addField("Information", `**Ο χρήστης**${user}**έκλεισε το ticket** \`${message.channel.name}\` \n${moment(new Date()).format
		("```dddd, MMMM Do YYYY    ```")} `)
		
	
  
	let logChannel; 
	if(config.log_channel_id){
		logChannel = await message.guild.channels.cache.get(config.log_channel_id)

		if(logChannel){
			logChannel.send(ticketClose)
		}
	};

	message.channel.delete();

}

 
 }
}