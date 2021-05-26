module.exports.run = async (client, message, args) => {
    let text = args.slice(1).join(' ');

    const member = message.mentions.members.first();

    if (!member) return message.reply("Merci de mentionner un membre pour le webhook.");

    if (!text) return message.channel.send(`Veuillez mettre un message.`);

    let avatar = member.user.displayAvatarURL({ dynamic: true });

    if (message.mentions.has("everyone") || message.mentions.has("here")) return message.channel.send("Merci de ne pas mentionner everyone ou here");
    else {
        message.channel.createWebhook(member.user.username, { avatar: avatar }).then(msgWebhook => {
            msgWebhook.send(text)
            message.delete()

            setTimeout(function() {
                msgWebhook.delete()
            }, 1000 * 15)
        })
    }
}

module.exports.help = {
    description: "Permet d'envoyer votre message dans un webhook.",
    name: "webhook",
    aliases: ["webhookmsg", "hookmsg", "hook"],
    category: "fun"
}