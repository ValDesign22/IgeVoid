module.exports.run = async (client, message, args) => {
if (!message.member.voice.channel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Vous n'êtes pas dans le même canal vocal que moi.`);

        if (!client.player.getQueue(message)) return message.channel.send(`Aucune musique en cours.`);

        const success = client.player.skip(message);

        if (success) message.channel.send(`La musique actuelle vient d'être **passée**.`);
}

module.exports.help = {
    description: "Permet de passer à la musique suivante.",
    name: "skip",
    aliases: ["next", "sk", "musicskip", "musicnext", "musicsk"],
    category: "music"
}