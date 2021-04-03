exports.run = (client, message, args, dbPrefixs) => {
    if (message.member.hasPermission("MANAGE_SERVER")) {
        if (args[1]) {
            message.reply("Le prefix ne peut pas contenir d'espace");
        }
        else if (args[0] && args[0].length < 6) {
            dbPrefixs.set(`prefix_${message.guild.id}`, args[0]);
            message.channel.send(`Le prefix du bot sur le serveur a été changé par **${args[0]}**`);
        }
        else if (args[0] && args[0].length > 6) {
            message.reply("Le prefix en peut pas faire plus de 5 caractères.");
        }
        else if (!args[0]) {
            message.reply("Merci de spécifier un nouveau prefix.")
        }
    }
    else {
        message.reply("Tu n'as pas la permission `MANAGE_SERVER`.")
    }
}