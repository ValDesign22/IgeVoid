module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_CHANNELS"), message, client);
    
    if (!args[0]) return message.error(message.lang.logs.args, message, client);
    
    if (args[0] === "set") {
        if (!message.mentions.channels.first()) return message.error(message.lang.logs.chan, message, client);
        client.logs.set(`logs_${message.guild.id}`, message.mentions.channels.first().id);
        message.reply(`${message.lang.logs.setChan} ${message.mentions.channels.first()}.`);
    }
    
    else if (args[0] === "active") {
        if (client.logs.get(`logsSt_${message.guild.id}`) === true) return message.error(message.lang.logs.ardA, message, client);
        message.reply(message.lang.logs.setA);
        client.logs.set(`logsSt_${message.guild.id}`, true)
    }
    
    else if (args[0] === "desactive") {
        if (client.logs.get(`logsSt_${message.guild.id}`) !== true) return message.error(message.lang.logs.ardD, message, client);
        message.reply(message.lang.logs.setD);
        client.logs.set(`logsSt_${message.guild.id}`, false);
    }
}

module.exports.help = {
    description: "Permet de définir le salon de logs, d'activer le système de logs ou de désactiver le système de logs.",
    name: "logs",
    category: "config"
}