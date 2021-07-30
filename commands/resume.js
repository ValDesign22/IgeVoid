module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!client.player.getQueue(message)) return message.error(message.lang.music.noMusic, message, client);

    if (!client.player.getQueue(message).paused) return message.error(message.lang.music.resume.alreadyStart, message, client);

    const success = client.player.resume(message);

    if (success) message.channel.send(message.lang.music.resume.resumed.replace(/{title}/g, client.player.getQueue(message).playing.title));
}

module.exports.help = {
    description: "Permet de relancer la musique une fois mise en pause.",
    name: "resume",
    aliases: ["res", "musicres", "musicresume"],
    category: "music"
}