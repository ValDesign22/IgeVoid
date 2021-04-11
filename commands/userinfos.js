const Discord = require('discord.js');
const moment = require("moment");

exports.run = (client, message, args) => {
    const badges = {
        DISCORD_EMPLOYEE: "<:discord_staff:828222621945823252>",
        PARTNERED_SERVER_OWNER: "<:partner_server_owner:828222550147858463>",
        DISCORD_PARTNER: "<:partner_badge:828237300113866802>",
        HYPESQUAD_EVENTS: "<:hypesquad:828222702447493153>",
        BUGHUNTER_LEVEL_1: "<:bug_tracker:828222959512322048>",
        BUGHUNTER_LEVEL_2: "<:bug_terminator:828222517520236615>",
        HOUSE_BRAVERY: "<:house_of_bravery:828222809921683468>",
        HOUSE_BRILLIANCE: "<:house_of_brillance:828222665918513193>",
        HOUSE_BALANCE: "<:house_of_balance:828222780083535892>",
        EARLY_SUPPORTER: "<:discord_support:828222581789556776>",
        EARLY_VERIFIED_BOT_DEVELOPER: "<:certified_developper:828222921549807620>",
        VERIFIED_DEVELOPER: "<:certified_developper:828222921549807620>",
    }

    const status = {
        online: "<:online:828239556594630696>",
        dnd: "<:dnd:828239782286065704>",
        streaming: "<:streaming:828240613236277258>",
        idle: "<:idle:828239933432528916>",
        offline: "<:invisble:828240063938822214>"
    }

    const user = message.mentions.users.first() || message.author;
    
    moment.locale("fr");
    
    const e = new Discord.MessageEmbed()
    .setColor("#2F3136")
    .setTitle(`Infos de ${user.tag}`)
    .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
    .addField("Nom", `${user.username}`)
    .addField("Tag", `${user.discriminator}`)
    .addField("ID", `${user.id}`)
    .addField("Bot", `${user.bot ? "Oui": "Non"}`)
    .addField("Status", `${status[user.presence.status]}`)
    .addField("<:owner:828241699486040064> Propietaire du serveur", `${message.guild.owner.id === user.id ? "Oui": "Non"}`)
    .addField("Badges", `${badges[user.flags.toArray()] === undefined ? "Aucun badge": badges[user.flags.toArray()]}`)
    .addField("Date de création du compte", `${moment(message.author.createdAt).format("dddd Do MMMM YYYY, HH:mm:ss")}`)
    .addField("Date de l'arrivée sur le serveur", `${moment(user.joinedAt).format('dddd Do MMMM YYYY, HH:mm:ss')}`)

    message.channel.send(e)
}