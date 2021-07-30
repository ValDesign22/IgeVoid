const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "BAN_MEMBERS"), message, client);

    const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`);
    const raison = args.slice(1).join(" ");
    
    if (!member) {
        const errorBan = new MessageEmbed()
        .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
        .setColor(client.colors.red)
        .setDescription(message.lang.banErrorMember)

        return message.channel.send({ embed: errorBan });
    }

    if (!raison) {
        const errorBan2 = new MessageEmbed()
        .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
        .setColor(client.colors.red)
        .setDescription("Tu n'as pas donné de raison pour le ban.")

        return message.channel.send({ embed: errorBan2 });
    }

    if (!member.bannable) {
        const errorBan2 = new MessageEmbed()
        .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
        .setColor(client.colors.red)
        .setDescription(message.lang.banErrorNotBeBanned.replace(/{member}/g, member.user.tag))

        message.channel.send({ embed: errorBan2 });
    }
    else {
        const banEmbed = new MessageEmbed()
        .setTitle(message.lang.banned.replace(/{left}/g, client.emotes.left))
        .setColor(client.colors.green)
        .setDescription(message.lang.memberBanned.replace(/{member}/g, member.user.tag).replace(/{raison}/g, raison))

        message.channel.send({ embed: banEmbed });

        member.ban({ reason: raison });
    }

}

module.exports.help = {
    description: "Permet au membre du serveur ayant la permission `BAN_MEMBERS` de bannir une personne.",
    name: "ban",
    aliases: ["b", "memberban", "memberb"],
    category: "moderation"
}