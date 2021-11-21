const Command = require('../../structures/Command');
const mongoose = require('mongoose')
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'rules',
        aliases: ["create", "setup"],
        description: `Create A Rule sent to a channel.`,
        category: 'Rules',
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
       .setTitle(``+"**```Rules                    ```**")
       .setColor(config.color || '#36393f')
       .setFooter("", "https://cdn.discordapp.com/attachments/860891418600013834/887729669728772126/giphy_1.gif")
       .setDescription(`** > 1. Μην παραβιάζετε εντολές από κάποιον ανώτερο από εσάς θα έχετε ποινές \n \n > 2. Όποιος Spammarei στον ασύρματο θα έχει mute 30 λεπτά \n \n > 3. Ποτέ δεν λέμε πληροφορίες για την interpol σε πολίτες \n \n > 4. Ότι παίρνετε και βάζετε στην αποθήκη τα γράφετε εδώ #📦warehouse Όποιος δεν το κάνει θα έχει warning \n \n > 5. Όσοι είστε μέσα στο Game θα είστε και στο call \n \n > 6. Όποιον ακούσω ότι βρίζει και δεν σέβεται τους ανώτερους του θα κατεβαίνει θέση. \n \n > 7. Σεβόμαστε την άποψη του άλλου και την ιεραρχία \n \n > 8. Δεν λέμε σε κανένα ότι είμαστε Ιντερπόλ είμαστε κρυφοί \n \n > 9. Όποιος πουλήσει κάποιο όπλο από την Ιντερπόλ φεύγει perma ban από τον server. \n \n > 10. Όλοι πρέπει όταν μπαίνουμε να γράψουμε ότι μπήκανε εντός υπηρεσίας, για να βλέπουμε τον εβδομαδιαίο σας χρόνο εντός υπηρεσίας, ώστε να παίρνετε τα κατάλληλα μπόνους και τις προαγωγές σας.Γράφετε στο #🕑𝗢𝗻-𝗢𝗳𝗳-𝗗𝘂𝘁𝘆**`)
       .setThumbnail(`https://cdn.discordapp.com/attachments/860891418600013834/887729669728772126/giphy_1.gif`)
       .setImage(`https://cdn.discordapp.com/attachments/874248187542642738/888801664352538685/50214f1f-098e-48e6-8a62-7c051dcdbf4f_interpol-logo.jpg`)
        channel.send(ticketEmbed).then(m => {
        });


      }
};
