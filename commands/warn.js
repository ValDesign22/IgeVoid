const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "KICK_MEMBERS"), message, client);

    const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`);
    const raison = args.slice(1).join(" ");
    
    if (!member) {
        const errorWarn = new MessageEmbed()
        .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
        .setColor(client.colors.red)
        .setDescription(message.lang.errorWarnMembers)

        return message.channel.send({ embed: errorWarn });
    }

    if (!raison) {
        const errorWarn2 = new MessageEmbed()
        .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
        .setColor(client.colors.red)
        .setDescription(message.lang.errorWarnReason)

        return message.channel.send({ embed: errorWarn2 });
    }

    if (!member.kickable) {
        const errorWarn2 = new MessageEmbed()
        .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
        .setColor(client.colors.red)
        .setDescription(`${member.user.tag} ${message.lang.cantWarn}`)

        message.channel.send({ embed: errorWarn2 });
    }
    else {
        const warnEmbed = new MessageEmbed()
        .setTitle(message.lang.TitleWarnMember)
        .setColor(client.colors.green)
        .setDescription(`${member.user.tag} ${message.lang.warned} ${raison}`)

        message.channel.send({ embed: warnEmbed });

        let warns = 0;

        if (!client.db.has(`warn_${member.user.id}`) || client.db.get(`warn_${member.user.id}`) === 0) {
            warns =+ 1;

            client.db.set(`warn_${member.user.id}`, warns);
        }
        else if (client.db.get(`warn_${member.user.id}`) === 2) {
            warns = client.db.get(`warn_${member.user.id}`);

            client.db.set(`warn_${member.user.id}`, warns+1);

            member.kick({ reason: "Too many warnings." });

            message.channel.send(`${member.user.tag} ${message.lang.warnsKick}`);

            member.user.send(message.lang.warnsMP.replace(/{guild}/g, message.guild.name));

            client.db.set(`warn_${member.user.id}`, 0);
            client.db.delete(`warn_${member.user.id}`);
        }
        else if (client.db.get(`warn_${member.user.id}`) !== 0) {
            warns = client.db.get(`warn_${member.user.id}`);

            client.db.set(`warn_${member.user.id}`, warns+1);
        }
    }

}

module.exports.help = {
    description: "Permet au membre du serveur ayant la permission `KICK_MEMBERS` d'avertir une personne.",
    name: "warn",
    aliases: ["w", "memberwarn", "memberw"],
    category: "moderation"
}