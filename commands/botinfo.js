const Discord = require("discord.js");

exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank) => {
    var milliseconds = parseInt((client.uptime % 1000) / 100),
    seconds = parseInt((client.uptime / 1000) % 60),
    minutes = parseInt((client.uptime / (1000 * 60)) % 60),
    hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
    days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);

    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (dbWelcome.has(`bvn_${message.guild.id}`)) {
        const welcomeChannel = dbWelcome.get(`bvn_${message.guild.id}`);

        if (dbGoodbye.has(`gb_${message.guild.id}`)) {
            const goodbyeChannel = dbGoodbye.get(`gb_${message.guild.id}`);

            const e = new Discord.MessageEmbed()
            .setTitle(`Infos de ${client.user.tag}`)
            .addField("Stats", `Serveurs: \`${client.guilds.cache.size}\`\nUtilisateurs: \`${client.users.cache.size}\`\nPing du message: \`${Date.now() - message.createdTimestamp} ms\`\nPing du bot: \`${Math.round(client.ws.ping)} ms\`\nUptime: \`${days} jour(s), ${hours} heure(s), ${minutes} minutes et ${seconds} secondes.\`\nMémoire: \`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} / 2000 MB\``)
            .addField("Versions", `Discord.js: \`v${Discord.version}\`\nNode: \`${process.version}\`\nPlateforme: \`${process.platform}\``)
            .addField("Ce serveur", `Prefix: \`${prefix}\`\nChannel de bienvenue: <#${welcomeChannel}>\nChannel d'aurevoir: <#${goodbyeChannel}>\nSystème de niveaux: \`${dbRank.get(`lvl_${message.guild.id}`)}\``)
            .setFooter(`${client.user.username} codé par </ValRedstone>#6507`)

            message.channel.send(e)
        }
        else {
            const goodbyeChannel = "Aucun";

            const e = new Discord.MessageEmbed()
            .setTitle(`Infos de ${client.user.tag}`)
            .addField("Stats", `Serveurs: \`${client.guilds.cache.size}\`\nUtilisateurs: \`${client.users.cache.size}\`\nPing du message: \`${Date.now() - message.createdTimestamp} ms\`\nPing du bot: \`${Math.round(client.ws.ping)} ms\`\nUptime: \`${days} jour(s), ${hours} heure(s), ${minutes} minutes et ${seconds} secondes.\`\nMémoire: \`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} / 2000 MB\``)
            .addField("Versions", `Discord.js: \`v${Discord.version}\`\nNode: \`${process.version}\`\nPlateforme: \`${process.platform}\``)
            .addField("Ce serveur", `Prefix: \`${prefix}\`\nChannel de bienvenue: \`${welcomeChannel}\`\nChannel d'aurevoir: \`${goodbyeChannel}\`\nSystème de niveaux: \`${dbRank.get(`lvl_${message.guild.id}`)}\``)

            message.channel.send(e)
        }
    }
    else {
        const welcomeChannel = "Aucun";

        if (dbGoodbye.has(`gb_${message.guild.id}`)) {
            const goodbyeChannel = dbGoodbye.get(`gb_${message.guild.id}`);

            const e = new Discord.MessageEmbed()
            .setTitle(`Infos de ${client.user.tag}`)
            .addField("Stats", `Serveurs: \`${client.guilds.cache.size}\`\nUtilisateurs: \`${client.users.cache.size}\`\nPing du message: \`${Date.now() - message.createdTimestamp} ms\`\nPing du bot: \`${Math.round(client.ws.ping)} ms\`\nUptime: \`${days} jour(s), ${hours} heure(s), ${minutes} minutes et ${seconds} secondes.\`\nMémoire: \`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} / 2000 MB\``)
            .addField("Versions", `Discord.js: \`v${Discord.version}\`\nNode: \`${process.version}\`\nPlateforme: \`${process.platform}\``)
            .addField("Ce serveur", `Prefix: \`${prefix}\`\nChannel de bienvenue: <#${welcomeChannel}>\nChannel d'aurevoir: <#${goodbyeChannel}>\nSystème de niveaux: \`${dbRank.get(`lvl_${message.guild.id}`)}\``)

            message.channel.send(e)
        }
        else {
            const goodbyeChannel = "Aucun";

            const e = new Discord.MessageEmbed()
            .setTitle(`Infos de ${client.user.tag}`)
            .addField("Stats", `Serveurs: \`${client.guilds.cache.size}\`\nUtilisateurs: \`${client.users.cache.size}\`\nPing du message: \`${Date.now() - message.createdTimestamp} ms\`\nPing du bot: \`${Math.round(client.ws.ping)} ms\`\nUptime: \`${days} jour(s), ${hours} heure(s), ${minutes} minutes et ${seconds} secondes.\`\nMémoire: \`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} / 2000 MB\``)
            .addField("Versions", `Discord.js: \`v${Discord.version}\`\nNode: \`${process.version}\`\nPlateforme: \`${process.platform}\``)
            .addField("Ce serveur", `Prefix: \`${prefix}\`\nChannel de bienvenue: \`${welcomeChannel}\`\nChannel d'aurevoir: \`${goodbyeChannel}\`\nSystème de niveaux: \`${dbRank.get(`lvl_${message.guild.id}`)}\``)

            message.channel.send(e)
        }
    }
}