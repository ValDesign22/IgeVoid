module.exports = (client, message, queue, playlist) => {
    message.channel.send(`${playlist.title} a été ajouté à la file d'attente (**${playlist.tracks.length}** musiques) !`);
};