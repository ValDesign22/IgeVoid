const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const bugsChannel = client.channels.cache.get(client.config.bugsChannel);
    
    bugsChannel.send("test")
}