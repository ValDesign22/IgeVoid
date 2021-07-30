const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (args[0]) return message.error(message.lang.noArgs, message, client)
    const search = args.join(" ");
    const e = new MessageEmbed()
    .setAuthor(message.author.tag)
    .setColor(client.colors.blue)
    .setDescription(message.lang.ggSearch.replace(/{link}/g, `[[${args.join(" ")}]](https://www.google.com/search?q=${search.replace(new RegExp(" ", "g"), "%20")})`))
	message.channel.send({ embed: e });
}

module.exports.help = {
    description: "Sert à faire une recherche sur google.",
    name: "google",
    aliases: ["gg", "searchgoogle"],
    category: "utils"
}