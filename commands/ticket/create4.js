const Command = require('../../structures/Command');
const mongoose = require('mongoose')
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'apps',
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
        

        let MessageEmbed = new Discord.MessageEmbed()
       .setTitle(`soon ➝➝`)
       .setColor(config.color2 || '#36393f')
       .setDescription(``)
       .setImage(``)
        channel.send(MessageEmbed).then(m => {
        });


      }
};