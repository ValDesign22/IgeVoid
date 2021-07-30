module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!client.player.getQueue(message)) return message.error(message.lang.music.noMusic, message, client);

    const success = client.player.shuffle(message);

    if (success) message.channel.send(message.lang.music.shuffle.replace(/{length}/g, client.player.getQueue(message).tracks.length));
}

module.exports.help = {
    description: "Permet de mélanger la playlist.",
    name: "shuffle",
    aliases: ["sh", "musicsh", "playlistsh"],
    category: "music"
}