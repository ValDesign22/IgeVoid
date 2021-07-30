const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    text = `${args.join(" ")}`;
    if (text && !message.mentions.users.size) {
        const ids = Array(text.split(" "));
        ids.forEach(x => {
            x.forEach(async y => {
                if (isNaN(y)) return message.error(message.lang.avatar.notValidID.replace(/{y}/g, y), message, client);
                if (y.length < 18) return message.error(message.lang.avatar.tooShort.replace(/{y}/g, y), message, client);
                if (y.length > 18) return message.error(message.lang.avatar.tooLong.replace(/{y}/g, y), message, client)

                const user = await client.users.fetch(y);

                const aIDEmbed = new MessageEmbed()
                .setTitle(message.lang.avatar.avatar2.replace(/{member}/g, user.tag))
                .setColor(client.colors.blue)
                .setImage(user.displayAvatarURL({ dynamic: true }))

                message.channel.send({ embed: aIDEmbed });
             })
        })
    } else if (!message.mentions.users.size) {
        const avatar1Embed = new MessageEmbed()
        .setColor(client.colors.blue)
        .setTitle(message.lang.avatar.avatar1)
        .setImage(message.author.displayAvatarURL({ dynamic: true }))

        return message.channel.send({ embed: avatar1Embed });
    }

    const avatarList = message.mentions.users.map(user => {
        const avatar2Embed = new MessageEmbed()
        .setColor(client.colors.blue)
        .setTitle(message.lang.avatar.avatar2.replace(/{member}/g, user.tag))
        .setImage(user.displayAvatarURL({ dynamic: true }))
        
        return message.channel.send({ embed: avatar2Embed })
    });
}

module.exports.help = {
    description: "Sert à voir votre avatar ou celui des personnes mentionnées.",
    name: "avatar",
    aliases: ["a", "icon"],
    category: "utils"
}