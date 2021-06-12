const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild, user) => {
    if (client.logs.get(`logsSt_${guild.id}`) !== true) return;
    
    const channel = guild.channels.cache.get(client.logs.get(`logs_${guild.id}`));
    
    if (!channel) return;
    
    const memberBanned = new MessageEmbed()
    .setTitle("Membre Banni")
    .setColor(client.colors.red)
    .addField("Membre", user.tag)
    
    channel.send(memberBanned);
}