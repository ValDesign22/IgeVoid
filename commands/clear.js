module.exports.run = (client, message, args) => {
    const amount = parseInt(args[0]);

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_MESSAGES"), message, client);
    if (isNaN(amount)) return message.error(message.lang.notNmb.replace(/{nmb}/g, amount), message, client);
    else if (amount <= 0 || amount > 99) return message.error(message.lang.u99, message, client);

    if (amount === 1) {
        message.channel.bulkDelete(amount + 1)
        .then(messages => message.success(`**${messages.size - 1}** message ${message.guild.lang === "fr" ? "supprimé" : "deleted"}.`, message, client)).then(m => m.delete({timeout: 5000}))
    }
    else {
        message.channel.bulkDelete(amount + 1)
        .then(messages => message.success(`**${messages.size - 1}** messages ${message.guild.lang === "fr" ? "supprimés" : "deleted"}.`, message, client)).then(m => m.delete({timeout: 5000}))
    }
}

module.exports.help = {
    description: "Permet de supprimer le nombre de messages donné compris entre 1 et 99.",
    name: "clear",
    aliases: ["cl", "msgscl"],
    category: "moderation"
}