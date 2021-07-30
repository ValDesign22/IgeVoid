const { MessageEmbed } = require("discord.js");
const guild = require("../models/guild");

module.exports.run = async (client, message, args, prefix) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_CHANNELS"), message, client);

    let levelGet = await guild.findOne({ id: message.guild.id, reason: `levels` });

    let level = levelGet.content;

    if (!args[0]) {
        const e = new MessageEmbed()
        .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
        .setColor(client.colors.red)
        .setDescription(`Merci de faire \`${prefix}levels active\` pour activer le système de niveau, ou \`${prefix}levels desactive\` pour desactiver le système de niveau.`)

        message.channel.send({ embed: e })
    }
    else if (args[0] === "active") {
        if (level !== "on") {
            const levels = await guild.findOneAndUpdate({ id: message.guild.id, reason: `levels` }, { $set: { content: "on", reason: `levels` } }, { new: true });

            const e = new MessageEmbed()
            .setTitle("Réussite")
            .setColor(client.colors.green)
            .setDescription(`${client.emotes.on} Le système de niveau sur le serveur à été activé.`)

            message.channel.send({ embed: e })
        }
        else {
            const e = new MessageEmbed()
            .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
            .setColor(client.colors.red)
            .setDescription(`${client.emotes.error} Le système de niveau sur le serveur est déjà activé.`)

            message.channel.send({ embed: e })
        }
    }
    else if (args[0] === "desactive") {
        if (level !== "off") {
            const levels = await guild.findOneAndUpdate({ id: message.guild.id, reason: `levels` }, { $set: { content: "off", reason: `levels` } }, { new: true });

            const e = new MessageEmbed()
            .setTitle("Réussite")
            .setColor(client.colors.green)
            .setDescription(`${client.emotes.off} Le système de niveau sur le serveur à été désactivé.`)

            message.channel.send({ embed: e })
        }
        else {
            const e = new MessageEmbed()
            .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
            .setColor(client.colors.red)
            .setDescription(`${client.emotes.error} Le système de niveau sur le serveur est déjà désactivé.`)

            message.channel.send({ embed: e })
        }
    }
    else if (args[0]) {
        const e = new MessageEmbed()
        .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
        .setColor(client.colors.red)
        .setDescription(`${client.emotes.error} Merci de faire \`${prefix}levels active\` pour activer le système de niveau, ou \`${prefix}levels desactive\` pour desactiver le système de niveau.`)

        message.channel.send({ embed: e })
    }
}

module.exports.help = {
    description: "Permet d'activer ou désactiver le ssytème de niveaux sur le serveur.",
    name: "levels",
    aliases: ["leveling", "ranks"],
    category: "ranks"
}