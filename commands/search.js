module.exports.run = async (client, message, args) => {
if (!message.member.voice.channel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Vous n'êtes pas dans le même canal vocal que moi.`);

        if (!args[0]) return message.channel.send(`Veuillez indiquer le titre d'une musique.`);

        client.player.play(message, args.join(" "));
}

module.exports.help = {
    description: "Permet de chercher une musique sur youtube pour ensuite la jouer.",
    name: "search",
    aliases: ["ytsearch", "musicsearch", "se", "musicse", "ytse"],
    category: "music"
}