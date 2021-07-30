module.exports = (client, guild) => {
    const serveur = client.channels.cache.find(c => c.id === `${client.configs.removeChannel}`);
    
    serveur.send(`${client.emotes.left} Serveur quité:\n${guild.name}\n\nObjectif: ${client.guilds.cache.size}/75`);
}