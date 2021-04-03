const Discord = require("discord.js");

exports.run = (client, message, args, dbPrefixs, dbTickets, prefix) => {
    //permission
    if (message.member.hasPermission("MANAGE_CHANNELS")) {
        //créer
        if(args[0] === "create") {

            //text channel
            if (args[1] === "text") {
                
                //channel name
                if (args[2]) {
                    message.guild.channels.create(`${args[2]}`, {
                        type: "text",
                    })

                    .then(ch => {
                        message.channel.send(`Le channel <#${ch.id}> à été créé.`)
                    })
                }
                else {
                    const e = new Discord.MessageEmbed()
                    .setTitle("Erreur de syntaxe")
                    .setColor("RED")
                    .setDescription(`Merci d'utiliser :\n\`${prefix}channel [create] [text] [name]\``)

                    message.channel.send(e)
                }
            }
            //voice channel
            else if (args[1] === "voice") {

                //channel name
                if (args[2]) {
                    message.guild.channels.create(`${args[2]}`, {
                        type: "voice",
                    })

                    .then(ch => {
                        message.channel.send(`Le channel ${ch.name} à été créé.`)
                    })
                }
                else {
                    const e = new Discord.MessageEmbed()
                    .setTitle("Erreur de syntaxe")
                    .setColor("RED")
                    .setDescription(`Merci d'utiliser :\n\`${prefix}channel [create] [voice] [name]\``)

                    message.channel.send(e)
                }
            }
            //syntax
            else {
                const e = new Discord.MessageEmbed()
                .setTitle("Erreur de syntaxe")
                .setColor("RED")
                .setDescription(`Merci d'utiliser :\n\`${prefix}channel [create] [text/voice]\``)

                message.channel.send(e)
            }

        }
        //supprimer
        else if (args[0] === "delete") {
            const chADel = message.guild.channels.cache.find(ch => ch.id === args[1])
            if (message.mentions.channels.first()) {
                const e = new Discord.MessageEmbed()
                .setTitle("Erreur de syntaxe")
                .setColor("RED")
                .setDescription(`Merci d'utiliser :\n\`${prefix}channel [delete] [id]\``)
                
                message.channel.send(e)
            }
            if (args[1]) {
                chADel.delete()

                message.reply(`Le channel avec l'ID (${args[1]}) vien dêtre supprimé.`)
            }
            else {
                const e = new Discord.MessageEmbed()
                .setTitle("Erreur de syntaxe")
                .setColor("RED")
                .setDescription(`Merci d'utiliser :\n\`${prefix}channel [delete] [id]\``)

                message.channel.send(e)
            }
         }
        //syntax
        else {
            const e = new Discord.MessageEmbed()
            .setTitle("Erreur de syntaxe")
            .setColor("RED")
            .setDescription(`Merci d'utiliser :\n\`${prefix}channel [create/delete]\``)

            message.channel.send(e)
        }
    }
    //pas la permission
    else {
        const e = new Discord.MessageEmbed()
        .setTitle(":x: Interdiction")
        .setColor("RED")
        .setDescription("Tu n'es pas autorisé à éxecuter cette commande car tu n'as pas la permission `MANAGE_CHANNELS`")

        message.reply(e)
    }
}