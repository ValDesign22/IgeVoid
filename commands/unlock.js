module.exports.run = async (client, message) => {
    if (message.member.hasPermission("MANAGE_CHANNELS")) {
        if (message.channel.name.startsWith("🔒-")) {
        	message.channel.updateOverwrite(message.guild.roles.everyone, {
        		SEND_MESSAGES: null
    		});
        	message.channel.setName(`${message.channel.name.slice(2)}`);

        	message.channel.send(`Le channel à été débloqué.\nModérateur: ${message.author.tag}.`)
    	}
        else {
        	message.reply("Ce channel n'est pas bloqué.")
    	}
    }
    else {
        message.reply("Tu n'as pas la permission `MANAGE_CHANNELS`.")
    }
}

module.exports.help = {
    description: "Permet de débloquer l'accès à l'envois de messages au membres sur le channel ou à été exécutée la commande.",
    name: "unlock",
    aliases: ["channelunlock", "unl", "channelunl"],
    category: "moderation"
}