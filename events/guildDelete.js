module.exports = (client, guild) => {
    const serveur = client.channels.cache.find(c => c.id === `${client.configs.removeChannel}`);
    
    serveur.send(`${client.emotes.left} Serveur quité:\n${guild.name}\n\nObjectif: ${client.guilds.cache.size}/50`);
 
    client.db.set(`prefix_${guild.id}`, "m!");
    client.db.delete(`prefix_${guild.id}`);
    
    client.ranks.set(`lvl_${guild.id}`, "off");
    client.ranks.delete(`lvl_${guild.id}`);
}