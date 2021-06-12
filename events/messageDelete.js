const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    if (client.logs.get(`logsSt_${message.guild.id}`) !== true) return;
    
    const channel = message.guild.channels.cache.get(client.logs.get(`logs_${message.guild.id}`));
    
    if (!channel) return;

    if (!message.content) return;

    if (message.author.bot) return;
    
    const messageDeleted = new MessageEmbed()
    .setTitle("Message Supprimé")
    .setColor(client.colors.red)
    .addField("Channel", `<#${message.channel.id}>`)
    .addField("Auteur du message", `${message.author.tag} (${message.author.id})`)
    .addField("Message", message.content)
    
    channel.send(messageDeleted);
}