const { MessageEmbed, MessageCollector } = require("discord.js");

module.exports = {
    async run(client, message, args, prefix) {
        if (message.author.id === client.configs.ownerID) {
            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle(message.guild.lang==="fr"?"Menu reload":"Reload menu")
            .setDescription("⚙️ Pour recharger une commande.\n📣 Pour recharger un event.\n❌ Pour annuler.");
    
            const msg = await message.channel.send({ embed: e });
    
            msg.react("⚙️");
            msg.react("📣");
            msg.react("❌");
    
            const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
    
            collector.on("collect", async (reaction) => {
                if (reaction.emoji.name === "⚙️") {
                    const filter = (m) => m.author.id === message.author.id;
    
                    const cmdReload = new MessageCollector(message.channel, filter, {
                        max: 1,
                        time: 1000 * 10
                    });
    
                    const e = new MessageEmbed()
                    .setColor(client.colors.blue)
                    .setTitle(message.guild.lang==="fr"?"Menu reload":"Reload menu")
                    .setDescription(message.lang.reload.getCommand);
    
                    msg.edit({ embed: e });
                    msg.reactions.removeAll();   
                    msg.react("❌");
    
                    cmdReload.on('collect', (m) => {});
    
                    cmdReload.on("end", (collected) => {
                        collected.forEach((value) => {
                            if (!value.content) {
                                return message.reply(message.lang.reload.getCommand)
                            }
                            else if (value.content) {
                                const commandName = value.content.toLowerCase(), command = client.commands.get(commandName) || client.commands.find(x => x.help.aliases && x.help.aliases.includes(commandName));
                                
				                if (!command) return message.error(`${message.lang.reload.noCmd} \`${commandName}\``, message, client);

                                delete require.cache[require.resolve(`./${command.help.name}.js`)];
                                
                                try {
                                    let props = require(`./${command.help.name}`);
                                    client.commands.set(props.help.name, props);
                                    if (props.help.aliases) {
                                        props.help.aliases.forEach(alias => {
                                            client.aliases.set(alias, props)
                                        })
                                    }
                                    if (props.help.category) {
                                        client.categories.set(props.help.category, props)
                                    }
                                    message.channel.send(`Command${message.guild.lang==="fr"?"e":""} ${command.help.name} recharg${message.guild.lang==="fr"?"ée":"ed"}.`)
                                }
                                catch (error) {
                                    console.error(error);
                                    message.error(message.lang.reload.errorCmd, message, client);
                                }
                            }
    
                            msg.delete({timeout: 3000});
                        })
                    })
                }
                else if (reaction.emoji.name === "📣") {
                    const filter = (m) => m.author.id === message.author.id;
    
                    const evtReload = new MessageCollector(message.channel, filter, {
                        max: 1,
                        time: 1000 * 10
                    });
    
                    const e = new MessageEmbed()
                    .setColor(client.colors.blue)
                    .setTitle(message.guild.lang==="fr"?"Menu reload":"Reload menu")
                    .setDescription(message.lang.reload.getEvent);
    
                    msg.edit({ embed: e });
                    msg.reactions.removeAll();   
                    msg.react("❌");
    
                    evtReload.on('collect', (m) => {});
    
                    evtReload.on("end", (collected) => {
                        collected.forEach((value) => {
                            if (!value) {
                                message.reply(message.lang.reload.getEvent)
                            }
                            else if (value) {
                                const eventName = value.content;
    
                                const event = require(`../events/${eventName}`);
                    
                                const res = client.listeners(eventName)
                                
                                try {
                                    client.off(eventName, res[0]);
                                    client.on(eventName, event.bind(null, client));
                                    message.channel.send(`Event ${eventName} recharg${message.guild.lang==="fr"?"é":"ed"}.`)
                                    delete require.cache[require.resolve(`../events/${eventName}`)];
                                }
                                catch (error) {
                                    console.error(error);
                                    message.error(message.lang.reload.errorEvt, message, client)
                                }
                            }
    
                            msg.delete({timeout: 3000});
                        })
                    })
                }
                else if (reaction.emoji.name === "❌") {
                    const e = new MessageEmbed()
                    .setColor(client.colors.blue)
                    .setTitle(message.guild.lang==="fr"?"Menu reload":"Reload menu")
                    .setDescription(message.guild.lang==="fr"?"Commande annulée.":"Command canceled");
    
                    msg.edit({ embed: e });
                    msg.reactions.removeAll();
                    msg.delete({timeout: 3000});
                }
            })
        }
        else {
            message.error(message.lang.ownerOnly, message, client)
        } 
    }
}

module.exports.help = {
    name: "reload",
    aliases: ["cmdreload", "eventreload", "reloads", "rel"],
    category: "owner",
    description: "Permet de recharger un event ou une commande du bot.",
}