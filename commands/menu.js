const { MessageEmbed, MessageCollector } = require("discord.js")

module.exports.run = async (client, message) => {
    if (client.db.get(`premium_${message.author.id}`) !== true) return message.reply("Tu n'as pas le premium, vote sur top.gg (m!vote) pour l'avoir.");
    
    if (!message.member.voice.channel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`);

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Vous n'êtes pas dans le même canal vocal que moi.`);

    if (!client.player.getQueue(message)) return message.channel.send(`Aucune musique en cours.`);

    const track = client.player.nowPlaying(message);
    const filters = [];
    const queue = client.player.getQueue(message);

    Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;
    
    const e = new MessageEmbed()
    .setColor(client.colors.blue)
    .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
    .setTitle("Menu de musique")
    .setThumbnail(track.thumbnail)
    .addField("Nom de la musique", `${track.title}`)
    .addField("Volume", `${client.player.getQueue(message).volume}%`)
    .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
    .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
    .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
    .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
    .addField("Playlist", queue.tracks.map((track, i) => {
        return `**#${i + 1}** - ${track.title} | ${track.author}`
    }).slice(0, 5).join('\n'))

    const msg = await message.channel.send(e)

    msg.react("🔎")
    msg.react("🔁")
    msg.react("🔂")
       msg.react("▶️")
    msg.react("⏸️")
    msg.react("⏹️")
    msg.react("⏩")
    msg.react("🔀")
    msg.react("📶")
    msg.react("🗑️")

    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    collector.on("collect", async (reaction) => {
        if (reaction.emoji.name === "🔎") {
            const filter = (m) => m.author.id === message.author.id;

            const add = new MessageCollector(message.channel, filter, {
                max: 1,
                time: 1000 * 15
            });

            message.channel.send("Merci de me donner un titre de musique.")
            .then(msgAskVol => {
                msgAskVol.delete({timeout: 15000})
            })

            add.on('collect', (m) => {});

               add.on("end", (collected) => {
                collected.forEach((value) => {
                    if (!value) {
                        message.reply("Merci de donner un titre de musique.")
                    }
                    else {
                        client.player.play(message, value.content, { firstResult: true });

                        setTimeout(() => {
                            const musicLoop = new MessageEmbed()
                            .setColor(client.colors.blue)
                            .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
                            .setTitle("Menu de musique")
                              .setThumbnail(client.player.nowPlaying(message).thumbnail)
                            .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
                            .addField("Volume", `${client.player.getQueue(message).volume}%`)
                            .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
                            .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
                            .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
                            .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
                            .addField("Playlist", queue.tracks.map((track, i) => {
                                return `**#${i + 1}** - ${track.title} | ${track.author}`
                            }).slice(0, 5).join('\n'))

                            msg.edit(musicLoop)
                        }, 3000)
                    }
                })
            })
        }
        else if (reaction.emoji.name === "🔁") {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);

                const musicLoop = new MessageEmbed()
                .setColor(client.colors.blue)
                .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
                .setTitle("Menu de musique")
                .setThumbnail(client.player.nowPlaying(message).thumbnail)
                .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
                .addField("Volume", `${client.player.getQueue(message).volume}%`)
                .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
                .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
                .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
                .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
                .addField("Playlist", queue.tracks.map((track, i) => {
                    return `**#${i + 1}** - ${track.title} | ${track.author}`
                }).slice(0, 5).join('\n'))

                msg.edit(musicLoop)
            } else {
                client.player.setRepeatMode(message, true);

                const musicLoop = new MessageEmbed()
                .setColor(client.colors.blue)
                .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
                .setTitle("Menu de musique")
                .setThumbnail(client.player.nowPlaying(message).thumbnail)
                .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
                .addField("Volume", `${client.player.getQueue(message).volume}%`)
                .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
                .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
                .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
                .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
                .addField("Playlist", queue.tracks.map((track, i) => {
                    return `**#${i + 1}** - ${track.title} | ${track.author}`
                }).slice(0, 5).join('\n'))

                msg.edit(musicLoop)
            };
        }
        else if (reaction.emoji.name === "🔂") {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);

                const musicLoop = new MessageEmbed()
                .setColor(client.colors.blue)
                .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
                .setTitle("Menu de musique")
                .setThumbnail(client.player.nowPlaying(message).thumbnail)
                .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
                .addField("Volume", `${client.player.getQueue(message).volume}%`)
                .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
                .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
                .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
                .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
                .addField("Playlist", queue.tracks.map((track, i) => {
                    return `**#${i + 1}** - ${track.title} | ${track.author}`
                }).slice(0, 5).join('\n'))

                msg.edit(musicLoop)
            } else {
                client.player.setLoopMode(message, true);
                    
                const musicLoop = new MessageEmbed()
                .setColor(client.colors.blue)
                .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
                .setTitle("Menu de musique")
                .setThumbnail(client.player.nowPlaying(message).thumbnail)
                .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
                .addField("Volume", `${client.player.getQueue(message).volume}%`)
                .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
                .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
                .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
                .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
                .addField("Playlist", queue.tracks.map((track, i) => {
                    return `**#${i + 1}** - ${track.title} | ${track.author}`
                }).slice(0, 5).join('\n'))

                msg.edit(musicLoop)
            };
        }
        else if (reaction.emoji.name === "▶️") {
            if (!client.player.getQueue(message).paused) {
                message.channel.send(`La musique est déjà en cours.`)
                .then(m => m.delete({timeout: 5000}))
            }
            
            client.player.resume(message);
           
            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
            .setTitle("Menu de musique")
            .setThumbnail(client.player.nowPlaying(message).thumbnail)
            .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
            .addField("Volume", `${client.player.getQueue(message).volume}%`)
            .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
            .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
            .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
            .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
            .addField("Playlist", queue.tracks.map((track, i) => {
                return `**#${i + 1}** - ${track.title} | ${track.author}`
            }).slice(0, 5).join('\n'))
            
            msg.edit(e)
        }
        if (reaction.emoji.name === "⏸️") {
            if (client.player.getQueue(message).paused) {
                message.channel.send(`La musique est déjà en pause.`)
                .then(m => m.delete({timeout: 5000}))
            }
            
            client.player.pause(message);
           
            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
            .setTitle("Menu de musique")
            .setThumbnail(client.player.nowPlaying(message).thumbnail)
            .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
            .addField("Volume", `${client.player.getQueue(message).volume}%`)
            .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
            .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
            .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
            .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
            .addField("Playlist", queue.tracks.map((track, i) => {
                return `**#${i + 1}** - ${track.title} | ${track.author}`
            }).slice(0, 5).join('\n'))
            
            msg.edit(e)
        }
        else if (reaction.emoji.name === "⏹️") {
            client.player.setRepeatMode(message, false);
            client.player.stop(message);
           
            const eStop = new MessageEmbed()
            .setColor(client.colors.blue)
            .setDescription("La musique du serveur s'est stoppée.")
            
            msg.edit(eStop);
            msg.reactions.removeAll()
            .then(m => {
                m.delete({timeout: 5000})
            })
        }
        else if (reaction.emoji.name === "⏩") {
            client.player.skip(message);
            
            setTimeout(() => {
                const e = new MessageEmbed()
                .setColor(client.colors.blue)
                .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
                .setTitle("Menu de musique")
                .setThumbnail(client.player.nowPlaying(message).thumbnail)
                .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
                .addField("Volume", `${client.player.getQueue(message).volume}%`)
                .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
                .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
                .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
                .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
                .addField("Playlist", queue.tracks.map((track, i) => {
                    return `**#${i + 1}** - ${track.title} | ${track.author}`
                }).slice(0, 5).join('\n'))
            
                msg.edit(e)
            }, 5000)
        }
        else if (reaction.emoji.name === "🔀") {
            const success = client.player.shuffle(message);

            if (success) message.channel.send(`File d'attente mélangée **${client.player.getQueue(message).tracks.length}** musique(s) !`)
            .then(m => {
                m.delete({timeout: 5000})
            })
            
            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
            .setTitle("Menu de musique")
            .setThumbnail(client.player.nowPlaying(message).thumbnail)
            .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
            .addField("Volume", `${client.player.getQueue(message).volume}%`)
            .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
            .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
            .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
            .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
            .addField("Playlist", queue.tracks.map((track, i) => {
                return `**#${i + 1}** - ${track.title} | ${track.author}`
            }).slice(0, 5).join('\n'))
           
            msg.edit(e)
        }
        else if (reaction.emoji.name === "📶") {
            const filter = (m) => m.author.id === message.author.id;

            const volume = new MessageCollector(message.channel, filter, {
                max: 1,
                time: 1000 * 10
            });

            message.channel.send("Merci de me donner un volume à mettre à la musique.")
            .then(msgAskVol => {
                msgAskVol.delete({timeout: 10000})
            })

            volume.on('collect', (m) => {
                m.channel.send("Volume changé.")
                .then(msgVol => {
                    msgVol.delete({timeout: 5000})
                });
            });

            volume.on("end", (collected) => {
                collected.forEach((value) => {
                    value.delete();

                    if (isNaN(value.content) || value.content === 'Infinity') {
                        message.channel.send(`Merci d'entrer un nombre valide.`).then(msgVol => {
                            msgVol.delete({timeout: 5000})
                        });
                    }
    
                    else if (Math.round(parseInt(value.content)) < 1 || Math.round(parseInt(value.content)) > 100) {
                        message.channel.send(`Merci d'entrer un chiffre compris entre 1 et 100.`)
                        .then(msgVol => {
                            msgVol.delete({timeout: 5000})
                        });
                    }
                        
                    else if (!isNaN(value.content) || !value.content === 'Infinity' || !Math.round(parseInt(value.content)) < 1 || !Math.round(parseInt(value.content)) > 100) {
                        client.player.setVolume(message, parseInt(value.content));

                        message.channel.send(`Volume changé à **${parseInt(value.content)}%** !`)
                        .then(msgVol => {
                            msgVol.delete({timeout: 5000})
                        })

                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
                        .setTitle("Menu de musique")
                        .setThumbnail(client.player.nowPlaying(message).thumbnail)
                        .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
                        .addField("Volume", `${client.player.getQueue(message).volume}%`)
                        .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
                        .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
                        .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
                        .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
                        .addField("Playlist", queue.tracks.map((track, i) => {
                            return `**#${i + 1}** - ${track.title} | ${track.author}`
                        }).slice(0, 5).join('\n'))
            
                        msg.edit(e)
                    }
                })
            })
        }
        else if (reaction.emoji.name === "🗑️") {
            if (!client.player.getQueue(message)) {
                message.channel.send(`Aucune musique en cours.`)
                .then(m => m.delete({timeout: 3000}));
            }

            else if (client.player.getQueue(message).tracks.length <= 1) {
                message.channel.send(`Il y a seulement 1 musique dans la file d'attente.`)
                .then(m => m.delete({timeout: 3000}));
            }
            else {
                client.player.clearQueue(message);

                message.channel.send(`La file d'attente a été réinitialisée.`)
                .then(m => m.delete({timeout: 3000}));

                setTimeout(() => {
                    const e = new MessageEmbed()
                    .setColor(client.colors.blue)
                    .setDescription("🔎 Pour chercher une musique\n🔁 Repeter la musique\n🔂 Repeter la playlist\n▶️ Pour relancer la musique\n⏸️ Pour mettre en pause la musique\n⏹️ Pour arreter la musique\n⏩ Pour mettre la musique suivante\n🔀 Pour melanger la playlist\n📶 Pour changer le volume de la musique\n🗑️ Pour vider la file d'attente")
                    .setTitle("Menu de musique")
                    .setThumbnail(client.player.nowPlaying(message).thumbnail)
                    .addField("Nom de la musique", `${client.player.nowPlaying(message).title}`)
                    .addField("Volume", `${client.player.getQueue(message).volume}%`)
                    .addField("Musique en pause", `${client.player.getQueue(message).paused ? "Oui" : "Non"}`)
                    .addField("Musique en repetion", `${client.player.getQueue(message).repeatMode ? "Oui" : "Non"}`)
                    .addField("Playlist en repetion", `${client.player.getQueue(message).loopMode ? "Oui" : "Non"}`)
                    .addField("Barre de progression", client.player.createProgressBar(message, { timecodes: true }))
                    .addField("Playlist", queue.tracks.map((track, i) => {
                        return `**#${i + 1}** - ${track.title} | ${track.author}`
                    }).slice(0, 5).join('\n'))
            
                    msg.edit(e)
                }, 3000)
            }
        }
        
        await reaction.users.remove(message.author.id);
   })
}

module.exports.help = {
	name: "menu",
	aliases: ["musics", "musicmenu"],
	category: "music",
    description: "Permet de gerer votre musique avec un menu à réaction.",
}