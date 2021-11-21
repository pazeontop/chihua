const Command = require('../../structures/Command');
const mongoose = require('mongoose')
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'connect',
        aliases: ["create", "setup"],
        description: `Know who developer is`,
        category: 'developer',
        cooldown: 3,
        userPermission: ['MANAGE_GUILD']
      });
    }

    async run(message, args) {

      
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if(!channel){
            channel = message.channel;
        };
        

        let ticketEmbed = new Discord.MessageEmbed()
       .setTitle(`Warzone Roleplay`)
       .setColor(config.color || '#36393f')
       .setDescription(`\`1:\` **Ανοίγεται το FiveM.exe** | \`2:\` **Πατάτε το κουμπί START** \n 

       \`3:\` **Πατάτε το κουμπί F8** | \`4:\` **Γράφετε coming soon.....**`)
       .setThumbnail(`https://cdn.discordapp.com/attachments/911638739695067146/912053383303667712/Chihuahua-hotdogs-logo.png`)
       .setImage(``)
        channel.send(ticketEmbed).then(m => {
        });


      }
};