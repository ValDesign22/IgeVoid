exports.run = async (client, message) => {
if (!message.member.voice.channel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Vous n'êtes pas dans le même canal vocal que moi.`);

        if (!client.player.getQueue(message)) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

        client.player.setRepeatMode(message, false);
        const success = client.player.stop(message);

        if (success) message.channel.send(`La musique du serveur vient d'être **stoppé**.`);
}