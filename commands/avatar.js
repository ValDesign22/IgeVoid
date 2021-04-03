const Discord = require("discord.js");

exports.run = (client, message, args) => {
    if (!message.mentions.users.size) {
        const avatar1Embed = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setTitle("Ton avatar")
        .setImage(`${message.author.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 })}`)
        return message.channel.send(avatar1Embed);
    }

    const avatarList = message.mentions.users.map(user => {
        const avatar2Embed = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setTitle(`L'avatar de ${user.tag}`)
        .setImage(`${user.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 })}`)
      return message.channel.send(avatar2Embed)
    });
}