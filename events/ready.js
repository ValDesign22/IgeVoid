const Discord = require("discord.js");

module.exports = (client) => {
    console.log(`${client.user.tag} est en ligne.`)

    client.user.setActivity(`${client.config.prefix}help | Dans ${client.guilds.cache.size} serveurs | ${client.users.cache.size} utilisateurs`, {type: "WATCHING"})
}