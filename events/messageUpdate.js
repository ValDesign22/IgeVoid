const { MessageEmbed } = require("discord.js");

module.exports = async (client, oldMessage, newMessage) => {
    if (client.logs.get(`logsSt_${newMessage.guild.id}`) !== true) return;
    
    const channel = newMessage.guild.channels.cache.get(client.logs.get(`logs_${newMessage.guild.id}`));
    
    if (!channel) return;

    if (!newMessage.content || !oldMessage.content) return;

    if (oldMessage.author.bot || newMessage.author.bot) return;
    
    const messageUpdated = new MessageEmbed()
    .setTitle("Message édité")
    .setColor(client.colors.orange)
    .addField("Channel", `<#${newMessage.channel.id}>`)
    .addField("Auteur du message", `${newMessage.author.tag} (${newMessage.author.id})`)
    .addField("Ancien Message", oldMessage.content)
    .addField("Nouveau Message", newMessage.content)
    
    channel.send(messageUpdated);
}