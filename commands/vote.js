const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
    const e = new MessageEmbed()
    .setColor(client.colors.blue)
    .setDescription("[Wonder Bot List](https://wonderbotlist.com/fr/bot/804289381141446666)\n[Top.gg](https://top.gg/bot/804289381141446666/)")
    
    message.channel.send(e)
}

module.exports.help = {
    description: "Permet d'avoir les liens des sites ou l'on peut voter pour le bot.",
    name: "vote",
    aliases: ["botvote", "votebot"],
    category: "bot"
}