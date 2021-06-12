module.exports.run = (client, message) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Tu n'as pas la permission `MANAGE_CHANNELS`");
    
    if (!message.mentions.channels.first()) return message.reply("Merci de mentionner un channel.");
    
    client.db.set(`sug_${message.guild.id}`, message.mentions.channels.first().id);
    
    message.reply(`Le channel de suggestion à été défini sur ${message.mentions.channels.first()}`);
}

module.exports.help = {
    description: "Permet de mettre mettre le channel de suggestions au channel mentionné.",
    name: "setsugg",
    aliases: ["setsug"],
    category: "config"
}