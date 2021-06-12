const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
    const ePing = new MessageEmbed()
    .setColor(client.colors.blue)
    .addField("Latence du message", `\`${Date.now() - message.createdTimestamp} ms\``)
    .addField("Latence de l'API", `\`${Math.round(client.ws.ping)} ms\``)

    message.channel.send(ePing);
}

module.exports.help = {
    description: "Sert à voir la latence du bot et du message.",
    name: "ping",
    aliases: ["botping"],
    category: "bot"
}