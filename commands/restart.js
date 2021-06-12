const { readdir, readdirSync } = require("fs");

module.exports = {
    async run(client, message) {
        if (message.author.id === client.configs.ownerID) {
            message.channel.send("Le bot est en train de redémarrer.").then(() => {
            
            client.destroy(); }).then(() => {
                client.login(client.configs.token).then(() => {
                client.user.setActivity(`${client.configs.prefix}help | Dans ${client.guilds.cache.size} serveurs | ${client.users.cache.size} utilisateurs`, {type: "WATCHING"})
                      })
            }).then(() => {
                readdir("./events/", (_err, files) => {
                    files.forEach((file) => {
                        if (!file.endsWith(".js")) return;
                        const event = require(`../events/${file}`);
                        let eventName = file.split(".")[0];
    
                        const res = client.listeners(eventName)
    
                        client.off(eventName, res[0]);
                        client.on(eventName, event.bind(null, client));
                        delete require.cache[require.resolve(`../events/${file}`)];
                    });
                    message.channel.send(`${files.length} events rechargés.`)
                });
    
                const player = readdirSync('./player').filter(file => file.endsWith('.js'));
    
                for (const file of player) {
                    const event = require(`../player/${file}`);
    
                    const res = client.player.listeners(file.split(".")[0])
    
                    client.player.off(file.split(".")[0], res[0]);
                    client.player.on(file.split(".")[0], event.bind(null, client));
                };
    
                readdir("./commands/", (_err, files) => {
                    files.forEach((file) => {
                        if (!file.endsWith(".js")) return;
                        const props = require(`./${file}`);
                        client.commands.set(props.help.name, props);
                        if (props.help.aliases) {
                            props.help.aliases.forEach(alias => {
                                client.aliases.set(alias, props);
                            });
                        }
                        if (props.help.category) {
                            client.categories.set(props.help.category, props);
                        }
                    });
                    message.channel.send(`${files.length} commandes rechargées.`);
                });
                
                message.channel.send("Bot redémarré")
            })
        }
        else {
            message.reply("Tu n'es pas le créateur du bot.");
        }
    }
}

module.exports.help = {
    name: "restart",
    aliases: ["rest", "botrestart", "botredem", "redem"],
    category: "owner",
    description: "Permet de relancer le bot.",
}