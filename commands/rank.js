const canvacord = require("canvacord");
const Discord = require("discord.js");

exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank, dbMCount, dbWarns, dbRanks) => {
    if (dbRank.get(`lvl_${message.guild.id}`) === "on") {
        let memberLevel = dbRanks.get(`lvl_${message.author.id}_${message.guild.id}`);
        if (!dbRanks.has(`lvl_${message.author.id}_${message.guild.id}`)) {
            memberLevel = Number(0)
        }
        const memberXP = dbRanks.get(`xp_${message.author.id}_${message.guild.id}`);

        const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic: false, format: "png"}))
        .setCurrentXP(Number(memberXP))
        .setRequiredXP(100)
        .setBackground("COLOR", "#1781b5")
        .setLevel(Number(memberLevel), "LEVEL")
        .setStatus(message.author.presence.status)
        .setProgressBar("#195080", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
    
        rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "newRank.png")
            message.channel.send(attachment)
        })
    }
    else {
        message.channel.send("Le système de niveau sur le serveur est actuellement désactivé.")
    }
}