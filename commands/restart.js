exports.run = async (client, message) => {
    if (message.author.id === "650664078649458699") {
        message.channel.send("Le bot est en train de redémarrer.").then(() => {
        
        client.destroy(); }).then(() => {
            client.login(client.config.token).then(() => {
            client.user.setActivity(`${client.config.prefix}help | Dans ${client.guilds.cache.size} serveurs | ${client.users.cache.size} utilisateurs`, {type: "WATCHING"})
                  })
        }).then(() => {
            message.channel.send("Bot redémarré")
        })
    }
    else {
        message.reply("Tu n'es pas le créateur du bot.");
    }
}