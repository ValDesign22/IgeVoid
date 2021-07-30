const tts = require("discord-tts");

module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.error(message.lang.music.notInVoice, message, client);
    
    const text = args.join(" ");

    if (!text) return message.error(message.lang.noArgs, message, client);
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