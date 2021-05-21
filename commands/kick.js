const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Tu n'as pas la permission `KICK_MEMBERS`.");

    const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`);
    const raison = args.slice(1).join(" ");
    
    if (!member) {
        const errorBan = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription("Tu n'as pas donné le membre qui doit être expulsé.")

        return message.channel.send(errorBan);
    }

    if (!raison) {
        const errorBan2 = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription("Tu n'as pas donné de raison pour le kick.")

        return message.channel.send(errorBan2);
    }

    if (!member.kickable) {
        const errorBan2 = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription(`${member.user.tag} ne peut pas être expulsé.`)

        message.channel.send(errorBan2);
    }
    else {
        const banEmbed = new MessageEmbed()
        .setTitle(`${client.emotes.left} Membre Expulsé`)
        .setColor(client.colors.green)
        .setDescription(`${member.user.tag} à été expulé du serveur pour raison: ${raison}`)

        message.channel.send(banEmbed);

        member.kick({ reason: raison });
    }

}

module.exports.help = {
    description: "Permet au membre du serveur ayant la permission `KICK_MEMBERS` d'expuler une personne.",
    name: "kick",
    aliases: ["k", "memberkick", "memberk"],
    category: "moderation"
}