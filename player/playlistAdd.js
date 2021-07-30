const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue, track) => {
    const e = new MessageEmbed()
    .setTitle(playlist.title)
    .setDescription(`Une musique a été ajouté à la file d'attente (**${playlist.tracks.length}** musiques).`)
    .setColor(client.colors.blue)
    .setURL(playlist.url)

    message.channel.send({ embed: e });
};