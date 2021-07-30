module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!args[0]) return message.error(message.lang.music.giveMusic, message, client);

    client.player.play(message, args.join(" "), { firstResult: true });
}

module.exports.help = {
    description: "Permet de lancer une musique.",
    name: "play",
    aliases: ["p", "musicplay", "musicp"],
    category: "music"
}