module.exports.run = async (client, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Tu n'as pas la permission `ADMINISTRATOR`.");
    
    message.channel.clone().then(channel => {
        channel.setPosition(message.channel.position)
        channel.send('Channel réinitialisé.')
    })
    message.channel.delete()
}

module.exports.help = {
    description: "Permet de vider le channel de messages ou à été envoyé la commande.",
    name: "nuke",
    aliases: ["reset"],
    category: "moderation"
}