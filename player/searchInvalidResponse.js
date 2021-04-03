module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`La sélection a été **annulée**.`);
    } else message.channel.send(`Vous devez envoyer un numéro valide entre **1** et **${tracks.length}** !`);
};