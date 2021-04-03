const Discord = require("discord.js");

exports.run = (client, message) => {
    const e = new Discord.MessageEmbed()
    .setColor("#2F3136")
    .addField("Latence du message", `\`${Date.now() - message.createdTimestamp} ms\``)
    .addField("Latence de l'API", `\`${Math.round(client.ws.ping)} ms\``)
    
    message.channel.send(e)
}