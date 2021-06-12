const { MessageEmbed, version } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
    var milliseconds = parseInt((client.uptime % 1000) / 100),
    seconds = parseInt((client.uptime / 1000) % 60),
    minutes = parseInt((client.uptime / (1000 * 60)) % 60),
    hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
    days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);

    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    const e = new MessageEmbed()
    .setTitle(`Infos de ${client.user.tag}`)
    .setColor(client.colors.blue)
    .addField("Stats", `Serveurs: \`${client.guilds.cache.size}\`\nUtilisateurs: \`${client.users.cache.size}\`\nPing du message: \`${Date.now() - message.createdTimestamp} ms\`\nPing du bot: \`${Math.round(client.ws.ping)} ms\`\nUptime: \`${days} jour(s), ${hours} heure(s), ${minutes} minutes et ${seconds} secondes.\`\nMémoire: \`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} / 2000 MB\``)
    .addField("Versions", `${client.user.username}: \`v${require("../package.json").version}\`\nDiscord.js: \`v${version}\`\nNode: \`${process.version}\`\nPlateforme: \`${process.platform}\``)
    .setFooter(`${client.user.username} codé par </ValRedstone>#6507 (650664078649458699)`)

    message.channel.send(e)
}

module.exports.help = {
    name: "botinfo",
    aliases: ["boti", "bi", "bot", "infobot"],
    category: "bot",
    description: "Permet de voir les infos du bot.",
}