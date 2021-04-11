exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye) => {
	if (message.member.hasPermission("MANAGE_SERVER")) {
        if (!args[0]) {
            message.reply("Merci de mettre l'argument `welcome` ou `goodbye`.")
        }
        else if (args[0] === "welcome") {
            if (dbWelcome.has(`bvn_${message.guild.id}`)) {
                client.emit("guildMemberAdd", message.member);
                
                const channel = message.guild.channels.cache.find(c => c.id === `${dbWelcome.get(`bvn_${message.guild.id}`)}`)
                
                message.channel.send(`Le message de test d'arrivées à été envoyé dans le channel : <#${channel.id}>`)
            }
            else {
                message.reply("Aucun channel de bienvenue n'a été défini sur ce serveur.")
            }
        }
        else if (args[0] === "goodbye") {
            if (dbGoodbye.has(`gb_${message.guild.id}`)) {
                client.emit("guildMemberRemove", message.member);
                
                const channel = message.guild.channels.cache.find(c => c.id === `${dbGoodbye.get(`gb_${message.guild.id}`)}`)
                
                message.channel.send(`Le message de test de sorties à été envoyé dans le channel : <#${channel.id}>`)
            }
            else {
                message.reply("Aucun channel d'aurevoir n'a été défini sur ce serveur.")
            }
        }
        else if (args[0]) {
            message.reply("Merci de mettre l'argument `welcome` ou `goodbye`.")
        }
    }
    else {
        message.reply("Tu n'as pas la permission `MANAGE_SERVER` nécessaire pour exécuter cette commande.")
    }
}