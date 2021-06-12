module.exports.run = async (client, message, args) => {
if (!message.member.voice.channel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Vous n'êtes pas dans le même canal vocal que moi.`);

        if (!client.player.getQueue(message)) return message.channel.send(`Aucune musique en cours.`);

        if (!client.player.getQueue(message).paused) return message.channel.send(`La musique est déjà en cours.`);

        const success = client.player.resume(message);

        if (success) message.channel.send(`La musique ${client.player.getQueue(message).playing.title} a reprise !`);
}

module.exports.help = {
    description: "Permet de relancer la musique une fois mise en pause.",
    name: "resume",
    aliases: ["res", "musicres", "musicresume"],
    category: "music"
}