const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    let text = args.join(" ");

    if (!text) return message.reply("Merci de me donner un texte à mettre dans un embed.");

    const embed = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle(message.author.tag)
    .setThumbnail(message.author.displayAvatarURL({size: 32, dynamic: true, format: "png"}))
    .setDescription(text)

    message.channel.send(embed)
}
module.exports.help = {
    description: "Permet d'envoyer votre message dans un embed.",
    name: "embed",
    aliases: ["embedmsg", "ebdmsg", "ebd"],
    category: "fun"
}