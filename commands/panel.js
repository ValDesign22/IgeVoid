const { MessageEmbed, MessageCollector } = require("discord.js");
const welcome = require("../models/welcome");
const goodbye = require("../models/goodbye");

module.exports.run = async (client, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.error(message.lang.noPerm.replace(/{perm}/g, "ADMINISTRATOR"), message, client);

    let welcomeStat = await welcome.findOne({ id: message.guild.id, reason: "welcome" });
    let goodbyeStat = await goodbye.findOne({ id: message.guild.id, reason: "goodbye" });

    if (!welcomeStat) {
        const newWlcDBSave = new welcome({
            id: message.guild.id,
            statut: false,
            content: message.guild.id,
            reason: 'welcome',
        }).save();
    }
    if (!goodbyeStat) {
        const newGbDBSave = new goodbye({
            id: message.guild.id,
            statut: false,
            content: message.guild.id,
            reason: 'goodbye',
        }).save();
    }

    let welcomeStatGet = await welcome.findOne({ id: message.guild.id, reason: "welcome" });
    let statut = welcomeStatGet ? welcomeStatGet.statut : false;

    let gbStatGet = await goodbye.findOne({ id: message.guild.id, reason: "goodbye" });
    let statutGb = gbStatGet ? gbStatGet.statut : false;
    
    const panel = new MessageEmbed()
    .setTitle("Panel de gestion du serveur")
    .setColor(client.colors.blue)
    .setDescription("<:close_ticket:832281689778552844> Pour annuler la commande.")
    .addField("<a:blob_join:828559469789184001> Système de bienvenue:", statut === true ? `${client.emotes.on}` : `${client.emotes.off}`)
    .addField("<a:blob_left:828559672298176542> Système d'aurevoir:", statutGb === true ? `${client.emotes.on}` : `${client.emotes.off}`)
    .addField("<:update:832281793842380871> Compteur de membres:", client.db.get(`mbrA_${message.guild.id}`) === true ? `${client.emotes.on}` : `${client.emotes.off}`)

    const msg = await message.channel.send({ embed: panel })

    msg.react("<a:blob_join:828559469789184001>")
    msg.react("<a:blob_left:828559672298176542>")
    msg.react("<:update:832281793842380871>")
    msg.react("<:close_ticket:832281689778552844>")

    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    collector.on("collect", async (reaction) => {
        if (reaction.emoji.id === "828559469789184001") {
            const welcomePanel = new MessageEmbed()
            .setTitle("Panel de gestion du système de bienvenue.")
            .setColor(client.colors.blue)
            .setDescription("<:on:842728998730989598> Pour activer le système de bienvenue.\n<:off:842728996277059614> Pour désactiver le système de bienvenue.\n<:error:842729303229595668> Pour revenir en arrière.")
            .addField("📣 Channel:", client.db.get(`wC_${message.guild.id}`) ? `<#${client.db.get(`wC_${message.guild.id}`)}>` : "Pas encore défini.")
            .addField("📝 Message:", client.db.get(`wMsg_${message.guild.id}`) ? `${client.db.get(`wMsg_${message.guild.id}`)}` : "Pas encore défini.")
            .addField("👤 Role", client.db.get(`wR_${message.guild.id}`) ? `<@&${client.db.get(`wR_${message.guild.id}`)}>` : "Pas encore défini.")

            const mWelcome = await msg.edit({ embed: welcomePanel });

            msg.reactions.removeAll()
            msg.react("<:on:842728998730989598>")
            msg.react("<:off:842728996277059614>")
            msg.react("📣")
            msg.react("📝")
            msg.react("👤")
            msg.react("<:error:842729303229595668>")

            const wlcCollector = mWelcome.createReactionCollector((reaction, user) => user.id === message.author.id);

            wlcCollector.on("collect", async (reaction) => {

                if (reaction.emoji.id === "842728998730989598") {
                    let newWlcStatGet = await welcome.findOne({ id: message.guild.id, reason: "welcome" });
                    let status = newWlcStatGet ? newWlcStatGet.statut : false;

                    if (status === true) return message.channel.send("Système de bienvenue déjà activé.").then(m => {m.delete({timeout: 3000})});

                    const wlcUpdate = await welcome.findOneAndUpdate({ id: message.guild.id, reason: "welcome" }, { $set: { statut: true, reason: "welcome" } }, { new: true });

                    message.channel.send("Système de bienvenue activé.").then(m => { m.delete({ timeout: 3000 }) })
                }
                
                if (reaction.emoji.id === "842728996277059614") {
                    let newWlcStatGet = await welcome.findOne({ id: message.guild.id, reason: "welcome" });
                    let status = newWlcStatGet ? newWlcStatGet.statut : false;

                    if (status === false) return message.channel.send("Système de bienvenue déjà désactivé.").then(m => {m.delete({timeout: 3000})});

                    const wlcUpdate = await welcome.findOneAndUpdate({ id: message.guild.id, reason: "welcome" }, { $set: { statut: false, reason: "welcome" } }, { new: true });

                    message.channel.send("Système de bienvenue désactivé.").then(m => { m.delete({ timeout: 3000 }) })
                }

                if (reaction.emoji.name === "📣") {
                    const filter = (m) => m.author.id === message.author.id;
    
                    const welcomeSystem = new MessageCollector(message.channel, filter, {
                        max: 1
                    });

                    const messag = await message.channel.send("Merci de mentionner un channel pour définir le channel de bienvenue.")

                    welcomeSystem.on("collect", () => {});

                    welcomeSystem.on("end", (collected) => {
                        collected.forEach((value) => {
                            value.delete();

                            if (value.mentions.channels.first()) {
                                const channel = value.mentions.channels.first();

                                client.db.set(`wC_${message.guild.id}`, channel.id)
                            }

                            const newWelcomePanel = new MessageEmbed()
                            .setTitle("Panel de gestion du système de bienvenue.")
                            .setColor(client.colors.blue)
                            .setDescription("<:on:842728998730989598> Pour activer le système de bienvenue.\n<:off:842728996277059614> Pour désactiver le système de bienvenue.\n<:error:842729303229595668> Pour revenir en arrière.")
                            .addField("📣 Channel:", client.db.get(`wC_${message.guild.id}`) ? `<#${client.db.get(`wC_${message.guild.id}`)}>` : "Pas encore défini.")
                            .addField("📝 Message:", client.db.get(`wMsg_${message.guild.id}`) ? `${client.db.get(`wMsg_${message.guild.id}`)}` : "Pas encore défini.")
                            .addField("👤 Role", client.db.get(`wR_${message.guild.id}`) ? `<@&${client.db.get(`wR_${message.guild.id}`)}>` : "Pas encore défini.")
                            
                            mWelcome.edit({ embed: newWelcomePanel });

                            messag.delete();
                        })
                    })
                }

                if (reaction.emoji.name === "📝") {
                    const filter = (m) => m.author.id === message.author.id;
    
                    const welcomeMessage = new MessageCollector(message.channel, filter, {
                        max: 1
                    });

                    const messg = await message.channel.send("Option:\n- {membre} pour la mention du membre\n- {membreTag} Pour le pseudo+tag du membre.\n- {membreName} Pour le nom du membre\n- {serveur} Pour le nom du serveur\n- {memberCount} Pour le nombre de membres sur le serveur.\n- {totalMemberCount} Pour le nombre de membres sur le sevreur, bot y compris")

                    welcomeMessage.on("collect", () => {});

                    welcomeMessage.on("end", (collected) => {
                        collected.forEach((value) => {
                            client.db.set(`wMsg_${message.guild.id}`, value.content)

                            messg.delete()

                            value.delete()

                            const newWelcomePanel2 = new MessageEmbed()
                            .setTitle("Panel de gestion du système de bienvenue.")
                            .setColor(client.colors.blue)
                            .setDescription("<:on:842728998730989598> Pour activer le système de bienvenue.\n<:off:842728996277059614> Pour désactiver le système de bienvenue.\n<:error:842729303229595668> Pour revenir en arrière.")
                            .addField("📣 Channel:", client.db.get(`wC_${message.guild.id}`) ? `<#${client.db.get(`wC_${message.guild.id}`)}>` : "Pas encore défini.")
                            .addField("📝 Message:", client.db.get(`wMsg_${message.guild.id}`) ? `${client.db.get(`wMsg_${message.guild.id}`)}` : "Pas encore défini.")
                            .addField("👤 Role", client.db.get(`wR_${message.guild.id}`) ? `<@&${client.db.get(`wR_${message.guild.id}`)}>` : "Pas encore défini.")
                            
                            mWelcome.edit({ embed: newWelcomePanel2 });
                        })
                    })
                }

                if (reaction.emoji.name === "👤") {
                    const filter = (m) => m.author.id === message.author.id;
    
                    const welcomeRole = new MessageCollector(message.channel, filter, {
                        max: 1
                    });

                    const messa = await message.channel.send("Merci de mentionner un role.")

                    welcomeRole.on("collect", () => {});

                    welcomeRole.on("end", (collected) => {
                        collected.forEach((value) => {
                            value.delete();

                            messa.delete();

                            if (!value.mentions.roles.first()) return message.reply("Merci de mentionner un role et rien d'autre.");

                            client.db.set(`wR_${message.guild.id}`, value.mentions.roles.first().id);

                            const newWelcomePanel3 = new MessageEmbed()
                            .setTitle("Panel de gestion du système de bienvenue.")
                            .setColor(client.colors.blue)
                            .setDescription("<:on:842728998730989598> Pour activer le système de bienvenue.\n<:off:842728996277059614> Pour désactiver le système de bienvenue.\n<:error:842729303229595668> Pour revenir en arrière.")
                            .addField("📣 Channel:", client.db.get(`wC_${message.guild.id}`) ? `<#${client.db.get(`wC_${message.guild.id}`)}>` : "Pas encore défini.")
                            .addField("📝 Message:", client.db.get(`wMsg_${message.guild.id}`) ? `${client.db.get(`wMsg_${message.guild.id}`)}` : "Pas encore défini.")
                            .addField("👤 Role", client.db.get(`wR_${message.guild.id}`) ? `<@&${client.db.get(`wR_${message.guild.id}`)}>` : "Pas encore défini.")
                            
                            mWelcome.edit({ embed: newWelcomePanel3 });
                        })
                    })
                }
            })
        }

        else if (reaction.emoji.id === "828559672298176542") {
            const goodbyePanel = new MessageEmbed()
            .setTitle("Panel de gestion du système d'aurevoir.")
            .setColor(client.colors.blue)
            .setDescription("🟢 Pour activer le système d'aurevoir.\n🔴 Pour désactiver le système d'aurevoir.\n<:error:842729303229595668> Pour revenir en arrière.")
            .addField("🌐 Channel:", client.db.get(`gC_${message.guild.id}`) ? `<#${client.db.get(`gC_${message.guild.id}`)}>` : "Pas encore défini.")
            .addField("💬 Message:", client.db.get(`gMsg_${message.guild.id}`) ? `${client.db.get(`gMsg_${message.guild.id}`)}` : "Pas encore défini.")

            const mWelcome = await msg.edit({ embed: goodbyePanel });

            msg.reactions.removeAll()
            msg.react("🟢")
            msg.react("🔴")
            msg.react("🌐")
            msg.react("💬")
            msg.react("<:error:842729303229595668>")

            const wlcCollector = mWelcome.createReactionCollector((reaction, user) => user.id === message.author.id);

            wlcCollector.on("collect", async (reaction) => {
                if (reaction.emoji.name === "🟢") {
                    let newGbStatGet = await goodbye.findOne({ id: message.guild.id, reason: "goodbye" });
                    let status = newGbStatGet ? newGbStatGet.statut : false;

                    if (status === true) return message.channel.send("Système d'aurevoir est déjà activé.").then(m => {m.delete({timeout: 3000})})
                    
                    const gbUpdate = await goodbye.findOneAndUpdate({ id: message.guild.id, reason: "goodbye" }, { $set: { statut: true, reason: "goodbye" } }, { new: true });

                    message.channel.send("Système d'aurevoir activé.").then(m => {m.delete({timeout: 3000})})
                }
                
                if (reaction.emoji.name === "🔴") {
                    let newGbStatGet = await goodbye.findOne({ id: message.guild.id, reason: "goodbye" });
                    let status = newGbStatGet ? newGbStatGet.statut : false;

                    if (status === false) return message.channel.send("Système d'aurevoir est déjà désactivé.").then(m => {m.delete({timeout: 3000})})
                    
                    const gbUpdate = await goodbye.findOneAndUpdate({ id: message.guild.id, reason: "goodbye" }, { $set: { statut: false, reason: "goodbye" } }, { new: true });

                    message.channel.send("Système d'aurevoir désactivé.").then(m => {m.delete({timeout: 3000})})
                }

                if (reaction.emoji.name === "🌐") {
                    const filter = (m) => m.author.id === message.author.id;
    
                    const welcomeSystem = new MessageCollector(message.channel, filter, {
                        max: 1
                    });

                    const messag = await message.channel.send("Merci de mentionner un channel pour définir le channel d'aurevoir.")

                    welcomeSystem.on("collect", () => {});

                    welcomeSystem.on("end", (collected) => {
                        collected.forEach((value) => {value.delete();

                            if (value.mentions.channels.first()) {
                                const channel = value.mentions.channels.first();

                                client.db.set(`gC_${message.guild.id}`, channel.id)
                            }

                            const newGoodbyePanel = new MessageEmbed()
                            .setTitle("Panel de gestion du système d'aurevoir.")
                            .setColor(client.colors.blue)
                            .setDescription("🟢 Pour activer le système d'aurevoir.\n🔴 Pour désactiver le système d'aurevoir.\n<:error:842729303229595668> Pour revenir en arrière.")
                            .addField("🌐 Channel:", client.db.get(`gC_${message.guild.id}`) ? `<#${client.db.get(`gC_${message.guild.id}`)}>` : "Pas encore défini.")
                            .addField("💬 Message:", client.db.get(`gMsg_${message.guild.id}`) ? `${client.db.get(`gMsg_${message.guild.id}`)}` : "Pas encore défini.")
                            
                            mWelcome.edit({ embed: newGoodbyePanel });

                            messag.delete();
                        })
                    })
                }

                if (reaction.emoji.name === "💬") {
                    const filter = (m) => m.author.id === message.author.id;
    
                    const welcomeMessage = new MessageCollector(message.channel, filter, {
                        max: 1
                    });

                    const messg = await message.channel.send("Option:\n- {membreTag} Pour le pseudo+tag du membre.\n- {membreName} Pour le nom du membre\n- {serveur} Pour le nom du serveur\n- {memberCount} Pour le nombre de membres sur le serveur.\n- {totalMemberCount} Pour le nombre de membres sur le sevreur, bot y compris")

                    welcomeMessage.on("collect", () => {});

                    welcomeMessage.on("end", (collected) => {
                        collected.forEach((value) => {client.db.set(`gMsg_${message.guild.id}`, value.content)

                            messg.delete()

                            value.delete()

                            const newGoodbyePanel2 = new MessageEmbed()
                            .setTitle("Panel de gestion du système d'aurevoir.")
                            .setColor(client.colors.blue)
                            .setDescription("🟢 Pour activer le système d'aurevoir.\n🔴 Pour désactiver le système d'aurevoir.\n<:error:842729303229595668> Pour revenir en arrière.")
                            .addField("🌐 Channel:", client.db.get(`gC_${message.guild.id}`) ? `<#${client.db.get(`gC_${message.guild.id}`)}>` : "Pas encore défini.")
                            .addField("💬 Message:", client.db.get(`gMsg_${message.guild.id}`) ? `${client.db.get(`gMsg_${message.guild.id}`)}` : "Pas encore défini.")
                            
                            mWelcome.edit({ embed: newGoodbyePanel2 });
                        })
                    })
                }
            })
        }

        else if (reaction.emoji.id === "832281793842380871") {
            msg.reactions.removeAll()

            const mbrCounterPanel = new MessageEmbed()
            .setTitle("Panel de gestion du système du compteur de membres.")
            .setColor(client.colors.blue)
            .setDescription("🟩 Pour activer le système de compteur de membres.\n🟥 Pour désactiver le système de compteur de membres.\n<:error:842729303229595668> Pour revenir en arrière.")
                            
            const mMbc = await msg.edit({ embed: mbrCounterPanel });
            
            mMbc.react("🟩")
            mMbc.react("🟥")
            mMbc.react("<:error:842729303229595668>")

            const mbcCollector = mMbc.createReactionCollector((reaction, user) => user.id === message.author.id);

            mbcCollector.on("collect", async (reaction) => {
                if (reaction.emoji.name === "🟩") {
                    if (client.db.get(`mbrA_${message.guild.id}`) === true) return message.channel.send("Système de compteur de membres est déjà activé.").then(m => {m.delete({timeout: 3000})})
                    client.db.set(`mbrA_${message.guild.id}`, true);
    
                    message.channel.send("Système de compteur de membres activé.").then(m => {m.delete({timeout: 3000})})
                }
                
                if (reaction.emoji.name === "🟥") {
                    if (client.db.get(`mbrA_${message.guild.id}`) === false) return message.channel.send("Système de compteur de membres est déjà désactivé.").then(m => {m.delete({timeout: 3000})})
                    client.db.set(`mbrA_${message.guild.id}`, false);
    
                    message.channel.send("Système de compteur de membres désactivé.").then(m => {m.delete({timeout: 3000})})
                }
            })
        }

        else if (reaction.emoji.id === "842729303229595668") {
            let newWlcStatGet = await welcome.findOne({ id: message.guild.id, reason: "welcome" });
            let status = newWlcStatGet ? newWlcStatGet.statut : false;

            let newGbStatGet = await goodbye.findOne({ id: message.guild.id, reason: "goodbye" });
            let statusGb = newGbStatGet ? newGbStatGet.statut : false;

            msg.reactions.removeAll()

            const newPanel = new MessageEmbed()
            .setTitle("Panel de gestion du serveur")
            .setColor(client.colors.blue)
            .setDescription("<:close_ticket:832281689778552844> Pour annuler la commande.")
            .addField("<a:blob_join:828559469789184001> Système de bienvenue:", status === true ? `${client.emotes.on}` : `${client.emotes.off}`)
            .addField("<a:blob_left:828559672298176542> Système d'aurevoir:", statusGb === true ? `${client.emotes.on}` : `${client.emotes.off}`)
            .addField("<:update:832281793842380871> Compteur de membres:", client.db.get(`mbrA_${message.guild.id}`) === true ? `${client.emotes.on}` : `${client.emotes.off}`)
            
            msg.edit({ embed: newPanel })
            msg.react("<a:blob_join:828559469789184001>")
            msg.react("<a:blob_left:828559672298176542>")
            msg.react("<:update:832281793842380871>")
            msg.react("<:close_ticket:832281689778552844>")
        }

        await reaction.users.remove(message.author.id);

        if (reaction.emoji.id === "832281689778552844") {
            msg.delete();
        }
    })
}

module.exports.help = {
    description: "Permet de gérer le système de bienvenue et d'aurevoir.",
    name: "panel",
    aliases: ["serverpanel", "panelserver"],
    category: "config"
}