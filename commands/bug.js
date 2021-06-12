const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    const bugEmbed = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle("Bug trouvé")

    const text = args.join(" ");

    const bugsChannel = client.channels.cache.get(client.configs.bugsChannel);

    if (!text) return message.reply("Merci de me donner un bug et non un message vide.");

    bugEmbed.setDescription(text).setFooter(message.author.tag);

    bugsChannel.send(bugEmbed);
}

module.exports.help = {
    description: "Permet de pouvoir envoyer un bug au propiétaire du bot.",
    name: "bug",
    aliases: ["bugreport", "botbug", "bugbot"],
    category: "bot"
}