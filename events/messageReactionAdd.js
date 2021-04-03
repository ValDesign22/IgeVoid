const Discord = require("discord.js");
const Database = require("easy-json-database");

const dbTickets = new Database("./tickets.json");

module.exports = async (client, reaction, user) => {
    if (user.bot) {
        return
    }
    else {
        const { message } = reaction

        if (reaction.emoji.name === "🔒") {
            if (message.channel.name.endsWith("-ticket")) {
                message.channel.delete();
            }
            else {
                return;
            }
        }
        else if (reaction.emoji.name === "🎟️") {
            if (message.id === dbTickets.get(`ticket_${message.id}`)) {
                let categorie = message.guild.channels.cache.find(c => c.name == "Tickets" && c.type == "category");
                if (!categorie) categorie = await message.guild.channels.create("Tickets", { type: "category", position: 1 }).catch(e => { return console.error(e) });

                reaction.users.remove(user.id)
                if (message.guild.channels.cache.find(ch => ch.name === `${user.id}-ticket`)) {
                    const channelTicket = message.guild.channels.cache.find(ch => ch.name === `${user.id}-ticket`)
                    const e = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Tu as déjà un ticket ouvert:\n<#${channelTicket.id}>`)
                    user.send(e)
                }
                else {
                    message.guild.channels.create(`${user.id}-ticket`, {
                        permissionOverwrites: [
                            {
                                deny: 'VIEW_CHANNEL',
                                id: message.guild.id
                            },
                            {
                                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
                                id: user.id
                            },
                        ],
                        parent: categorie.id,
                        topic: `${user.tag}`
                    })
                    .then(ch => {
                        const e = new Discord.MessageEmbed()
                        .setTitle("Un membre demande de l'aide")
                        .setColor("#2F3136")
                        .setDescription(`Utilisateur: ${user.tag}\nID: ${user.id}`)
                        .setFooter("Merci de cliquer sur 🔒 pour fermer le ticket.")

                        ch.send(e)
                        .then(msg => {
                            msg.react("🔒")
                        })
                    })
                }
            }
        }
    }
}