const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (args[0]) {
        const search = args.join(" ");
        
        const e = new MessageEmbed()
    	.setTitle(`Recherche de ${message.author.tag}`)
        .setColor(client.colors.blue)
    	.setDescription(`Voiçi un lien menant vers les correspondances pour votre recherche sur ${args.join(" ")}\n\n[[${args.join(" ")}]](https://www.google.com/search?q=${search.replace(new RegExp(" ", "g"), "%20")})`)

		message.channel.send(e);
    }
	else {
        message.reply("Merci de me donner une recherche à faire.")
    }
}

module.exports.help = {
    description: "Sert à faire une recherche sur google.",
    name: "google",
    aliases: ["gg", "searchgoogle"],
    category: "utils"
}