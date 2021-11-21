const Command = require('../../structures/Command');
const mongoose = require('mongoose')
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'warzone',
        aliases: ["create", "setup"],
        description: `Create A Application sent to a channel.`,
        category: 'Application',
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
       .setTitle(``)
       .setColor(config.color2 || '#36393f')
       .setDescription(`                       [Warzone roleplay ](https://discord.gg/warzonerp) \n \n **Πατήστε το  Warzone Roleplay για να πάτε στο discord του Warzone Roleplay**`)
       .setImage(``)
        channel.send(ticketEmbed).then(m => {
        });


      }
};