const { MessageEmbed } = require("discord.js");

exports.run = (client, message) => {
    const e = new MessageEmbed()
    .setTitle("Lien d'invitation du bot")
    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
    
	message.channel.send(e)
}