module.exports.run = (client, message, args) => {
    const amount = parseInt(args[0]);

    if (message.member.hasPermission('MANAGE_MESSAGES')) {
        if (isNaN(amount)) {
            return message.reply("Ce n'est pas un nombre valide.");
        }
        else if (amount <= 0 || amount > 99) {
            return message.reply("Tu dois entrer un nombre compris entre `1` et `99`.");
        }

        if (amount === 1) {
            message.channel.bulkDelete(amount + 1)
            .then(messages => message.channel.send(`**${messages.size - 1}** message supprimé.`)).then(m => m.delete({timeout: 5000}))
        }
        else {
            message.channel.bulkDelete(amount + 1)
            .then(messages => message.channel.send(`**${messages.size - 1}** messages supprimés.`)).then(m => m.delete({timeout: 5000}))
        }
    }
    else {
        message.channel.send("Tu ne peux pas utiliser cette commande car tu n'as pas la permission `MANAGE_MESSAGES`.")
    }
}

module.exports.help = {
    description: "Permet de supprimer le nombre de messages donné compris entre 1 et 99.",
    name: "clear",
    aliases: ["cl", "msgscl"],
    category: "moderation"
}