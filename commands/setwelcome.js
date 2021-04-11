exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome) => {
    message.delete()

    if (message.member.hasPermission("MANAGE_SERVER")) {
        if (message.mentions.channels.first()) {
            const welcomeChannel = message.mentions.channels.first();

            dbWelcome.set(`bvn_${message.guild.id}`, welcomeChannel.id)

            message.channel.send(`Le channel de bienvenue a été mis en place dans la channel: <#${welcomeChannel.id}>`)
        }
        else if (args[0]) {
            message.reply("Merci de mentionner un channel et de ne pas donner de texte.")
        }
        else {
            message.reply("Merci de mentionner un channel.")
        }
    }
    else {
        message.reply("Tu n'as pas la permission `MANAGE_SERVER`")
    }
}