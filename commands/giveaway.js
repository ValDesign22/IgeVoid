const { MessageEmbed, MessageCollector } = require("discord.js");
const ms = require('ms');

module.exports = {
    async run(client, message) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Vous n'avez pas la permission `MANAGE_MESSAGES`.")
        }
    
        const e = new MessageEmbed()
        .setTitle("Menu de giveaways")
        .setDescription("▶️ Pour lancer un giveaway\n⏹️ Pour stoper un giveaway\n🔄 Pour reroll un giveaway\n❌ Pour annuler")
    
        const msg = await message.channel.send(e)
    
        msg.react("▶️")
        msg.react("⏹️")
        msg.react("🔄")
        msg.react("❌")
    
        const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
    
        collector.on("collect", async (reaction) => {
            if (reaction.emoji.name === "▶️") {
                await reaction.users.remove(message.author.id);
    
                const e = new MessageEmbed()
                .setColor(client.colors.blue)
                .setTitle("Menu de giveaways")
                .setDescription("📢 Pour lancer le giveaway\n🔗 Pour definir le channel\n⏱️ Pour definir le temps\n🏅 Pour definir le nombre de gagnants\n🎁 Pour definir le lot\n❌ Pour annuler")
                .addField("Channel :", client.db.has(`gwC_${message.guild.id}`) ? `<#${client.db.get(`gwC_${message.guild.id}`)}>` : "Pas encore défini")
                .addField("Temps :", client.db.has(`gwT_${message.guild.id}`) ? `${client.db.get(`gwT_${message.guild.id}`)}` : "Pas encore défini")
                .addField("Gagnants :", client.db.has(`gwG_${message.guild.id}`) ? `${client.db.get(`gwG_${message.guild.id}`)}` : "Pas encore défini")
                .addField("Lot: ", client.db.has(`gwL_${message.guild.id}`) ? `${client.db.get(`gwL_${message.guild.id}`)}` : "Pas encore défini")
    
                msg.reactions.removeAll();
                const msgStart = await msg.edit(e);
    
                msgStart.react("📢")
                msgStart.react("🔗")
                msgStart.react("⏱️")
                msgStart.react("🏅")
                msgStart.react("🎁")
                msgStart.react("❌")
    
                const giveawayStart = msgStart.createReactionCollector((reaction, user) => user.id === message.author.id);
    
                giveawayStart.on("collect", async (reaction) => {
                    if (reaction.emoji.name === "📢") {
                        await reaction.users.remove(message.author.id);
    
                        if (!client.db.has(`gwC_${message.guild.id}`)) {
                            return message.channel.send("Le giveaway ne peut pas démarer car le channel n'est pas défini.")
                            .then(mD => {
                                mD.delete({timeout: 3000})
                            })
                        }
                        if (!client.db.has(`gwT_${message.guild.id}`)) {
                            return message.channel.send("Le giveaway ne peut pas démarer car le temps n'est pas défini.")
                            .then(mD => {
                                mD.delete({timeout: 3000})
                            })
                        }
                        if (!client.db.has(`gwG_${message.guild.id}`)) {
                            return message.channel.send("Le giveaway ne peut pas démarer car le nombre de gagnants n'est pas défini.")
                            .then(mD => {
                                mD.delete({timeout: 3000})
                            })
                        }
                        if (!client.db.has(`gwL_${message.guild.id}`)) {
                            return message.channel.send("Le giveaway ne peut pas démarer car le lot n'est pas défini.")
                            .then(mD => {
                                mD.delete({timeout: 3000})
                            })
                        }
    
                        let giveawayChannel = message.guild.channels.cache.find(c => c.id === `${client.db.get(`gwC_${message.guild.id}`)}`);
    
                        let giveawayDuration = client.db.get(`gwT_${message.guild.id}`);
    
                        let giveawayPrize = client.db.get(`gwL_${message.guild.id}`);
    
                        let giveawayNumberWinners = client.db.get(`gwG_${message.guild.id}`);
    
                        client.giveawaysManager.start(giveawayChannel, {
                            time: ms(giveawayDuration),
                        
                            prize: giveawayPrize,
    
                            winnerCount: giveawayNumberWinners,
    
                            hostedBy: client.configs.hostedBy ? message.author : null,
    
                            messages: {
                                giveaway: (client.configs.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY** 🎉",
                                giveawayEnded: (client.configs.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY TERMINE** 🎉",
                                timeRemaining: "⏱️: **{duration}**!",
                                inviteToParticipate: "Réagis avec  📥pour participer!",
                                winMessage: "🎉 Félicitations, {winners}! Tu as gagné **{prize}**!",
                                embedFooter: "🎉 Giveaways",
                                noWinner: "😥 Giveaway annulé, aucune participations.",
                                hostedBy: "🎁 Offert par: {user}",
                                winners: "🏆 Gagnant(s)",
                                endedAt: "⏱️ Terminé à",
                                units: {
                                    seconds: "secondes",
                                    minutes: "minutes",
                                    hours: "heures",
                                    days: "jours",
                                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                                }
                            }
                        })
    
                        client.db.delete(`gwC_${message.guild.id}`);
                        client.db.delete(`gwT_${message.guild.id}`);
                        client.db.delete(`gwG_${message.guild.id}`);
                        client.db.delete(`gwL_${message.guild.id}`);
    
                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setTitle("Menu de giveaways")
                        .setDescription(`Giveaway lancé dans le channel ${giveawayChannel}!\nLot: ${giveawayPrize}\nGagnant(s): ${giveawayNumberWinners}\nTemps: ${giveawayDuration}`);
    
                        msgStart.reactions.removeAll();
                        msgStart.edit(e);
                    }
                    else if (reaction.emoji.name === "🔗") {
                        await reaction.users.remove(message.author.id);
                        
                        const filter = (m) => m.author.id === message.author.id;
    
                        const giveawayStart = new MessageCollector(message.channel, filter, {
                            max: 1,
                            time: 1000 * 15
                        });
    
                        message.channel.send("Merci de mentionner le channel où va démarer le giveaway.")
                        .then(mD => {
                            mD.delete({timeout: 15000})
                        })
    
                        giveawayStart.on("collect", (m) => {})
    
                        giveawayStart.on("end", async (collected) => {
                            collected.forEach((value) => {
                                if (!value) {
                                    const e = new MessageEmbed()
                                    .setColor(client.colors.blue)
                                    .setTitle("Menu de giveaways")
                                    .setDescription("Le temps est écoulé, vous pouvez réessayer d'executer la commande dans 3 secondes.");
    
                                    msg.reactions.removeAll();
                                    msg.edit(e);
                                    msg.delete({timeout: 3000});
                                }
                                else if (value.mentions.channels.first()) {
                                    client.db.set(`gwC_${message.guild.id}`, `${value.mentions.channels.first().id}`);
                                    
                                    value.delete()
                                    
                                    const e = new MessageEmbed()
                                    .setColor(client.colors.blue)
                                    .setTitle("Menu de giveaways")
                                    .setDescription("🔗 Pour definir le channel\n⏱️ Pour definir le temps\n🏅 Pour definir le nombre de gagnants\n🎁 Pour definir le lot\n❌ Pour annuler")
                                    .addField("Channel :", client.db.has(`gwC_${message.guild.id}`) ? `<#${client.db.get(`gwC_${message.guild.id}`)}>` : "Pas encore défini")
                                    .addField("Temps :", client.db.has(`gwT_${message.guild.id}`) ? `${client.db.get(`gwT_${message.guild.id}`)}` : "Pas encore défini")
                                    .addField("Gagnants :", client.db.has(`gwG_${message.guild.id}`) ? `${client.db.get(`gwG_${message.guild.id}`)}` : "Pas encore défini")
                                    .addField("Lot: ", client.db.has(`gwL_${message.guild.id}`) ? `${client.db.get(`gwL_${message.guild.id}`)}` : "Pas encore défini")
    
                                    msgStart.edit(e)
                                }
                            })
                        })
                    }
                    else if (reaction.emoji.name === "⏱️") {
                        await reaction.users.remove(message.author.id);
                        
                        const filter = (m) => m.author.id === message.author.id;
    
                        const giveawayStart = new MessageCollector(message.channel, filter, {
                            max: 1,
                            time: 1000 * 15
                        });
    
                        message.channel.send("Merci de dire le temps du giveaway: `1s/m/h/d`.")
                        .then(mD => {
                            mD.delete({timeout: 15000})
                        })
    
                        giveawayStart.on("collect", (m) => {})
    
                        giveawayStart.on("end", async (collected) => {
                            collected.forEach((value) => {
                                if (!value) {
                                    const e = new MessageEmbed()
                                    .setColor(client.colors.blue)
                                    .setTitle("Menu de giveaways")
                                    .setDescription("Le temps est écoulé, vous pouvez réessayer d'executer la commande dans 3 secondes.");
    
                                    msg.reactions.removeAll();
                                    msg.edit(e);
                                    msg.delete({timeout: 3000});
                                }
                                else if (value) {
                                    client.db.set(`gwT_${message.guild.id}`, `${value.content}`);
                                    
                                    value.delete()
                                    
                                    const e = new MessageEmbed()
                                    .setColor(client.colors.blue)
                                    .setTitle("Menu de giveaways")
                                    .setDescription("🔗 Pour definir le channel\n⏱️ Pour definir le temps\n🏅 Pour definir le nombre de gagnants\n🎁 Pour definir le lot\n❌ Pour annuler")
                                    .addField("Channel :", client.db.has(`gwC_${message.guild.id}`) ? `<#${client.db.get(`gwC_${message.guild.id}`)}>` : "Pas encore défini")
                                    .addField("Temps :", client.db.has(`gwT_${message.guild.id}`) ? `${client.db.get(`gwT_${message.guild.id}`)}` : "Pas encore défini")
                                    .addField("Gagnants :", client.db.has(`gwG_${message.guild.id}`) ? `${client.db.get(`gwG_${message.guild.id}`)}` : "Pas encore défini")
                                    .addField("Lot: ", client.db.has(`gwL_${message.guild.id}`) ? `${client.db.get(`gwL_${message.guild.id}`)}` : "Pas encore défini")
    
                                    msgStart.edit(e)
                                }
                            })
                        })
                    }
                    else if (reaction.emoji.name === "🏅") {
                        await reaction.users.remove(message.author.id);
                        
                        const filter = (m) => m.author.id === message.author.id;
    
                        const giveawayStart = new MessageCollector(message.channel, filter, {
                            max: 1,
                            time: 1000 * 15
                        });
    
                        message.channel.send("Merci de dire le nombre de gagnants du giveaway du giveaway.")
                        .then(mD => {
                            mD.delete({timeout: 15000})
                        })
    
                        giveawayStart.on("collect", (m) => {})
    
                        giveawayStart.on("end", async (collected) => {
                            collected.forEach((value) => {
                                if (!value) {
                                    const e = new MessageEmbed()
                                    .setColor(client.colors.blue)
                                    .setTitle("Menu de giveaways")
                                    .setDescription("Le temps est écoulé, vous pouvez réessayer d'executer la commande dans 3 secondes.");
    
                                    msg.reactions.removeAll();
                                    msg.edit(e);
                                    msg.delete({timeout: 3000});
                                }
                                else if (value && isNaN(value.content)) {
                                    message.channel.send("Le nombre de gagnants de peut pas être du texte, merci de me donner un nombre.")
                                    .then(mD => {
                                        mD.delete({timeout: 3000});
                                    })
                                }
                                else if (value && !isNaN(value.content)) {
                                    client.db.set(`gwG_${message.guild.id}`, `${value.content}`);
                                    
                                    value.delete()
                                    
                                    const e = new MessageEmbed()
                                    .setColor(client.colors.blue)
                                    .setTitle("Menu de giveaways")
                                    .setDescription("🔗 Pour definir le channel\n⏱️ Pour definir le temps\n🏅 Pour definir le nombre de gagnants\n🎁 Pour definir le lot\n❌ Pour annuler")
                                    .addField("Channel :", client.db.has(`gwC_${message.guild.id}`) ? `<#${client.db.get(`gwC_${message.guild.id}`)}>` : "Pas encore défini")
                                    .addField("Temps :", client.db.has(`gwT_${message.guild.id}`) ? `${client.db.get(`gwT_${message.guild.id}`)}` : "Pas encore défini")
                                    .addField("Gagnants :", client.db.has(`gwG_${message.guild.id}`) ? `${client.db.get(`gwG_${message.guild.id}`)}` : "Pas encore défini")
                                    .addField("Lot: ", client.db.has(`gwL_${message.guild.id}`) ? `${client.db.get(`gwL_${message.guild.id}`)}` : "Pas encore défini")
    
                                    msgStart.edit(e)
                                }
                            })
                        })
                    }
                    else if (reaction.emoji.name === "🎁") {
                        await reaction.users.remove(message.author.id);
                        
                        const filter = (m) => m.author.id === message.author.id;
    
                        const giveawayStart = new MessageCollector(message.channel, filter, {
                            max: 1,
                            time: 1000 * 15
                        });
    
                        message.channel.send("Merci de dire le lot du giveaway.")
                        .then(mD => {
                            mD.delete({timeout: 15000})
                        })
    
                        giveawayStart.on("collect", (m) => {})
    
                        giveawayStart.on("end", async (collected) => {
                            collected.forEach((value) => {
                                if (!value) {
                                    const e = new MessageEmbed()
                                    .setColor(client.colors.blue)
                                    .setTitle("Menu de giveaways")
                                    .setDescription("Le temps est écoulé, vous pouvez réessayer d'executer la commande dans 3 secondes.");
    
                                    msg.reactions.removeAll();
                                    msg.edit(e);
                                    msg.delete({timeout: 3000});
                                }
                                else if (value) {
                                    client.db.set(`gwL_${message.guild.id}`, `${value.content}`);
                                    
                                    value.delete()
                                    
                                    const e = new MessageEmbed()
                                    .setColor(client.colors.blue)
                                    .setTitle("Menu de giveaways")
                                    .setDescription("🔗 Pour definir le channel\n⏱️ Pour definir le temps\n🏅 Pour definir le nombre de gagnants\n🎁 Pour definir le lot\n❌ Pour annuler")
                                    .addField("Channel :", client.db.has(`gwC_${message.guild.id}`) ? `<#${client.db.get(`gwC_${message.guild.id}`)}>` : "Pas encore défini")
                                    .addField("Temps :", client.db.has(`gwT_${message.guild.id}`) ? `${client.db.get(`gwT_${message.guild.id}`)}` : "Pas encore défini")
                                    .addField("Gagnants :", client.db.has(`gwG_${message.guild.id}`) ? `${client.db.get(`gwG_${message.guild.id}`)}` : "Pas encore défini")
                                    .addField("Lot: ", client.db.has(`gwL_${message.guild.id}`) ? `${client.db.get(`gwL_${message.guild.id}`)}` : "Pas encore défini")
    
                                    msgStart.edit(e)
                                }
                            })
                        })
                    }
                })
            }
            else if (reaction.emoji.name === "⏹️") {
                await reaction.users.remove(message.author.id);
    
                const filter = (m) => m.author.id === message.author.id;
    
                const giveawayEnd = new MessageCollector(message.channel, filter, {
                    max: 1,
                    time: 1000 * 30
                });
    
                const e = new MessageEmbed()
                .setColor(client.colors.blue)
                .setTitle("Menu de giveaways")
                .setDescription("Merci de me donner un ID de giveaway à faire terminer ci dessous.");
    
                msg.reactions.removeAll();
                msg.edit(e);   
                msg.react("❌");
    
                giveawayEnd.on('collect', (m) => {});
    
                giveawayEnd.on("end", async (collected) => {
                    collected.forEach((value) => {
                        if (!value) {
                            const e = new MessageEmbed()
                            .setColor(client.colors.blue)
                            .setTitle("Menu de giveaways")
                            .setDescription("Le temps est écoulé, vous pouvez réessayer d'executer la commande dans 3 secondes.");
    
                            msg.reactions.removeAll();
                            msg.edit(e);
                            msg.delete({timeout: 3000});
                        }
                        else if (value && value.content.length === 18) {
                            let giveaway =
                            client.giveawaysManager.giveaways.find((g) => g.prize === value.content) ||
                            client.giveawaysManager.giveaways.find((g) => g.messageID === value.content);
    
                            if (!giveaway) {
                                return message.channel.send('Impossible de trouver un giveaway pour `'+ value.content + '`.');
                            }
    
                            client.giveawaysManager.edit(giveaway.messageID, {
                                setEndTimestamp: Date.now()
                            })
    
                            .then(() => {
                                // Success message
                                message.channel.send('Le giveaway se terminera en moins de '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
                            })
                            .catch((e) => {
                                if(e.startsWith(`Le giveaway avec cet ID de message ${giveaway.messageID} est déjà terminé.`)){
                                    message.channel.send('Ce giveaway est déjà terminé!');
                                } else {
                                    console.error(e);
                                    message.channel.send("Une erreur s'est produite...");
                                }
                            });
                        }
                    })
                })
            }
            else if (reaction.emoji.name === "🔄") {
                await reaction.users.remove(message.author.id);
    
                const filter = (m) => m.author.id === message.author.id;
    
                const giveawayEnd = new MessageCollector(message.channel, filter, {
                    max: 1,
                    time: 1000 * 30
                });
    
                const e = new MessageEmbed()
                .setColor(client.colors.blue)
                .setTitle("Menu de giveaways")
                .setDescription("Merci de me donner un ID de giveaway à faire reroll ci dessous.");
    
                msg.reactions.removeAll();
                msg.edit(e);   
                msg.react("❌");
    
                giveawayEnd.on('collect', (m) => {});
    
                giveawayEnd.on("end", async (collected) => {
                    collected.forEach((value) => {
                        if (!value) {
                            const e = new MessageEmbed()
                            .setColor(client.colors.blue)
                            .setTitle("Menu de giveaways")
                            .setDescription("Le temps est écoulé, vous pouvez réessayer d'executer la commande dans 3 secondes.");
    
                            msg.reactions.removeAll();
                            msg.edit(e);
                            msg.delete({timeout: 3000});
                        }
                        else if (value && value.content.length === 18) {
                            let giveaway = 
                            // Search with giveaway prize
                            client.giveawaysManager.giveaways.find((g) => g.prize === value.content) ||
                            // Search with giveaway ID
                            client.giveawaysManager.giveaways.find((g) => g.messageID === value.content);
    
                            if (!giveaway) {
                                return message.channel.send('Impossible de trouver un giveaway pour `'+ value.content +'`.');
                            }
    
                            client.giveawaysManager.reroll(giveaway.messageID)
                            .then(() => {
                                // Success message
                                message.channel.send('Giveaway reroll!');
                            })
                            .catch((e) => {
                                if(e.startsWith(`Le giveaway avec cet ID de message ${giveaway.messageID} n'est pas fini.`)){
                                    message.channel.send("Ce giveaway n'est pas terminé!");
                                } else {
                                    console.error(e);
                                    message.channel.send("Une erreur c'est produite...");
                                }
                            });
                        }
                    })
                })
            }
            else if (reaction.emoji.name === "❌") {
                await reaction.users.remove(message.author.id);
    
                const e = new MessageEmbed()
                .setColor(client.colors.blue)
                .setTitle("Menu de giveaways")
                .setDescription("Commande annulée")
    
                msg.reactions.removeAll()
                msg.edit(e)
                msg.delete({timeout: 3000})
    
                if (client.db.has(`gwC_${message.guild.id}`)) {
                    client.db.delete(`gwC_${message.guild.id}`);
                    client.db.delete(`gwT_${message.guild.id}`);
                    client.db.delete(`gwG_${message.guild.id}`);
                    client.db.delete(`gwL_${message.guild.id}`);
                }
                if (client.db.has(`gwT_${message.guild.id}`)) {
                    client.db.delete(`gwC_${message.guild.id}`);
                    client.db.delete(`gwT_${message.guild.id}`);
                    client.db.delete(`gwG_${message.guild.id}`);
                    client.db.delete(`gwL_${message.guild.id}`);
                }
                if (client.db.has(`gwG_${message.guild.id}`)) {
                    client.db.delete(`gwC_${message.guild.id}`);
                    client.db.delete(`gwT_${message.guild.id}`);
                    client.db.delete(`gwG_${message.guild.id}`);
                    client.db.delete(`gwL_${message.guild.id}`);
                }
                if (client.db.has(`gwL_${message.guild.id}`)) {
                    client.db.delete(`gwC_${message.guild.id}`);
                    client.db.delete(`gwT_${message.guild.id}`);
                    client.db.delete(`gwG_${message.guild.id}`);
                    client.db.delete(`gwL_${message.guild.id}`);
                }
            }
        })
    }
}

module.exports.help = {
    name: "giveaway",
    aliases: ["gw", "givea", "gaway"],
    category: "giveaway",
    description: "Permet de lancer, stopper ou relancer un giveaway.",
}