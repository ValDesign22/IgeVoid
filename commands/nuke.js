module.exports.run = async (client, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.error(message.lang.noPerm.replace(/{perm}/g, "ADMINISTRATOR"), message, client);
    
    message.channel.clone().then(channel => {
        channel.setPosition(message.channel.position)
        channel.send(message.lang.nuked)
    })
    message.channel.delete()
}

module.exports.help = {
    description: "Permet de vider le channel de messages ou à été envoyé la commande.",
    name: "nuke",
    aliases: ["reset"],
    category: "moderation"
}