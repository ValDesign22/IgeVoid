const Discord = require("discord.js");
const Topgg = require('@top-gg/sdk');

module.exports = (client) => {
    console.log(`${client.user.tag} est en ligne.`)
const api = new Topgg.Api(`${client.config.topggToken}`);
    client.user.setActivity(`${client.config.prefix}help | Dans ${client.guilds.cache.size} serveurs | ${client.users.cache.size} utilisateurs`, {type: "WATCHING"})
    
    setInterval(() => {
  api.postStats({
    serverCount: client.guilds.cache.size
  })
}, 1800000)
}