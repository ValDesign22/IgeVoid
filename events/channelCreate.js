const { MessageEmbed } = require("discord.js");

module.exports = async (client, channel) => {
    if (client.logs.get(`logsSt_${channel.guild.id}`) !== true) return;
    
    const channelLogs = channel.guild.channels.cache.get(client.logs.get(`logs_${channel.guild.id}`));
    
    if (!channelLogs) return;
    
    const channelCreated = new MessageEmbed()
    .setTitle("Channel Créé")
    .setColor(client.colors.red)
    .addField("Channel", `<#${channel.id}>`)
    
    channelLogs.send(channelCreated);
}