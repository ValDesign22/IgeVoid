const Discord = require("discord.js");

exports.run = (client, message, args, dbPrefixs, dbTickets, prefix) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (args[0] === "create") {
            if (args[1]) {
                if(args[2]) {
                    const nom = args[1]
                    const color = args[2]

                    message.guild.roles.create({
                        data: {
                            name: `${nom}`,
                            color: `${color}`
                        },
                        reason: `Role créé par ${message.author.tag}.`
                    })

                    .then(role => {
                        const e = new Discord.MessageEmbed()
                        .setTitle("Réussite")
                        .setColor("GREEN")
                        .setDescription(`Nouveau role créé <@&${role.id}>`)

                        message.channel.send(e)
                    })
                }
                else {
                    const e = new Discord.MessageEmbed()
                    .setTitle(":x: Syntaxe")
                    .setColor("RED")
                    .setDescription("Merci de mettre une couleur hexadecimale.\n__[[Hexa Color Selector]](https://htmlcolorcodes.com/fr/selecteur-de-couleur/)__")

                    message.channel.send(e)
                }
            }
            else {
                const e = new Discord.MessageEmbed()
                .setTitle(":x: Syntaxe")
                .setColor("RED")
                .setDescription(`Merci de donner un nom au role. \`${prefix}role [create] [name]\``)

                message.channel.send(e)
            }
        }
        else if (args[0] === "delete") {
            const RAD = message.mentions.roles.first()

            if(message.mentions.roles.first()) {
                RAD.delete()

                const e = new Discord.MessageEmbed()
                .setTitle("Réussite")
                .setColor("GREEN")
                .setDescription("Le role demandé à été supprimé.")

                message.channel.send(e)
            }
            else {
                const e = new Discord.MessageEmbed()
                .setTitle(":x: Syntaxe")
                .setColor("RED")
                .setDescription(`Merci de mentionner un role: \`${prefix}role [delete] [@role]\``)

                message.channel.send(e)
            }
        }
        else if (args[0] === "add") {
            if (message.mentions.roles.first()) {
                const r = message.mentions.roles.first()
                if (message.mentions.members.first()) {
                    const m = message.mentions.members.first()

                    m.roles.add(r)

                    const e = new Discord.MessageEmbed()
                    .setTitle("Réussite")
                    .setColor("GREEN")
                    .setDescription(`Le role ${r} à été ajouté à ${m.user.tag}`)

                    message.channel.send(e)
                }
                else {
                    const e = new Discord.MessageEmbed()
                    .setTitle(":x: Syntaxe")
                    .setColor("RED")
                    .setDescription(`Merci de mentionner un utilisateur: \`${prefix}role [add] [@role] [@mention]\``)

                    message.channel.send(e)
                }
            }
            else {
                const e = new Discord.MessageEmbed()
                .setTitle(":x: Syntaxe")
                .setColor("RED")
                .setDescription(`Merci de mentionner un role: \`${prefix}role [add] [@role]\``)

                message.channel.send(e)
            }
        }
        else if (args[0] === "remove") {
            if (message.mentions.roles.first()) {
                const r = message.mentions.roles.first()
                if (message.mentions.members.first()) {
                    const m = message.mentions.members.first()

                    m.roles.remove(r)

                    const e = new Discord.MessageEmbed()
                    .setTitle("Réussite")
                    .setColor("GREEN")
                    .setDescription(`Le role ${r} à été enlevé à ${m.user.tag}`)

                    message.channel.send(e)
                }
                else {
                    const e = new Discord.MessageEmbed()
                    .setTitle(":x: Syntaxe")
                    .setColor("RED")
                    .setDescription(`Merci de mentionner un utilisateur: \`${prefix}role [remove] [@role] [@mention]\``)

                    message.channel.send(e)
                }
            }
            else {
                const e = new Discord.MessageEmbed()
                .setTitle(":x: Syntaxe")
                .setColor("RED")
                .setDescription(`Merci de mentionner un role: \`${prefix}role [remove] [@role] [@mention]\``)

                message.channel.send(e)
            }
        }
        else {
            const e = new Discord.MessageEmbed()
            .setTitle(":x: Syntaxe")
            .setColor("RED")
            .setDescription(`Merci de mettre cette syntaxe: \`${prefix}role [create/delete/add/remove]\``)

            message.channel.send(e)
        }
    }
    else {
        const e = new Discord.MessageEmbed()
        .setTitle(":x: Interdiction")
        .setColor("RED")
        .setDescription("Tu n'as pas la permission `ADMINISTRATOR` pour exécuter cette commande.")

        message.channel.send(e)
    }
}