const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const ticket = require("../models/ticket");

module.exports = async (client, button) => {
    const { clicker, id, reply, channel, guild, message, applicationID } = button;

    if (applicationID !== "804289381141446666") return;

    if (clicker.user.bot) return

    let buttonClose = new MessageButton()
    .setStyle("blurple")
    .setEmoji("832281689778552844")
    .setID("deleteTicket")

    if (id === "unlockChannelButton") {
        if (!clicker.member.hasPermission("MANAGE_CHANNELS")) return reply.send("Tu n'as pas la permission `MANAGE_CHANNELS`.", true);

        if (!channel.name.startsWith("🔒-")) return reply.send("Ce channel est déja débloqué.", true);

        channel.updateOverwrite(guild.roles.everyone, {
            SEND_MESSAGES: null
        });

        channel.setName(`${channel.name.slice(2)}`);

        message.delete();

        channel.send(`Le channel à été débloqué.\nModérateur: ${clicker.user.tag}.`);

        return;
    }
    else if (id === "deleteMsgButton") {
        return message.delete();
    }
    else if (id === "deleteTicket") {
        if (channel.name.endsWith("-ticket")) {
            const user = await client.users.fetch(channel.topic);
            user.send(`Ton ticket sur ${guild.name} vient juste d'être fermé.`);

            channel.delete();
        }
        else {
            return;
        }
    }
    else if (id === "openNewTicket") {
        const msgID = await ticket.findOne({ id: message.id, reason: "messageID" });

        if (!msgID) return reply.send("Je ne possède pas ce panel ticket dans ma base de donnée. Merci d'ouvrir un ticket sur le support du bot `iv!support` pour pouvoir mettre les données de votre panel ticket dans la base de donnée.", true);

        if (msgID.content === message.id) {
            let categorie = guild.channels.cache.find(c => c.name == "Tickets" && c.type == "category");
            if (!categorie) categorie = await guild.channels.create("Tickets", { type: "category", position: 1 }).catch(e => { return console.error(e) });

            if (guild.channels.cache.find(ch => ch.name === `${clicker.user.discriminator}-ticket`)) {
                const channelTicket = guild.channels.cache.find(ch => ch.name === `${clicker.user.discriminator}-ticket`)
                const e = new MessageEmbed()
                .setColor(client.colors.red)
                .setDescription(`Tu as déjà un ticket ouvert:\n<#${channelTicket.id}>`)
                clicker.user.send({ embed: e });

                reply.send("Regarde tes messages privés.", true);
            }
            else {
                guild.channels.create(`${clicker.user.discriminator}-ticket`, {
                    permissionOverwrites: [
                        {
                            deny: 'VIEW_CHANNEL',
                            id: guild.id
                        },
                        {
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
                            id: clicker.user.id
                        },
                    ],
                    parent: categorie.id,
                    topic: `${clicker.user.id}`
                })
                .then(ch => {
                    const e = new MessageEmbed()
                    .setTitle("Un membre demande de l'aide")
                    .setColor(client.colors.blue)
                    .setDescription(`Utilisateur: ${clicker.user.tag}\nID: ${clicker.user.id}\n\nRaison: **${msgID.text}**`)
                    .setFooter("Merci de cliquer sur la réaction pour fermer le ticket.")

                    ch.send({ embed: e, component: buttonClose })
                    .then(msg => {
                        msg.pin({ reason: "Nouveau ticket." });
                    });

                    reply.send(`Un channel ticket vient juste d'être ouvert pour toi: <#${ch.id}>`, true);
                })
            }
        }
        else return reply.send("Ce n'est pas un panel ticket valide.", true);
    }
    else return;
}