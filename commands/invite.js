const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message) => {
    const e = new MessageEmbed()
    .setTitle("Invitation")
    .setColor(client.colors.blue)
    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1`)
    
	message.channel.send({ embed: e })
}

module.exports.help = {
    description: "Permet d'avoir le lien d'invitation du bot.",
    name: "invite",
    aliases: ["botinvite", "botinv"],
    category: "bot"
}