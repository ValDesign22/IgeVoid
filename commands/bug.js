const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    const bugEmbed = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle(message.lang.bugHunted)

    const text = args.join(" ");

    const bugsChannel = client.channels.cache.get(client.configs.bugsChannel);

    if (!text) return message.error(message.lang.bugError, message, client);

    bugEmbed.setDescription(text).setFooter(message.author.tag);

    bugsChannel.send({ embed: bugEmbed });
}

module.exports.help = {
    description: "Permet de pouvoir envoyer un bug au propiétaire du bot.",
    name: "bug",
    aliases: ["bugreport", "botbug", "bugbot"],
    category: "bot"
}