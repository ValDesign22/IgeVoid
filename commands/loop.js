module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(message.lang.music.notBotVoice, message, client);

    if (!client.player.getQueue(message)) return message.error(message.lang.music.noMusic, message, client);

    if (args.join(" ").toLowerCase() === 'queue') {
        if (client.player.getQueue(message).loopMode) {
            client.player.setLoopMode(message, false);
            return message.channel.send(message.lang.music.loop.queueOff);
        } else {
            client.player.setLoopMode(message, true);
            return message.channel.send(message.lang.music.loop.queueOn);
        };
    } else {
        if (client.player.getQueue(message).repeatMode) {
            client.player.setRepeatMode(message, false);
            return message.channel.send(message.lang.music.loop.off);
        } else {
            client.player.setRepeatMode(message, true);
            return message.channel.send(message.lang.music.loop.on);
        };
    };
}

module.exports.help = {
    description: "Permet de faire répeter la musique ou la playlist.",
    name: "loop",
    aliases: ["repeat", "rep", "musicloop", "musicrep"],
    category: "music"
}