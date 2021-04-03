const Database = require("easy-json-database");

const dbPrefixs = new Database("./prefixs.json");
const dbRank = new Database("./leveling.json")

module.exports = (client, guild) => {
    const serveur = client.channels.cache.find(c => c.id === `${client.config.removeChannel}`);
    
    serveur.send(`Serveur quité:\n${guild.name}\n\nObjectif: ${client.guilds.cache.size}/50`);
 
    dbPrefixs.set(`prefix_${guild.id}`, "m!");
    dbPrefixs.delete(`prefix_${guild.id}`);
    
    dbRank.set(`lvl_${guild.id}`, "off");
    dbRank.delete(`lvl_${guild.id}`)
}