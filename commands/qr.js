const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (args[0]) {
        const text = args.join(" ");
const embed = new Discord.MessageEmbed()
            .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)
        message.channel.send(embed);
    }
    else {
        message.reply("Merci de mettre des arguments.")
    }
}