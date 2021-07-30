module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!client.player.getQueue(message)) return message.error(message.lang.music.noMusic, message, client);

    const success = client.player.skip(message);

    if (success) message.channel.send(message.lang.music.skipped);
}

module.exports.help = {
    description: "Permet de passer à la musique suivante.",
    name: "skip",
    aliases: ["next", "sk", "musicskip", "musicnext", "musicsk"],
    category: "music"
}