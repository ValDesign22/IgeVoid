module.exports = (client, message, track) => {
    message.channel.send(`Lecture en cours de ${track.title} dans le salon vocal ${message.member.voice.channel.name} ...`);
};