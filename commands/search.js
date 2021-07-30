module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!args[0]) return message.error(message.lang.music.giveMusic, message, client);

    client.player.play(message, args.join(" "));
}

module.exports.help = {
    description: "Permet de chercher une musique sur youtube pour ensuite la jouer.",
    name: "search",
    aliases: ["ytsearch", "musicsearch", "se", "musicse", "ytse"],
    category: "music"
}