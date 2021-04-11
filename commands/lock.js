exports.run = async (client, message) => {
    if (message.member.hasPermission("MANAGE_CHANNELS")) {
        message.channel.updateOverwrite(message.guild.roles.everyone, {
       		SEND_MESSAGES: false
    	})
        message.channel.send(`Ce salon est actuellement bloqué.\nModérateur: ${message.author.tag}`)
    }
    else {
        message.reply("Tu n'as pas la permission `MANAGE_CHANNELS`.")
    }
}