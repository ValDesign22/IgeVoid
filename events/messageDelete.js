const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    if (!message.guild) return;
    if (client.logs.get(`logsSt_${message.guild.id}`) !== true) return;
    
    const channel = message.guild.channels.cache.get(client.logs.get(`logs_${message.guild.id}`));
    
    if (!channel) return;

    if (!message.content) return;

    if (message.author.bot) return;

    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: "MESSAGE_DELETE"
    });

    const deletionLog = fetchedLogs.entries.first();

    if (!deletionLog) return;
    const { executor, target } = deletionLog;
    
    const messageDeleted = new MessageEmbed()
    .setTitle("Message Supprimé")
    .setColor(client.colors.red)
    .addField("Channel", `<#${message.channel.id}>`)
    .addField("Auteur du message", `${message.author.tag} (${message.author.id})`)
    .addField("Message", message.content)
    .addField("Supprimé par", executor.tag)
    
    channel.send({ embed: messageDeleted });
}