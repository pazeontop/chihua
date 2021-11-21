const Command = require('../../structures/Command');
const mongoose = require('mongoose')
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'ticket',
        aliases: ["create", "setup"],
        description: `Create A Ticket sent to a channel.`,
        category: 'Ticket',
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
       .setTitle(`Chihuahua Warzone`)
       .setColor(config.color || '#36393f')
       .setDescription(`` + 
       "\n\n```Για την άμεση εξυπηρέτηση σας μπορείτε να ανοίξετε ένα  ticket ώστε να μιλήσετε με κάποιον αρμόδιο και να λύσετε το πρόβλημα σας .```"+ "\n"+
       "**Για να δημιουργήσετε ένα ticket αντιδράστε με `📩`.**")
       .setThumbnail(`https://cdn.discordapp.com/attachments/911638739695067146/912053383303667712/Chihuahua-hotdogs-logo.png`)
       .setImage(``)
        channel.send(ticketEmbed).then(m => {
        m.react(config.emoji || '📩');
        });


      }
};
