const { MessageEmbed } = require("discord.js");

module.exports = async (client, role) => {
    if (client.logs.get(`logsSt_${role.guild.id}`) !== true) return;
    
    const channelLogs = role.guild.channels.cache.get(client.logs.get(`logs_${role.guild.id}`));
    
    if (!channelLogs) return;
    
    const roleCreated = new MessageEmbed()
    .setTitle("Role Créé")
    .setColor(client.colors.red)
    .addField("Role", `<@&${role.id}> ${role.name} (${role.id})`)
    
    channelLogs.send(roleCreated);
}