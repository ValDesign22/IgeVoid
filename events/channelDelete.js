const { MessageEmbed } = require("discord.js");

module.exports = async (client, channel) => {
    if (client.logs.get(`logsSt_${channel.guild.id}`) !== true) return;
    
    const channelLogs = channel.guild.channels.cache.get(client.logs.get(`logs_${channel.guild.id}`));
    
    if (!channelLogs) return;
    
    const channelDeleted = new MessageEmbed()
    .setTitle("Channel Supprimé")
    .setColor(client.colors.red)
    .addField("Channel", channel.name)
    
    channelLogs.send(channelDeleted);
}