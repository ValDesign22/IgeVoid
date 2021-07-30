module.exports.run = (client, message) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_CHANNELS"), message, client);
    
    if (!message.mentions.channels.first()) return message.error(message.lang.mentionChan, message, client);
    
    client.db.set(`sug_${message.guild.id}`, message.mentions.channels.first().id);
    
    message.success(message.lang.suggSet.replace(/{channel}/g, message.mentions.channels.first()), message, client);
}

module.exports.help = {
    description: "Permet de mettre mettre le channel de suggestions au channel mentionné.",
    name: "setsugg",
    aliases: ["setsug"],
    category: "config"
}