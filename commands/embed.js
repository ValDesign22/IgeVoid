const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const msg = args.join(" ")
    
    message.delete()

    if (args[0]) {
        const e = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(msg)

        message.channel.send(e)
    }
    else {
        const e = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Merci de mettre un texte pour faire votre embed.")

        message.channel.send(e)
    }
}