exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank, dbMCount, dbWarns, dbRanks) => {
    const user = message.mentions.users.first() || message.author

    let level = dbRanks.get(`lvl_${user.id}_${message.guild.id}`);
    if (!dbRanks.has(`lvl_${user.id}_${message.guild.id}`)) {
        level = Number(0)
    }
    const memberXP = dbRanks.get(`xp_${user.id}_${message.guild.id}`);

    let messages = (20 * Number(level) + (Number(memberXP) / 5))
    if (isNaN(messages)) {
        messages = "aucun"
    }

    message.channel.send(`${user.tag} à envoyé ${messages} messages.`)
}