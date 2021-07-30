const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild, user) => {
    if (!guild) return;
    if (!user) return;
    if (client.logs.get(`logsSt_${guild.id}`) !== true) return;
    
    const channel = guild.channels.cache.get(client.logs.get(`logs_${guild.id}`));
    
    if (!channel) return;
    
    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_BAN_ADD"
    });

    const bansLog = fetchedLogs.entries.first();

    if (!bansLog) return;
    const { executor, target } = bansLog;
    
    const memberBanned = new MessageEmbed()
    .setTitle("Membre Banni")
    .setColor(client.colors.red)
    .addField("Membre", user.tag)
    .addField("Banni par", executor.tag)
    
    channel.send({ embed: memberBanned });
}