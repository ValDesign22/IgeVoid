module.exports.run = async (client, message) => {
    if (!message.member.voice.channel) return message.channel.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!client.player.getQueue(message)) return message.channel.error(message.lang.music.noMusic, message, client);

    const track = client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

    message.channel.send({
        embed: {
            color: 'BLUE',
            author: { name: track.title },
            fields: [
                { name: message.lang.music.npChannel, value: track.author, inline: true },
                { name: message.lang.music.npRequested, value: track.requestedBy.username, inline: true },
                { name: message.lang.music.fromPlaylist, value: track.fromPlaylist ? message.lang.yes : message.lang.no, inline: true },

                { name: message.lang.music.npViews, value: track.views, inline: true },
                { name: message.lang.music.npDuration, value: track.duration, inline: true },

                { name: message.lang.music.npVolume, value: client.player.getQueue(message).volume, inline: true },
                { name: message.lang.music.npRepeat, value: client.player.getQueue(message).repeatMode ? message.lang.yes : message.lang.no, inline: true },
                { name: message.lang.music.inPause, value: client.player.getQueue(message).paused ? message.lang.yes : message.lang.no, inline: true },

                { name: message.lang.music.progress, value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
            ],
            thumbnail: { url: track.thumbnail },
            timestamp: new Date(),
        },
    });
}

module.exports.help = {
    description: "Permet d'avoir les infos de la musique en cours.",
    name: "nowplaying",
    aliases: ["np", "musicnp"],
    category: "music"
}