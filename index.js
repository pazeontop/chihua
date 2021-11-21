const botclient = require("./bot");
const config = require("./config.json");

// define the client
const bot = new botclient(config);

// load colors
bot.color = require('./colors.js');

//load emojis
bot.emoji = require('./emojis.js');

//start the bot
bot.start();

const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')

    console.log(`Interpol2 !`)


client.on('message', async (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();



      clientoff = message.guild.channels.cache.get(config.kanali)
      
        if (command === 'on') {
            if(!message.member.roles.cache.has(config['staff-team-role'])) return message.reply("you do not have permissions to execute this command");
            const start = new Date().getTime();
    

            db.add(`timeof_${message.guild.id}_${message.author.id}`, start)


            message.react('✅');
      }
      
          
          else if(command === 'off'){
            if(!message.member.roles.cache.has(config['staff-team-role'])) return message.reply("you do not have permissions to execute this command");
            
            const client = db.get(`timeof_${message.guild.id}_${message.author.id}`)
            if(!client) return message.reply(`You are not on shift`)
            if(client) {
                const end = new Date().getTime();
      
                const diff = end - client;
          
                  let hours = Math.floor(diff / 3600000) % 24;
                  let minutes = Math.floor(diff / 60000) % 60;
                  let seconds = Math.floor(diff / 1000) % 60;          
          
          
                  const embed = new Discord.MessageEmbed()
                  .setTitle(message.guild.name)
                  
                  .addFields(
                      {name: "```Name```", value: `<@!${message.author.id}>`},
                      {name: "```Hours:```", value: `${hours}`},
                      {name: "```Minutes:```", value: `${minutes}`},
                      {name: "```Seconds:```", value: `${seconds}`}
                  )
                  
              .setColor(config.color)
               
              clientoff.send(embed)
               db.delete(`timeof_${message.guild.id}_${message.author.id}`)
               message.react('✅');
               db.add(`second_${message.guild.id}_${message.author.id}`, seconds)
               db.add(`minutes_${message.guild.id}_${message.author.id}`, minutes)
               db.add(`hours_${message.guild.id}_${message.author.id}`, hours)
            }

           
      

      
          }
      
      
      if(command == 'hours'){
        message.react('✅');
      const client = message.member.hasPermission(['ADMINISTRATOR'])
      const role = message.member.roles.cache.has(config['staff-team-role'])
      const user = message.mentions.members.first()
      
      
      if(user){
      if(!client) return message.reply(`You are not Staff Manager to see hours of <@!${user.id}>`);
      let second = db.get(`second_${message.guild.id}_${user.id}`)
      let minutes = db.get(`minutes_${message.guild.id}_${user.id}`)
      let hours = db.get(`hours_${message.guild.id}_${user.id}`)
      if(second,minutes,hours === null) {
      const embed = new Discord.MessageEmbed()
      .setDescription(`Δυστυχώς ο <@!${user.id}> δεν έχει πάει ποτέ εντός υπερησίας`)
      .setColor(config.color)
      message.channel.send(embed)
      }else{
      const embed = new Discord.MessageEmbed()
      .addFields(
      {name: "```Name```", value: `<@!${user.id}>`},
      {name: "```Hours:```", value: `${hours}`},
      {name: "```Minutes:```", value: `${minutes}`},
      {name: "```Seconds:```", value: `${second}`}
      )
      .setColor(config.color)
      message.channel.send(embed)
      }
      }
      else if(!user) {
      if(!role) return message.reply(`You do not have permissions`);
      let second = db.get(`second_${message.guild.id}_${message.author.id}`)
      let minutes = db.get(`minutes_${message.guild.id}_${message.author.id}`)
      let hours = db.get(`hours_${message.guild.id}_${message.author.id}`)
      if(second,minutes,hours === null) {
      const embed = new Discord.MessageEmbed()
      .setDescription(`Δυστυχώς ο <@!${message.author.id}> δεν έχει πάει ποτέ εντός υπερησίας`)
      .setColor(config.color)
      message.channel.send(embed)
      }else{
      const embed = new Discord.MessageEmbed()
      .addFields(
      {name: "```Name```", value: `<@!${message.author.id}>`},
      {name: "```Hours:```", value: `${hours}`},
      {name: "```Minutes:```", value: `${minutes}`},
      {name: "```Seconds:```", value: `${second}`}
      )
      .setColor(config.color)
      
      message.channel.send(embed)
      }
      }

      }
      if(command == 'addsec'){
        message.react('✅');
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`you do not have perms`)
        const user = message.mentions.users.first()
        let time = args[1]
        if(!user) return message.reply(`you must mention user to add second`)
        if (!time || isNaN(time)) {
            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('You have to specify the time (1,2,3,etc seconds).')
            return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }))
        }
        
if (time > 1209600000) {
    let embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('You cannot addsec him for more than 14 days.')
    return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }))
}
if (message.author.id === message.guild.me) {
    let embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('You cannot addsec on me.')
    return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }))
}
        db.add(`second_${message.guild.id}_${user.id}`, time)
        message.channel.send(`you put in ${user} ${time}`)

    }
    if(command == 'addmin'){
        message.react('✅');
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`you do not have perms`)
        const user = message.mentions.users.first()
        let time = args[1]
        if(!user) return message.reply(`you must mention user to add minute`)
        if (!time || isNaN(time)) {
            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('You have to specify the time (1,2,3,etc minutes).')
            return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }))
        }
        
if (time > 1209600000) {
    let embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('You cannot addmin him for more than 14 days.')
    return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }))
}
if (message.author.id === message.guild.me) {
    let embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('You cannot addmin on me.')
    return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }))
}
        db.add(`minutes_${message.guild.id}_${user.id}`, time)
        message.channel.send(`you put in ${user} ${time}`) 
    }
    if(command == 'addhours'){
        message.react('✅');
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`you do not have perms`)
        const user = message.mentions.users.first()
        let time = args[1]
        if(!user) return message.reply(`you must mention user to add hours`)
        if (!time || isNaN(time)) {
            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('You have to specify the time (1,2,3,etc minutes).')
            return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }))
        }
        
    if (time > 1209600000) {
    let embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('You cannot addhours him for more than 14 days.')
    return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }))
    }
    if (message.author.id === message.guild.me) {
    let embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('You cannot addhours on me.')
    return message.channel.send(embed).then(msg => msg.delete({ timeout: 8000 }))
    }
        db.add(`hours_${message.guild.id}_${user.id}`, time)
        message.channel.send(`you put in ${user} ${time}`) 
    }
      if(command == 'activity'){
        message.react('✅');
    
        let messages = db.all().filter(data => data.ID.startsWith(`second_${message.guild.id}`)).sort((a, b) => b.data - a.data)
        let minutes = db.all().filter(data => data.ID.startsWith(`minutes_${message.guild.id}`)).sort((a, b) => b.data - a.data)
        let hours = db.all().filter(data => data.ID.startsWith(`hours_${message.guild.id}`)).sort((a, b) => b.data - a.data)
        
        let content = "";
    
        for (let i = 0; i < messages.length; i++) {
            let user = client.users.cache.get(messages[i].ID.split('_')[2]).username
    
            content += `${i+1}. ${user} έχει \`${hours[i].data}:${minutes[i].data}:${messages[i].data}\` \n`
        }
    

            const embed = new Discord.MessageEmbed()
            .setTitle(`**${message.guild.name}'s Hours Leaderboard**`)
            .setDescription("**" + content + "**")
            
            .setColor("RANDOM")
        
            message.channel.send(embed)
    

    
        }
        


        
if(command === 'activityclear'){
    message.react('✅');
    let messages = db.all()
    .map(entry => entry.ID)
    .filter(id => id.startsWith(`second_${message.guild.id}`))
    let minutes = db.all()
    .map(entry => entry.ID)
    .filter(id => id.startsWith(`minutes_${message.guild.id}`))
    let hours = db.all()
    .map(entry => entry.ID)
    .filter(id => id.startsWith(`hours_${message.guild.id}`))

    const embed = new Discord.MessageEmbed()
    .setTitle(``)
    .setDescription("```ready```")
    
    .setColor("DARKBLUE")

    message.channel.send(embed)





    messages.forEach(db.delete)
    minutes.forEach(db.delete)
    hours.forEach(db.delete)
    }
}
    )
 

client.login(config.main_token)


