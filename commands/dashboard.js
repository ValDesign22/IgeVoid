const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
    const e = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle(`Dashboard`)
    .setURL(`http://igevoid.ml/`)

    message.channel.send({ embed: e });
}

module.exports.help = {
    description: "Sert à avoir le lien du dashboard du bot.",
    name: "dashboard",
    aliases: ["dash", "site", "web"],
    category: "bot"
}