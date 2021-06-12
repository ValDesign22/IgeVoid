module.exports.run = async (client, message) => {
    if (!message.member.voice.channel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Vous n'êtes pas dans le même canal vocal que moi.`);

    if (!client.player.getQueue(message)) return message.channel.send(`Aucune musique en cours.`);

    if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`Il y a seulement 1 musique dans la file d'attente.`);

    client.player.clearQueue(message);

    message.channel.send(`La file d'attente a été réinitialisée.`);
}

module.exports.help = {
    description: "Permet de vider la playlist",
    name: "clear-queue",
    aliases: ["clqueue", "clq", "clear-playlist", "clplaylist", "clplay"],
    category: "music"
}