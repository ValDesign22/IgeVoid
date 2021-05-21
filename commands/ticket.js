const { MessageEmbed, MessageCollector, TextChannel, Message } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Tu n'as pas la permission `MANAGE_CHANNELS`.");

    client.db.delete(`ticketName_${message.guild.id}`)
    client.db.delete(`ticketDesc_${message.guild.id}`)

    const ticketEmbed = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle("Paneau de configuration du système de ticket.")
    .setDescription("<:ticket:832270349794148414> Pour créer un panel ticket.\n<:close_ticket:832281689778552844> Pour supprimer un panel ticket.\n<:error:842729303229595668> Pour annuler.")

    const msg = await message.channel.send(ticketEmbed);

    msg.react("<:ticket:832270349794148414>");
    msg.react("<:close_ticket:832281689778552844>");
    msg.react("<:error:842729303229595668>");

    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    collector.on("collect", async (reaction) => {
        if (reaction.emoji.id === "842729303229595668") {
            const eDelete = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle("Paneau de configuration du système de ticket.")
            .setDescription("Commande annulée.")

            msg.reactions.removeAll()

            msg.edit(eDelete);

            msg.delete({ timeout: 3000 });

            client.db.delete(`ticketName_${message.guild.id}`);
            client.db.delete(`ticketDesc_${message.guild.id}`);
        }

        if (reaction.emoji.id === "832281689778552844") {
            const filter = (m) => m.author.id === message.author.id;

            const tcktDel = new MessageCollector(message.channel, filter, {
                max: 1,
                time: 1000 * 15
            });

            message.channel.send("Merci de me donner l'id d'un ticket à supprimer.")
            .then(m => m.delete({ timeout: 15000 }));

            tcktDel.on("collect", async () => {})

            tcktDel.on("end", async (collected) => {
                collected.forEach((value) => {
                    value.delete({ timeout: 3000 });

                    if (!value.content) return message.reply("Aucune donnée fournie.").then(m => m.delete({ timeout: 3000 }));

                    if (isNaN(value.content) || value.content.length !== 18) return message.reply("Ce n'est pas une ID valide.").then(m => m.delete({ timeout: 3000 }));

                    if (!isNaN(value.content) && value.content.length === 18) {
                        if (client.db.has(`ticket_${value.content}`)) {
                            message.channel.messages.fetch(`${value.content}`)
                            .then(m => {
                                m.delete();
                            })

                            client.db.delete(`ticket_${value.content}`);

                            message.reply(`J'ai supprimé le panel ticket correspondant à cet ID ${value.content}.`).then(m => m.delete({ timeout: 3000 }));
                        }
                        else {
                            message.reply(`Je n'ai pas trouvé de système ticket avec cet ID \`${value.content}\` dans la database.`).then(m => m.delete({ timeout: 3000 }));
                        }
                        return;
                    }
                });
            })
        }

        if (reaction.emoji.id === "832270349794148414") {
            const ticketCreatePanel = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle("Paneau de configuration du système de ticket.")
            .setDescription(`
            <:update:832281793842380871> Pour envoyer le panel ticket dans le channel donné.
            ⬆️ Pour donner un titre au panel ticket.
            📝 Pour donner une description au panel ticket.
            <:error:842729303229595668> Pour annuler la commande.
            `)
            .addField("Titre", client.db.get(`ticketName_${message.guild.id}`) ? `${client.db.get(`ticketName_${message.guild.id}`)}` : "Pas encore défini.")
            .addField("Description", client.db.get(`ticketDesc_${message.guild.id}`) ? `${client.db.get(`ticketDesc_${message.guild.id}`)}` : "Pas encore défini.")

            const m = await msg.edit(ticketCreatePanel);

            m.reactions.removeAll()

            m.react("<:update:832281793842380871>") // Ticket Panel Ready
            m.react("⬆️"); //Title
            m.react("📝"); //Desc
            m.react("<:error:842729303229595668>"); //Cancel

            const createCollector = m.createReactionCollector((reaction, user) => user.id === message.author.id);

            createCollector.on("collect", async (reaction) => {
                if (reaction.emoji.name === "⬆️") {
                    const filter = (m) => m.author.id === message.author.id;

                    const tcktTitle = new MessageCollector(message.channel, filter, {
                        max: 1,
                        time: 1000 * 15
                    });
        
                    message.channel.send("Merci de me donner un titre à mettre au ticket.")
                    .then(m => m.delete({ timeout: 15000 }));
        
                    tcktTitle.on("collect", async () => {})

                    tcktTitle.on("end", async (collected) => {
                        collected.forEach((value) => {
                            value.delete();

                            if (!value.content) return message.reply("Vous n'avez pas donné de titre dans le temps imparti.").then(m => m.delete({ timeout: 3000 }));

                            client.db.set(`ticketName_${message.guild.id}`, value.content);

                            const newTicketCreatePanel = new MessageEmbed()
                            .setColor(client.colors.blue)
                            .setTitle("Paneau de configuration du système de ticket.")
                            .setDescription(`
                            <:update:832281793842380871> Pour envoyer le panel ticket dans le channel donné.
                            ⬆️ Pour donner un titre au panel ticket.
                            📝 Pour donner une description au panel ticket.
                            <:error:842729303229595668> Pour annuler la commande.
                            `)
                            .addField("Titre", client.db.get(`ticketName_${message.guild.id}`) ? `${client.db.get(`ticketName_${message.guild.id}`)}` : "Pas encore défini.")
                            .addField("Description", client.db.get(`ticketDesc_${message.guild.id}`) ? `${client.db.get(`ticketDesc_${message.guild.id}`)}` : "Pas encore défini.")
                
                            m.edit(newTicketCreatePanel);
                        })
                    })
                }
                
                if (reaction.emoji.name === "📝") {
                    const filter = (m) => m.author.id === message.author.id;

                    const tcktDesc = new MessageCollector(message.channel, filter, {
                        max: 1,
                        time: 1000 * 15
                    });
        
                    message.channel.send("Merci de me donner une description à mettre au ticket.")
                    .then(m => m.delete({ timeout: 15000 }));
        
                    tcktDesc.on("collect", async () => {})

                    tcktDesc.on("end", async (collected) => {
                        collected.forEach((value) => {
                            value.delete();

                            if (!value.content) return message.reply("Vous n'avez pas donné de description dans le temps imparti.").then(m => m.delete({ timeout: 3000 }));

                            client.db.set(`ticketDesc_${message.guild.id}`, value.content);

                            const newTicketCreatePanel = new MessageEmbed()
                            .setColor(client.colors.blue)
                            .setTitle("Paneau de configuration du système de ticket.")
                            .setDescription(`
                            <:update:832281793842380871> Pour envoyer le panel ticket dans le channel donné.
                            ⬆️ Pour donner un titre au panel ticket.
                            📝 Pour donner une description au panel ticket.
                            <:error:842729303229595668> Pour annuler la commande.
                            `)
                            .addField("Titre", client.db.get(`ticketName_${message.guild.id}`) ? `${client.db.get(`ticketName_${message.guild.id}`)}` : "Pas encore défini.")
                            .addField("Description", client.db.get(`ticketDesc_${message.guild.id}`) ? `${client.db.get(`ticketDesc_${message.guild.id}`)}` : "Pas encore défini.")
                
                            m.edit(newTicketCreatePanel);
                        })
                    })
                }

                if (reaction.emoji.id === "832281793842380871") {
                    if (!client.db.has(`ticketName_${message.guild.id}`)) return message.reply("Vous n'avez pas donné de titre au ticket.").then(m => { m.delete({ timeout: 3000 }) });

                    if (!client.db.has(`ticketDesc_${message.guild.id}`)) return message.reply("Vous n'avez pas donné de description au ticket.").then(m => { m.delete({ timeout: 3000 }) });

                    const filter = (m) => m.author.id === message.author.id;

                    const tcktReady = new MessageCollector(message.channel, filter, {
                        max: 1,
                        time: 1000 * 10
                    });
        
                    message.channel.send("Merci de mentionner le channel ou va être envoyé le panel ticket.")
                    .then(m => m.delete({ timeout: 10000 }));
        
                    tcktReady.on("collect", async () => {})

                    tcktReady.on("end", async (collected) => {
                        collected.forEach((value) => {
                            if (!value.mentions.channels.first()) return message.reply("Vous n'avez pas mentionné de channel dans le temps imparti.").then(m => { m.delete({ timeout: 3000 }) });

                            const ticketPanel = new MessageEmbed()
                            .setColor(client.colors.blue)
                            .setTitle(client.db.get(`ticketName_${message.guild.id}`))
                            .setDescription(client.db.get(`ticketDesc_${message.guild.id}`))

                            message.guild.channels.cache.get(value.mentions.channels.first().id).send(ticketPanel)
                            .then(message => {
                                message.react("<:ticket:832270349794148414>")

                                client.db.set(`ticket_${message.id}`, message.id)
                            })

                            m.delete();

                            client.db.delete(`ticketName_${message.guild.id}`)
                            client.db.delete(`ticketDesc_${message.guild.id}`)
                        })
                    })
                }
            })
        }

        reaction.users.remove(message.author.id)
    });
}

module.exports.help = {
    description: "Permet de créer un panel de ticket à réaction.",
    name: "ticket",
    aliases: ["panelticket", "ticketpanel", "tckt"],
    category: "config"
}