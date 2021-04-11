const Database = require("easy-json-database");

const dbRank = new Database("./leveling.json");

module.exports = (client, guild) => {
    const serveur = client.channels.cache.find(c => c.id === `${client.config.addChannel}`);
    
    serveur.send(`<a:blob_join:828559469789184001> Nouveau serveur rejoint:\n${guild.name}\n\nObjectif: ${client.guilds.cache.size}/50`);

    dbRank.set(`lvl_${guild.id}`, "off")
}