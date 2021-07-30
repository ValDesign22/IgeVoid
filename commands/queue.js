module.exports.run = async (client, message) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message)) return message.error(message.lang.music.noMusic, message, client);

    message.channel.send(`**File d'attente du serveur - ${message.guild.name} ${client.player.getQueue(message).loopMode ? '(en boucle)' : ''}**\nActuelle : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
        return `**#${i + 1}** - ${track.title} | ${track.author} (demandé par : ${track.requestedBy.username})`
    }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `Et **${queue.tracks.length - 5}** autres musiques...` : `Dans la playlist **${queue.tracks.length}** musique(s)...`}`));
}

module.exports.help = {
    description: "Permet de voir la playlist.",
    name: "queue",
    aliases: ["playlist", "musicsqueue", "pl", "qu"],
    category: "music"
}