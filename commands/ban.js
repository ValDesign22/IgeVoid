const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Tu n'as pas la permission `BAN_MEMBERS`.");

    const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`);
    const raison = args.slice(1).join(" ");
    
    if (!member) {
        const errorBan = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription("Tu n'as pas donné le membre qui doit être banni.")

        return message.channel.send(errorBan);
    }

    if (!raison) {
        const errorBan2 = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription("Tu n'as pas donné de raison pour le ban.")

        return message.channel.send(errorBan2);
    }

    if (!member.bannable) {
        const errorBan2 = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription(`${member.user.tag} ne peut pas être banni`)

        message.channel.send(errorBan2);
    }
    else {
        const banEmbed = new MessageEmbed()
        .setTitle(`${client.emotes.left} Membre Banni`)
        .setColor(client.colors.green)
        .setDescription(`${member.user.tag} à été banni du serveur pour raison: ${raison}`)

        message.channel.send(banEmbed);

        member.ban({ reason: raison });
    }

}

module.exports.help = {
    description: "Permet au membre du serveur ayant la permission `BAN_MEMBERS` de bannir une personne.",
    name: "ban",
    aliases: ["b", "memberban", "memberb"],
    category: "moderation"
}