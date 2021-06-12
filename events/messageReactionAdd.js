const { MessageEmbed } = require("discord.js");

module.exports = async (client, reaction, user) => {
    if (user.bot) return;

    const { message } = reaction

    if (reaction.emoji.id === "832281689778552844") {
        if (message.channel.name.endsWith("-ticket")) {
            message.channel.delete();
        }
        else {
            return;
        }
    }
    else if (reaction.emoji.id === "832270349794148414") {
        if (message.id === client.db.get(`ticket_${message.id}`)) {
            let categorie = message.guild.channels.cache.find(c => c.name == "Tickets" && c.type == "category");
            if (!categorie) categorie = await message.guild.channels.create("Tickets", { type: "category", position: 1 }).catch(e => { return console.error(e) });

            reaction.users.remove(user.id)
            if (message.guild.channels.cache.find(ch => ch.name === `${user.discriminator}-ticket`)) {
                const channelTicket = message.guild.channels.cache.find(ch => ch.name === `${user.discriminator}-ticket`)
                const e = new MessageEmbed()
                .setColor(client.colors.red)
                .setDescription(`Tu as déjà un ticket ouvert:\n<#${channelTicket.id}>`)
                user.send(e)
            }
            else {
                message.guild.channels.create(`${user.discriminator}-ticket`, {
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
                    const e = new MessageEmbed()
                    .setTitle("Un membre demande de l'aide")
                    .setColor(client.colors.blue)
                    .setDescription(`Utilisateur: ${user.tag}\nID: ${user.id}`)
                    .setFooter("Merci de cliquer sur la réaction pour fermer le ticket.")

                    ch.send(e)
                    .then(msg => {
                        msg.react(client.emojis.cache.get("832281689778552844"))
                    })
                })
            }
        }
    }
}