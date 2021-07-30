const { MessageEmbed, MessageCollector } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const ticket = require("../models/ticket");

module.exports.run = async (client, message) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_CHANNELS"), message, client);

    const buttonOpen = new MessageButton()
    .setStyle("blurple")
    .setEmoji("832270349794148414")
    .setID("openNewTicket")

    client.db.delete(`ticketName_${message.guild.id}`)
    client.db.delete(`ticketDesc_${message.guild.id}`)

    const ticketEmbed = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle(message.lang.tickets.Title)
    .setDescription(`<:ticket:832270349794148414> ${message.guild.lang==="fr"?"Pour créer un panel ticket":"To create a ticket panel"}.\n<:close_ticket:832281689778552844> ${message.guild.lang==="fr"?"Pour supprimer un panel ticket":"To delete a ticket panel"}.\n<:error:842729303229595668> ${message.guild.lang==="fr"?"Pour annuler": "To cancel"}.`)

    const msg = await message.channel.send({ embed: ticketEmbed });

    msg.react("<:ticket:832270349794148414>");
    msg.react("<:close_ticket:832281689778552844>");
    msg.react("<:error:842729303229595668>");

    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    collector.on("collect", async (reaction) => {
        if (reaction.emoji.id === "842729303229595668") {
            const eDelete = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle(message.lang.tickets.Title)
            .setDescription(message.guild.lang==="fr"?"Commande annulée.":"Command canceled")

            msg.reactions.removeAll()

            msg.edit({ embed: eDelete });

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

            message.channel.send(message.guild.lang==="fr"?"Merci de me donner l'id d'un ticket à supprimer.":"Please give me the id of a ticket to delete.")
            .then(m => m.delete({ timeout: 15000 }));

            tcktDel.on("collect", async () => {})

            tcktDel.on("end", async (collected) => {
                collected.forEach(async (value) => {
                    value.delete({ timeout: 3000 });

                    if (!value.content) return message.error(message.guild.lang==="fr"?"Aucune donnée fournie.":"No data provided.", message, client).then(m => m.delete({ timeout: 3000 }));

                    if (isNaN(value.content) || value.content.length !== 18) return message.error(message.lang.avatar.notValidID.replace(/{y}/g, value.conten), message, client).then(m => m.delete({ timeout: 3000 }));

                    if (!isNaN(value.content) && value.content.length === 18) {
                        const tktPanelDelete = await ticket.findOne({ id: value.content, reason: "messageID" });

                        if (tktPanelDelete) {
                            message.guild.channels.cache.get(tktPanelDelete.cID).messages.fetch(`${tktPanelDelete.content}`)
                            .then(m => {
                                m.delete();
                            });

                            ticket.deleteOne({ id: value.content, reason: "messageID" }, (err) => {
                                if (err) return console.error(err);
                            });

                            message.reply(`J'ai supprimé le panel ticket correspondant à cet ID ${value.content}.`).then(m => m.delete({ timeout: 3000 }));
                        }
                        else {
                            message.error(`Je n'ai pas trouvé de système ticket avec cet ID \`${value.content}\` ${message.guild.lang==="fr"?"dans la":"in the"} database.`, message, client).then(m => m.delete({ timeout: 3000 }));
                        }
                        return;
                    }
                });
            })
        }

        if (reaction.emoji.id === "832270349794148414") {
            const ticketCreatePanel = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle(message.lang.tickets.Title)
            .setDescription(`<:update:832281793842380871> ${message.lang.tickets.descChan}.\n⬆️ ${message.lang.tickets.descTitle}\n📝 ${message.lang.tickets.descDesc}\n<:error:842729303229595668> ${message.guild.lang==="fr"?"Pour annuler": "To cancel"}.`)
            .addField(message.guild.lang==="fr"?"Titre":"Title", client.db.get(`ticketName_${message.guild.id}`) ? `${client.db.get(`ticketName_${message.guild.id}`)}` : message.guild.lang==="fr"?"Pas encore défini.":"Not defined")
            .addField("Description", client.db.get(`ticketDesc_${message.guild.id}`) ? `${client.db.get(`ticketDesc_${message.guild.id}`)}` : message.guild.lang==="fr"?"Pas encore défini.":"Not defined")

            const m = await msg.edit({ embed: ticketCreatePanel });

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
        
                    message.channel.send(message.lang.tickets.give.replace(/{x}/g, message.guild.lang==="fr"?"titre":"title"))
                    .then(m => m.delete({ timeout: 15000 }));
        
                    tcktTitle.on("collect", async () => {})

                    tcktTitle.on("end", async (collected) => {
                        collected.forEach((value) => {
                            value.delete();

                            if (!value.content) return message.error(message.lang.tickets.cdown.replace(/{x}/g, message.guild.lang==="fr"?"titre":"title"), message, client).then(m => m.delete({ timeout: 3000 }));

                            client.db.set(`ticketName_${message.guild.id}`, value.content);

                            const newTicketCreatePanel = new MessageEmbed()
                            .setColor(client.colors.blue)
                            .setTitle(message.lang.tickets.Title)
                            .setDescription(`<:update:832281793842380871> ${message.lang.tickets.descChan}.\n⬆️ ${message.lang.tickets.descTitle}\n📝 ${message.lang.tickets.descDesc}\n<:error:842729303229595668> ${message.guild.lang==="fr"?"Pour annuler": "To cancel"}.`)
                            .addField(message.guild.lang==="fr"?"Titre":"Title", client.db.get(`ticketName_${message.guild.id}`) ? `${client.db.get(`ticketName_${message.guild.id}`)}` : message.guild.lang==="fr"?"Pas encore défini.":"Not defined")
                            .addField("Description", client.db.get(`ticketDesc_${message.guild.id}`) ? `${client.db.get(`ticketDesc_${message.guild.id}`)}` : message.guild.lang==="fr"?"Pas encore défini.":"Not defined")
                
                            m.edit({ embed: newTicketCreatePanel });
                        })
                    })
                }
                
                if (reaction.emoji.name === "📝") {
                    const filter = (m) => m.author.id === message.author.id;

                    const tcktDesc = new MessageCollector(message.channel, filter, {
                        max: 1,
                        time: 1000 * 15
                    });
        
                    message.channel.send(message.lang.tickets.give.replace(/{x}/g, "description"))
                    .then(m => m.delete({ timeout: 15000 }));
        
                    tcktDesc.on("collect", async () => {})

                    tcktDesc.on("end", async (collected) => {
                        collected.forEach((value) => {
                            value.delete();

                            if (!value.content) return message.error(message.lang.tickets.cdown.replace(/{x}/g, "description"), message, client).then(m => m.delete({ timeout: 3000 }));

                            client.db.set(`ticketDesc_${message.guild.id}`, value.content);

                            const newTicketCreatePanel = new MessageEmbed()
                            .setColor(client.colors.blue)
                            .setTitle(message.lang.tickets.Title)
                            .setDescription(`<:update:832281793842380871> ${message.lang.tickets.descChan}.\n⬆️ ${message.lang.tickets.descTitle}\n📝 ${message.lang.tickets.descDesc}\n<:error:842729303229595668> ${message.guild.lang==="fr"?"Pour annuler": "To cancel"}.`)
                            .addField(message.guild.lang==="fr"?"Titre":"Title", client.db.get(`ticketName_${message.guild.id}`) ? `${client.db.get(`ticketName_${message.guild.id}`)}` : message.guild.lang==="fr"?"Pas encore défini.":"Not defined")
                            .addField("Description", client.db.get(`ticketDesc_${message.guild.id}`) ? `${client.db.get(`ticketDesc_${message.guild.id}`)}` : message.guild.lang==="fr"?"Pas encore défini.":"Not defined")
                
                            m.edit({ embed: newTicketCreatePanel });
                        })
                    })
                }

                if (reaction.emoji.id === "832281793842380871") {
                    if (!client.db.has(`ticketName_${message.guild.id}`)) return message.error(message.lang.tickets.nop.replace(/{x}/g, message.guild.lang==="fr"?"titre":"title"), message, client).then(m => { m.delete({ timeout: 3000 }) });

                    if (!client.db.has(`ticketDesc_${message.guild.id}`)) return message.error(message.lang.tickets.nop.replace(/{x}/g, "description"), message, client).then(m => { m.delete({ timeout: 3000 }) });

                    const filter = (m) => m.author.id === message.author.id;

                    const tcktReady = new MessageCollector(message.channel, filter, {
                        max: 1,
                        time: 1000 * 10
                    });
        
                    message.channel.send(message.lang.mentionChan)
                    .then(m => m.delete({ timeout: 10000 }));
        
                    tcktReady.on("collect", async () => {})

                    tcktReady.on("end", async (collected) => {
                        collected.forEach((value) => {
                            if (!value.mentions.channels.first()) return message.error(message.lang.mentionChan, message, client).then(m => { m.delete({ timeout: 3000 }) });

                            const ticketPanel = new MessageEmbed()
                            .setColor(client.colors.blue)
                            .setTitle(client.db.get(`ticketName_${message.guild.id}`))
                            .setDescription(client.db.get(`ticketDesc_${message.guild.id}`))

                            message.guild.channels.cache.get(value.mentions.channels.first().id).send({ embed: ticketPanel, component: buttonOpen })
                            .then(msgPanel => {
                                const newticketDBSave = new ticket({
                                    id: `${msgPanel.id}`,
                                    cID: `${value.mentions.channels.first().id}`,
                                    text: `${client.db.get(`ticketName_${message.guild.id}`)}`,
                                    content: `${msgPanel.id}`,
                                    reason: 'messageID',
                                }).save();
                            })

                            m.delete();

                            setTimeout(() => {
                                client.db.delete(`ticketName_${message.guild.id}`);
                                client.db.delete(`ticketDesc_${message.guild.id}`);
                            }, 2000)
                        })
                    })
                }
            })
        }

        reaction.users.remove(message.author.id)
    });
}

module.exports.help = {
    description: "Permet de créer un panel de ticket avec boutons.",
    name: "ticket",
    aliases: ["panelticket", "ticketpanel", "tckt"],
    category: "config"
}