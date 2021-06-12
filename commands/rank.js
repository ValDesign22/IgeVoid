const { MessageAttachment } = require("discord.js");

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

        
        message.reply(`Tu es niveau ${memberLevel} avec ${memberXP}, tu dois encore gagner ${XP2NextLvl}xp (${XP2NextLvl / 5} messages) Pour arriver au niveau suivant.`);
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