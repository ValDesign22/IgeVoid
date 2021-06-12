module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Tu n'as pas la permission `MANAGE_CHANNELS`.");
    
    if (!args[0]) return message.reply("Merci de spécifier un argument tel que `set`, `active` ou `desactive`.");
    
    if (args[0] === "set") {
        if (!message.mentions.channels.first()) return message.reply("Merci de mentionner un channel et non un espace vide.");
        
        client.logs.set(`logs_${message.guild.id}`, message.mentions.channels.first().id);
        
        message.reply(`Le channel de logs à été défini sur ${message.mentions.channels.first()}.`);
    }
    
    else if (args[0] === "active") {
        if (client.logs.get(`logsSt_${message.guild.id}`) === true) { message.reply("Le système de logs est déjà activé."); }
        else {
        
        message.reply("Le système de logs est maintenant activé.");
        
        client.logs.set(`logsSt_${message.guild.id}`, true)
        
        }
    }
    
    else if (args[0] === "desactive") {
        if (client.logs.get(`logsSt_${message.guild.id}`) !== true) { message.reply("Le système de logs est déjà désactivé."); }
        else {
        
        message.reply("Le système de logs est maintenant désactivé.");
        
        client.logs.set(`logsSt_${message.guild.id}`, false);
        
        }
    }
}

module.exports.help = {
    description: "Permet de définir le salon de logs, d'activer le système de logs ou de désactiver le système de logs.",
    name: "logs",
    category: "config"
}