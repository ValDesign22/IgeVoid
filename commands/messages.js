exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank, dbMCount, dbWarns, dbRanks) => {

	if (dbRank.get(`lvl_${message.guild.id}`) === "on") {
        const user = message.mentions.users.first() || message.author

        let level = dbRanks.get(`lvl_${message.author.id}_${message.guild.id}`);
        if (!dbRanks.has(`lvl_${message.author.id}_${message.guild.id}`)) {
            level = Number(0)
        }
        const memberXP = dbRanks.get(`xp_${message.author.id}_${message.guild.id}`);

        const messages = ((((((Number(level) * 10) / Number(level)) * (Number(level) * 10)) / 5) + (Number(memberXP) / 5)) + (20 * Number(level)))
        
        if (isNaN(messages)) {
            messages = "aucun"
        }

        message.channel.send(`${user.tag} à envoyé ${messages} messages.`)
    }
    else if (!dbRank.has(`lvl_${message.guild.id}`) || dbRank.get(`lvl_${message.guild.id}`) === "off") {
    	message.reply("Le système de niveaux n'est pas activé, vous ne pouvez pas voir votre messages tant qu'il n'est pas activé, veuillez demander à un membre du staff du serveur de l'activer.");
    }
}