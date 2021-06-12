module.exports = (client, guild) => {
    const serveur = client.channels.cache.find(c => c.id === `${client.configs.addChannel}`);
    
    serveur.send(`${client.emotes.join} Nouveau serveur rejoint:\n${guild.name}\n\nObjectif: ${client.guilds.cache.size}/50`);

    client.ranks.set(`lvl_${guild.id}`, "off");
}