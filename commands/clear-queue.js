module.exports.run = async (client, message) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!client.player.getQueue(message)) return message.error(message.lang.music.noMusic, message, client);

    if (client.player.getQueue(message).tracks.length <= 1) return message.error(message.lang.music.OneMusic, message, client);

    client.player.clearQueue(message);

    message.channel.send(message.lang.music.queueReset);
}

module.exports.help = {
    description: "Permet de vider la playlist",
    name: "clear-queue",
    aliases: ["clqueue", "clq", "clear-playlist", "clplaylist", "clplay"],
    category: "music"
}