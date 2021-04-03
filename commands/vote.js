const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
    const e = new MessageEmbed()
    . setDescription("[Shadow Bot List](https://shadow-bot.fr/bot/804289381141446666)")
    
    message.channel.send(e)
}