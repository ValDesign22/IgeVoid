module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!client.player.getQueue(message)) return message.error(message.lang.music.noMusic, message, client);

    if (!args[0] || isNaN(args[0])) return message.error(message.lang.music.volume.notNumber, message, client);

    if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.error(message.lang.music.volume.oneToHundred, message, client);

    const success = client.player.setVolume(message, parseInt(args[0]));

    if (success) message.channel.send(message.lang.music.volume.changed.replace(/{volume}/g, parseInt(args[0])));
}

module.exports.help = {
    description: "Permet de changer le volume de la musique.",
    name: "volume",
    aliases: ["vol", "musicvolume", "musicvol"],
    category: "music"
}