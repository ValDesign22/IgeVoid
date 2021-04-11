exports.run = async (client, message) => {
    if (message.member.hasPermission("MANAGE_CHANNELS")) {
        message.channel.updateOverwrite(message.guild.roles.everyone, {
        	SEND_MESSAGES: null
    	})
        message.channel.send(`Le channel à été débloqué.\nModérateur: ${message.author.tag}.`)
    }
}