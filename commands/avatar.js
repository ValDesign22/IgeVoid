const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    text = `${args.join(" ")}`;
    if (text && !message.mentions.users.size) {
        const ids = Array(text.split(" "));
        ids.forEach(x => {
            x.forEach(async y => {
                if (isNaN(y)) return message.reply(`\`${y}\` n'est pas une ID valide.`);
                if (y.length < 18) return message.reply(`\`${y}\` n'est pas assez long pour être une ID.`);

                const user = await client.users.fetch(y);

                const aIDEmbed = new MessageEmbed()
                .setTitle(`Avatar de ${user.tag}`)
                .setColor(client.colors.blue)
                .setImage(user.displayAvatarURL({ dynamic: true }))

                message.channel.send(aIDEmbed);
             })
        })
    } else if (!message.mentions.users.size) {
        const avatar1Embed = new MessageEmbed()
        .setColor(client.colors.blue)
        .setTitle("Ton avatar")
        .setImage(message.author.displayAvatarURL({ dynamic: true }))
        return message.channel.send(avatar1Embed);
    }

    const avatarList = message.mentions.users.map(user => {
        const avatar2Embed = new MessageEmbed()
        .setColor(client.colors.blue)
        .setTitle(`L'avatar de ${user.tag}`)
        .setImage(user.displayAvatarURL({ dynamic: true }))
      return message.channel.send(avatar2Embed)
    });
}

module.exports.help = {
    description: "Sert à voir votre avatar ou celui des personnes mentionnées.",
    name: "avatar",
    aliases: ["a", "icon"],
    category: "utils"
}
