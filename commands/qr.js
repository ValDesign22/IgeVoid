const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (args[0]) {
        const text = args.join(" ");

        const embed = new MessageEmbed()
        .setColor(client.colors.blue)
        .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)

        message.channel.send(embed);
    }
    else {
        message.reply("Merci de mettre des arguments.")
    }
}

module.exports.help = {
    description: "Permet de créer un QRCode avec la commande.",
    name: "qr",
    aliases: ["qrcode"],
    category: "fun"
}