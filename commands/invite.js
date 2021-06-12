const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message) => {
    const e = new MessageEmbed()
    .setTitle("Lien d'invitation du bot")
    .setColor(client.colors.blue)
    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
    
	message.channel.send(e)
}

module.exports.help = {
    description: "Permet d'avoir le lien d'invitation du bot.",
    name: "invite",
    aliases: ["botinvite", "botinv"],
    category: "bot"
}