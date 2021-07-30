const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue, track) => {
    const e = new MessageEmbed()
    .setTitle(track.title)
    .setDescription(`Ajout d'une musique dans la file d'attente.`)
    .setColor(client.colors.blue)
    .setURL(track.url)

    message.channel.send({ embed: e });
};