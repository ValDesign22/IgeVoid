module.exports.run = async (client, message) => {
    const { MessageButton } = require('discord-buttons');
    let buttonUnlock = new MessageButton()
    .setLabel("Unlock")
    .setStyle("blurple")
    .setEmoji("🔓")
    .setID("unlockChannelButton")

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_CHANNELS"), message, client);
    if (message.channel.name.startsWith("🔒-")) return message.reply(message.lang.lock.alreadyLock);
    message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false });
    message.channel.setName(`🔒-${message.channel.name}`);
    message.channel.send(message.lang.lock.locked.replace(/{user}/g, message.author.tag), { component: buttonUnlock });
}

module.exports.help = {
    description: "Permet de bloquer l'accès à l'envois de messages au membres sur le channel ou à été exécutée la commande.",
    name: "lock",
    aliases: ["channellock", "l", "channell"],
    category: "moderation",
    cooldown: 30
}