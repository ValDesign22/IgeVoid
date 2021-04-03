const Discord = require('discord.js');
const moment = require("moment");

exports.run = (client, message, args) => {
         const member = message.mentions.members.first();
         
         moment.locale("fr");

         if (member) {
             const Jeu = member.user.presence.activities || "Aucun"
             
             const nickname = member.user.nickname || "Aucun"
             
             const embed = new Discord.MessageEmbed()
             .setTitle(`Infos de ${member.user.tag}`)
             .addFields(
                 { name: "Name", value: `${member.user.username}` },
                 { name: "Tag", value: `${member.user.tag}` },
                 { name: "ID", value: `${member.user.id}` },
                 { name: "Nickname", value: `${nickname}` },
                 { name: "Compte Créé le", value: moment(member.user.createdAt).format("dddd Do MMMM YYYY, HH:mm:ss") },
                 { name: 'Rejoint le', value: `${moment(member.joinedAt).format('dddd Do MMMM YYYY, HH:mm:ss')}`},
                 { name: 'Status:', value: member.user.presence.status},
                 //{ name: 'Jeu:', value: `${Jeu}` },
                 { name: 'Roles:', value: member.roles.cache.map(r => `${r}`).join(' | ') }
             );

             message.channel.send(embed)
         }
         else {
             const Jeu = message.author.presence.activities || "Aucun"
             
            const nickname = message.member.nickname || "Aucun"
             
            const embed = new Discord.MessageEmbed()
            .setTitle(`Infos de ${message.author.tag}`)
            .addFields(
                { name: "Name", value: `${message.author.username}` },
                { name: "Tag", value: `${message.author.tag}` },
                { name: "ID", value: `${message.author.id}` },
                { name: "Nickname", value: `${nickname}` },
                { name: "Compte Créé le", value: moment(message.author.createdAt).format("dddd Do MMMM YYYY, HH:mm:ss") },
                { name: 'Joined at:', value: `${moment(message.member.joinedAt).format('dddd Do MMMM YYYY, HH:mm:ss')}`},
                { name: 'Status:', value: message.author.presence.status},
                //{ name: 'Jeu:', value: `${Jeu}` },
                { name: 'Roles:', value: message.member.roles.cache.map(r => `${r}`).join(' | ') }
            );

            message.channel.send(embed)
         }
    }