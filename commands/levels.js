const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Tu n'as pas la permission `MANAGE_CHANNELS` nécessaire pour éxecuter cette commande.");

    if (!args[0]) {
        const e = new MessageEmbed()
        .setTitle("Erreur de syntaxe")
        .setColor(client.colors.red)
        .setDescription(`Merci de faire \`${prefix}levels active\` pour activer le système de niveau, ou \`${prefix}levels desactive\` pour desactiver le système de niveau.`)

        message.channel.send(e)
    }
    else if (args[0] === "active") {
        if (client.ranks.get(`lvl_${message.guild.id}`) !== "on") {
            client.ranks.set(`lvl_${message.guild.id}`, "on")

            const e = new MessageEmbed()
            .setTitle("Réussite")
            .setColor(client.colors.green)
            .setDescription(`${client.emotes.on} Le système de niveau sur le serveur à été activé.`)

            message.channel.send(e)
        }
        else {
            const e = new MessageEmbed()
            .setTitle("Erreur")
            .setColor(client.colors.red)
            .setDescription(`${client.emotes.error} Le système de niveau sur le serveur est déjà activé.`)

            message.channel.send(e)
        }
    }
    else if (args[0] === "desactive") {
        if (client.ranks.get(`lvl_${message.guild.id}`) !== "off") {
            client.ranks.set(`lvl_${message.guild.id}`, "off")

            const e = new MessageEmbed()
            .setTitle("Réussite")
            .setColor(client.colors.green)
            .setDescription(`${client.emotes.off} Le système de niveau sur le serveur à été désactivé.`)

            message.channel.send(e)
        }
        else {
            const e = new MessageEmbed()
            .setTitle("Erreur")
            .setColor(client.colors.red)
            .setDescription(`${client.emotes.error} Le système de niveau sur le serveur est déjà désactivé.`)

            message.channel.send(e)
        }
    }
    else if (args[0]) {
        const e = new MessageEmbed()
        .setTitle("Erreur de syntaxe")
        .setColor(client.colors.red)
        .setDescription(`${client.emotes.error} Merci de faire \`${prefix}levels active\` pour activer le système de niveau, ou \`${prefix}levels desactive\` pour desactiver le système de niveau.`)

        message.channel.send(e)
    }
}

module.exports.help = {
    description: "Permet d'activer ou désactiver le ssytème de niveaux sur le serveur.",
    name: "levels",
    aliases: ["leveling", "ranks"],
    category: "ranks"
}