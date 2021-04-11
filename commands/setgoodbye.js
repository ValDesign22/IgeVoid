exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye) => {
    message.delete()

    if (message.member.hasPermission("MANAGE_SERVER")) {
        if (message.mentions.channels.first()) {
            const goodbyeChannel = message.mentions.channels.first();

            dbGoodbye.set(`gb_${message.guild.id}`, goodbyeChannel.id)

            message.channel.send(`Le channel d'aurevoir a été mis en place dans la channel: <#${goodbyeChannel.id}>`)
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