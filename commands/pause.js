module.exports.run = async (client, message) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!client.player.getQueue(message)) return message.error(message.lang.music.noMusic, message, client);

    if (client.player.getQueue(message).paused) return message.error(message.lang.music.pause.already, message, client);

    const success = client.player.pause(message);

    if (success) message.channel.send(message.lang.music.pause.nowPaused.replace(/{title}/g, client.player.getQueue(message).playing.title));
}

module.exports.help = {
    description: "Permet de mettre en pause la musique.",
    name: "pause",
    aliases: ["pau", "musicpause", "musicpau"],
    category: "music"
}