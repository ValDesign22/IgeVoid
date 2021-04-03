const Discord = require("discord.js");

exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank, dbMCount, dbWarns) => {
    const member = message.mentions.members.first() || message.member;

    if (args[0] === "delete") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            if (args[1]) {
                if (dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "1" && args[0] === "1" || dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "2" && args[1] === "2" || dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "3" && args[1] === "3" || dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "2" && args[1] === "3" || dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "1" && args[1] === "2" || dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "1" && args[1] === "3") {
                    const e = new Discord.MessageEmbed()
                    .setDescription(`Tout les warns de ${member.user.tag} ont été supprimés.`)

                    message.channel.send(e)

                    dbWarns.set(`warns_${message.guild.id}_${member.user.id}`, "0")
                    dbWarns.delete(`warns_${message.guild.id}_${member.user.id}`)
                }
                else if (dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "3" && args[1] === "2") {
                    const e = new Discord.MessageEmbed()
                    .setDescription(`2 warns de ${member.user.tag} ont été supprimés.`)

                    message.channel.send(e)

                    dbWarns.set(`warns_${message.guild.id}_${member.user.id}`, "2")
                }
                else if (dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "2" && args[1] === "1") {
                    const e = new Discord.MessageEmbed()
                    .setDescription(`1 warn de ${member.user.tag} à été supprimés.`)

                    message.channel.send(e)

                    dbWarns.set(`warns_${message.guild.id}_${member.user.id}`, "1")
                }
                else if (dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "3" && args[1] === "1") {
                    const e = new Discord.MessageEmbed()
                    .setDescription(`1 warn de ${member.user.tag} ont été supprimés.`)

                    message.channel.send(e)

                    dbWarns.set(`warns_${message.guild.id}_${member.user.id}`, "2")
                }
                else if (!message.mentions.members.first()) {
                    const e = new Discord.MessageEmbed()
                    .setDescription(`Merci de mentionner un utilisateur.`)
                    .setColor("RED")
            
                    message.channel.send(e)
                }
            }
            else {
                const e = new Discord.MessageEmbed()
                .setDescription(`Merci de mettre un nombre de warns à supprimer.`)
                .setColor("RED")
            
                message.channel.send(e)
            }
        }
        else {
            const e = new Discord.MessageEmbed()
            .setDescription(`Tu n'es pas autorisé à executer cette commande.\nPermission manquante: \`MANAGE_MESSAGES\``)
            .setColor("RED")
            
            message.channel.send(e)
        }
    }
    else if (args[0]) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const e = new Discord.MessageEmbed()
            .setDescription(`L'option ${args[0]} n'existe pas sur cette commande,\nseule l'option \`delete\` existe.`)
            .setColor("RED")
            
            message.channel.send(e)
        }
        else {
            const e = new Discord.MessageEmbed()
            .setDescription(`Tu n'es pas autorisé à executer cette commande.\nPermission manquante: \`MANAGE_MESSAGES\``)
            .setColor("RED")
            
            message.channel.send(e)
        }
    }
    else if (!args[0]) {
        if (dbWarns.has(`warns_${message.guild.id}_${member.user.id}`)) {
            const e = new Discord.MessageEmbed()
            .setDescription(`${member.user.tag} a actuellement ${dbWarns.get(`warns_${message.guild.id}_${member.user.id}`)} avertissements.`)
            .setColor("#2F3136")
            
            message.channel.send(e)
        }
        else {
            const e = new Discord.MessageEmbed()
            .setDescription("Cet utilisateur n'a pas d'avertissements.")
            .setColor("#2F3136")
            
            message.channel.send(e)
        }
    }
}