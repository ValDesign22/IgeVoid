module.exports.run = async (client, message, args) => {
    let text = args.slice(1).join(' ');
    const member = message.mentions.members.first();
    if (!member) return message.error(message.lang.noHookMember, message, client);
    if (!text) return message.error(message.lang.hookMessage, message, client);
    let avatar = member.user.displayAvatarURL({ dynamic: true });
    if (message.mentions.has("everyone") || message.mentions.has("here")) return message.error(message.lang.hookMention, message, client);
    message.channel.createWebhook(member.user.username, { avatar: avatar }).then(msgWebhook => {
        msgWebhook.send(text)
        message.delete()
        setTimeout(function() {
            msgWebhook.delete()
        }, 1000 * 15)
    })
}

module.exports.help = {
    description: "Permet d'envoyer votre message dans un webhook.",
    name: "webhook",
    aliases: ["webhookmsg", "hookmsg", "hook"],
    category: "fun"
}