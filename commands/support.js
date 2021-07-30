const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message) => {
    const e = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle(`${client.user.username} Support`)
    .setURL(client.configs.support)
    
    message.channel.send({ embed: e })
}

module.exports.help = {
    description: "Permet d'avoir le lien d'invitation du support du bot.",
    name: "support",
    aliases: ["botsupport", "supportbot", "botsupp", "suppbot"],
    category: "bot"
}