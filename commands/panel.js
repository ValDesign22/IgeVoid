const { MessageEmbed, MessageCollector } = require("discord.js");

module.exports.run = async (client, message) => {
    const panel = new MessageEmbed()
    .setTitle("Panel de gestion du serveur")
    .setColor(client.colors.blue)
    .addField("<a:blob_join:828559469789184001> Système de bienvenue:", client.db.get(`bvnA_${message.guild.id}`) === true ? `${client.emotes.on}` : `${client.emotes.off}`)
    .addField("<a:blob_left:828559672298176542> Système d'aurevoir:", client.db.get(`gbA_${message.guild.id}`) === true ? `${client.emotes.on}` : `${client.emotes.off}`)

    const msg = await message.channel.send(panel)

    msg.react("<a:blob_join:828559469789184001>")
    msg.react("<a:blob_left:828559672298176542>")

    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    collector.on("collect", async (reaction) => {
        if (reaction.emoji.id === "828559469789184001") {
            const welcomePanel = new MessageEmbed()
            .setTitle("Panel de gestion du système de bienvenue.")
            .setColor(client.colors.blue)
            .setDescription("<:on:842728998730989598> Pour activer le système de bienvenue.\n<:off:842728996277059614> Pour désactiver le système de bienvenue.\n<:error:842729303229595668> Pour revenir en arrière.")
            .addField("📣 Channel:", client.db.get(`wC_${message.guild.id}`) ? `<#${client.db.get(`wC_${message.guild.id}`)}>` : "Pas encore défini.")

            const mWelcome = await msg.edit(welcomePanel);

            msg.reactions.removeAll()
            msg.react("<:on:842728998730989598>")
            msg.react("<:off:842728996277059614>")
            msg.react("📣")
            msg.react("<:error:842729303229595668>")

            const wlcCollector = mWelcome.createReactionCollector((reaction, user) => user.id === message.author.id);

            wlcCollector.on("collect", async (reaction) => {
                if (reaction.emoji.id === "842728998730989598") {
                    if (client.db.get(`bvnA_${message.guild.id}`) === true) return message.channel.send("Système de bienvenue déjà activé.").then(m => {m.delete({timeout: 3000})})
                    client.db.set(`bvnA_${message.guild.id}`, true);

                    message.channel.send("Système de bienvenue activé.").then(m => {m.delete({timeout: 3000})})
                }
                
                if (reaction.emoji.id === "842728996277059614") {
                    if (client.db.get(`bvnA_${message.guild.id}`) === false) return message.channel.send("Système de bienvenue déjà désactivé.").then(m => {m.delete({timeout: 3000})})
                    client.db.set(`bvnA_${message.guild.id}`, false);

                    message.channel.send("Système de bienvenue désactivé.").then(m => {m.delete({timeout: 3000})})
                }

                if (reaction.emoji.name === "📣") {
                    const filter = (m) => m.author.id === message.author.id;
    
                    const welcomeSystem = new MessageCollector(message.channel, filter, {
                        max: 1
                    });

                    welcomeSystem.on("collect", () => {});

                    welcomeSystem.on("end", (collected) => {
                        collected.forEach((value) => {
                            if (value.mentions.channels.first()) {
                                const channel = value.mentions.channels.first();

                                client.db.set(`wC_${message.guild.id}`, channel.id)
                            }
                        })
                    })
                }
            })        
        }

        if (reaction.emoji.id === "842729303229595668") {
            msg.reactions.removeAll()
            msg.edit(panel)
            msg.react("<a:blob_join:828559469789184001>")
            msg.react("<a:blob_left:828559672298176542>")
        }

        await reaction.users.remove(message.author.id);
    })
}

module.exports.help = {
    description: "Permet de gérer le système de bienvenue d'aurevoir et le compteur de membres.",
    name: "panel",
    aliases: ["serverpanel", "panelserver"],
    category: "config"
}