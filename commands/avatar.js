const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    if (!message.mentions.users.size) {
        const avatar1Embed = new MessageEmbed()
        .setColor(client.colors.blue)
        .setTitle("Ton avatar")
        .setImage(message.author.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 }))
        return message.channel.send(avatar1Embed);
    }

    const avatarList = message.mentions.users.map(user => {
        const avatar2Embed = new MessageEmbed()
        .setColor(client.colors.blue)
        .setTitle(`L'avatar de ${user.tag}`)
        .setImage(user.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 }))
      return message.channel.send(avatar2Embed)
    });
}

module.exports.help = {
    description: "Sert à voir votre avatar ou celui des personnes mentionnées.",
    name: "avatar",
    aliases: ["a", "icon"],
    category: "utils"
}