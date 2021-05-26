const { MessageAttachment } = require("discord.js");
const { Rank } = require("canvacord");

module.exports.run = async (client, message) => {
    if (client.ranks.get(`lvl_${message.guild.id}`) === "on") {
        let memberLevel = client.ranks.get(`lvl_${message.author.id}_${message.guild.id}`);
        if (!client.ranks.has(`lvl_${message.author.id}_${message.guild.id}`)) {
            memberLevel = Number(0)
        }
        const memberXP = client.ranks.get(`xp_${message.author.id}_${message.guild.id}`);
        
        let XP2NextLvl;
        if (client.ranks.has(`lvl_${message.author.id}_${message.guild.id}`)) {
            XP2NextLvl = `${Number(memberLevel) * 100}`
        }
        else {
            XP2NextLvl = Number(100)
        }

        const rank = new Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic: false, format: "png"}))
        .setCurrentXP(Number(memberXP))
        .setRequiredXP(Number(XP2NextLvl))
        .setBackground("COLOR", "#1781b5")
        .setRank(Number(XP2NextLvl) - memberXP, "XP Requis: ")
        .setLevel(Number(memberLevel), "Level: ")
        .setStatus(message.author.presence.status)
        .setProgressBar("#195080", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
    
        rank.build()
        .then(data => {
            const attachment = new MessageAttachment(data, "newRank.png")
            message.channel.send(attachment)
        })
    }
    else if (!client.ranks.has(`lvl_${message.guild.id}`) || client.ranks.get(`lvl_${message.guild.id}`) === "off"){
        message.channel.send("Le système de niveau sur le serveur est actuellement désactivé.")
    }
}

module.exports.help = {
    description: "Permet de voir votre niveau sur le serveur.",
    name: "rank",
    aliases: ["lvl", "niveau", "level"],
    category: "ranks"
}