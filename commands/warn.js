const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Tu n'as pas la permission `KICK_MEMBERS`.");

    const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`);
    const raison = args.slice(1).join(" ");
    
    if (!member) {
        const errorWarn = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription("Tu n'as pas donné le membre qui doit être averti.")

        return message.channel.send(errorWarn);
    }

    if (!raison) {
        const errorWarn2 = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription("Tu n'as pas donné de raison pour l'avertissement.")

        return message.channel.send(errorWarn2);
    }

    if (!member.kickable) {
        const errorWarn2 = new MessageEmbed()
        .setTitle(`${client.emotes.error} Erreur`)
        .setColor(client.colors.red)
        .setDescription(`${member.user.tag} ne peut pas être averti`)

        message.channel.send(errorWarn2);
    }
    else {
        const warnEmbed = new MessageEmbed()
        .setTitle(`Membre Averti`)
        .setColor(client.colors.green)
        .setDescription(`${member.user.tag} à été averti sur le serveur pour raison: ${raison}`)

        message.channel.send(warnEmbed);

        let warns = 0;

        if (!client.db.has(`warn_${member.user.id}`) || client.db.get(`warn_${member.user.id}`) === 0) {
            warns =+ 1;

            client.db.set(`warn_${member.user.id}`, warns);
        }
        else if (client.db.get(`warn_${member.user.id}`) === 2) {
            warns = client.db.get(`warn_${member.user.id}`);

            client.db.set(`warn_${member.user.id}`, warns+1);

            //member.kick({ reason: "Trop d'avertissements." });

            message.channel.send(`${member.user.tag} à été expulsé du serveur car il a reçu trop d'avertissements.`);

            member.user.send(`Tu as été expulsé du serveur ${message.guild.name} car tu as reçu trop d'avertissements.`);

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