module.exports.run = async (client, message) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!client.player.getQueue(message)) return message.error(message.lang.music.noMusic, message, client);

    client.player.setRepeatMode(message, false);
    const success = client.player.stop(message);

    if (success) message.channel.send(message.lang.music.stopped);
}

module.exports.help = {
    description: "Permet de stopper la musique.",
    name: "stop",
    aliases: ["st", "musicstop", "musicst"],
    category: "music"
}