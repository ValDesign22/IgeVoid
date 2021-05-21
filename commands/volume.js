module.exports.run = async (client, message, args) => {
if (!message.member.voice.channel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Vous n'êtes pas dans le même canal vocal que moi.`);

        if (!client.player.getQueue(message)) return message.channel.send(`Aucune musique en cours.`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`Merci d'entrer un nombre valide.`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`Merci d'entrer un chiffre compris entre 1 et 100.`);

        const success = client.player.setVolume(message, parseInt(args[0]));

        if (success) message.channel.send(`Volume changé à **${parseInt(args[0])}%** !`);
}

module.exports.help = {
    description: "Permet de changer le volume de la musique.",
    name: "volume",
    aliases: ["vol", "musicvolume", "musicvol"],
    category: "music"
}