module.exports.run = async (client, message) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_CHANNELS"), message, client);
        if (!message.channel.name.startsWith("🔒-")) return message.error(message.lang.lock.ardUnl, message, client);
        message.channel.updateOverwrite(message.guild.roles.everyone, {
        	SEND_MESSAGES: null
    	});
        message.channel.setName(`${message.channel.name.slice(2)}`);
        message.channel.send(message.lang.lock.unlocked.replace(/{user}/g, message.author.tag));
}

module.exports.help = {
    description: "Permet de débloquer l'accès à l'envois de messages au membres sur le channel ou à été exécutée la commande.",
    name: "unlock",
    aliases: ["channelunlock", "unl", "channelunl"],
    category: "moderation"
}