const tts = require("discord-tts");

module.exports.run = async (client, message, args) => {
    const text = args.join(" ");

    if (!text) return message.reply("Merci de me donner un texte.");
    const broadcast = client.voice.createBroadcast();
    
    var channelId = message.member.voice.channelID;
    var channel = client.channels.cache.get(channelId);
    
    channel.join().then(connection => {
        broadcast.play(tts.getVoiceStream(`${text}`));
        const dispatcher = connection.play(broadcast)
    })

        setTimeout(() => {
            message.guild.me.voice.kick();
        }, 15000) //15 secondes
}

module.exports.help = {
    description: "Permet au bot de dicter un message donné dans un salon vocal.",
    name: "tts",
    aliases: ["vocalmsg", "vocmsg"],
    category: "fun"
}