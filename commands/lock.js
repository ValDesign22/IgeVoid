module.exports.run = async (client, message) => {
    if (message.member.hasPermission("MANAGE_CHANNELS")) {
        if (message.channel.name.startsWith("🔒-")) {
            message.reply("Ce channel est déja bloqué.")
        }
        else {
        	message.channel.updateOverwrite(message.guild.roles.everyone, {
       			SEND_MESSAGES: false
    		})
        	message.channel.setName(`🔒-${message.channel.name}`);

        	message.channel.send(`Ce salon est actuellement bloqué.\nModérateur: ${message.author.tag}`)
    	}
    }
    else {
        message.reply("Tu n'as pas la permission `MANAGE_CHANNELS`.")
    }
}

module.exports.help = {
    description: "Permet de bloquer l'accès à l'envois de messages au membres sur le channel ou à été exécutée la commande.",
    name: "lock",
    aliases: ["channellock", "l", "channell"],
    category: "moderation"
}