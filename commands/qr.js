const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const text = args.join(" ");

    if (!text) return message.error(message.lang.noArgs, message, client);

    const embed = new MessageEmbed()
    .setColor(client.colors.blue)
    .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)

    message.channel.send({ embed: embed });
        
}

module.exports.help = {
    description: "Permet de créer un QRCode avec la commande.",
    name: "qr",
    aliases: ["qrcode"],
    category: "fun"
}