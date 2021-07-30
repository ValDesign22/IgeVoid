module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            color: client.colors.blue,
            author: { name: `Voici vos résultats de recherche pour ${query}` },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });
};