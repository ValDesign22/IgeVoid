const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const search = args.join(" ");
    if (!search) return message.error(message.lang.ytNoSearch, message, client);        
    const e = new MessageEmbed()
    .setAuthor(message.author.tag)
    .setColor(client.colors.blue)
    .setDescription(message.lang.ytSearch + `\n\n[[${args.join(" ")}]](https://www.youtube.com/results?search_query=${search.replace(new RegExp(" ", "g"), "+")})`)
	message.channel.send({ embed: e });
}

module.exports.help = {
    description: "Sert à faire une recherche sur youtube.",
    name: "youtube",
    aliases: ["yt", "searchyt"],
    category: "utils"
}