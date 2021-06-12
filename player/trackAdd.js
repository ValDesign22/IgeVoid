module.exports = (client, message, queue, track) => {
    message.channel.send(`${track.title} a été ajouté à la file d'attente.`);
};