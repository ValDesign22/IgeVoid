module.exports.run = async (client, message, args) => {
    let text = args.join(' ')

    if (!text) return message.channel.send(`Veuillez mettre un message.`)

    let avatar = message.author.displayAvatarURL({ dynamic: true });

    if (message.mentions.has("everyone") || message.mentions.has("here")) return message.channel.send("Merci de ne pas mentionner everyone ou here");
    else {
        message.channel.createWebhook(message.author.username, { avatar: avatar }).then(msgWebhook => {
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