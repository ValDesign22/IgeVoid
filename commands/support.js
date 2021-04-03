const { MessageEmbed } = require("discord.js");

exports.run = (client, message) => {
    const e = new MessageEmbed()
    .setTitle(`Serveur Support De ${client.user.username}`)
    .setURL("https://discord.gg/nDKqMN6cG8")
    
    message.channel.send(e)
}