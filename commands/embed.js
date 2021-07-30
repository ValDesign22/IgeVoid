const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    let text = args.join(" ");

    if (!text) return message.error(message.lang.noTxt4Ebd, message, client);

    const embed = new MessageEmbed()
    .setColor(client.colors.blue)
    .setAuthor(message.author.tag)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(text)

    message.channel.send({ embed: embed })
}
module.exports.help = {
    description: "Permet d'envoyer votre message dans un embed.",
    name: "embed",
    aliases: ["embedmsg", "ebdmsg", "ebd"],
    category: "fun"
}