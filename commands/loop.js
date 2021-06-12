module.exports.run = async (client, message, args) => {
if (!message.member.voice.channel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Vous n'êtes pas dans le même canal vocal que moi.`);

        if (!client.player.getQueue(message)) return message.channel.send(`Aucune musique en cours.`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`Mode de répétition **désactivé**.`);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`Mode de répétition **activé**, toute la file d'attente sera répétée en boucle.`);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`Mode de répétition **désactivé**.`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`Mode de répétition **activé** la musique actuelle sera répétée en boucle.`);
            };
        };
}

module.exports.help = {
    description: "Permet de faire répeter la musique ou la playlist.",
    name: "loop",
    aliases: ["repeat", "rep", "musicloop", "musicrep"],
    category: "music"
}