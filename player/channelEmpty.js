module.exports = (client, message, queue) => {
    message.channel.send(`La musique s'est arrêtée car il n'y a plus de membre dans le salon vocal.`);
};