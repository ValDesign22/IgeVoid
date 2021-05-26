module.exports.run = async (client, message) => {
if (!message.member.voice.channel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Vous n'êtes pas dans le même canal vocal que moi.`);

        if (!client.player.getQueue(message)) return message.channel.send(`Aucune musique en cours.`);

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'BLUE',
                author: { name: track.title },
                fields: [
                    { name: 'Chaine', value: track.author, inline: true },
                    { name: 'Demandé par', value: track.requestedBy.username, inline: true },
                    { name: 'De la playlist', value: track.fromPlaylist ? 'Oui' : 'Non', inline: true },

                    { name: 'Vues', value: track.views, inline: true },
                    { name: 'Durée', value: track.duration, inline: true },

                    { name: 'Volume', value: client.player.getQueue(message).volume, inline: true },
                    { name: 'Mode répétition', value: client.player.getQueue(message).repeatMode ? 'Oui' : 'Non', inline: true },
                    { name: 'Actuellement en pause', value: client.player.getQueue(message).paused ? 'Oui' : 'Non', inline: true },

                    { name: 'Barre de progression', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
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