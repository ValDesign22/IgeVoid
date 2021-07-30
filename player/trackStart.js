const { MessageEmbed } = require("discord.js");

module.exports = (client, message, track) => {
    const e = new MessageEmbed()
    .setTitle(track.title)
    .setDescription(`Nouvelle musique en cours dans le salon <#${message.guild.me.voice.channel.id}>.`)
    .setColor(client.colors.blue)
    .setURL(track.url)

    message.channel.send({ embed: e });
};