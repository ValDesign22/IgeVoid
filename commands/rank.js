const { Rank } = require("canvacord");
const { MessageAttachment } = require("discord.js");
const levels = require("../models/levels");
const guild = require("../models/guild");

module.exports.run = async (client, message, args) => {
    let user = message.author

    if (!message.mentions.users.first() && args[0]) user = message.guild.members.cache.get(args.join(" ")).user;
    else if (message.mentions.users.first() && !args[0]) user = message.mentions.users.first();

    let levelGet = await guild.findOne({ id: message.guild.id, reason: `levels` });

    let level = levelGet.content;

    const userdata = await levels.findOne({ sID: message.guild.id, uID: user.id });

    if (level !== "on") return message.error(message.lang.levels.notActivate, message, client);
	if (!userdata) return message.error(message.lang.levels.noLvls.replace(/{user}/g, user.tag), message, client);
    const memberLevel = userdata.lvl;
    const memberXP = userdata.xp;
        
    let XP2NextLvl;
    if (memberLevel !== 0) XP2NextLvl = `${(Number(memberLevel) * 100)}`;
    else XP2NextLvl = (Number(100));

    const rankCard = new Rank()
    .setAvatar(user.displayAvatarURL({ format: "png" }))
    .setCurrentXP(memberXP)
    .setRequiredXP(Number(XP2NextLvl))
    .setLevel(memberLevel)
    .setStatus(user.presence.status)
    .setProgressBar(client.colors.blue, "COLOR")
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setRank(Number(XP2NextLvl) - memberXP, "XP Requis: ")
    .build()

    .then(data => {
        const attachment = new MessageAttachment(data, "newRank.png")
        message.channel.send(attachment)
    });
}

module.exports.help = {
    description: "Permet de voir votre niveau sur le serveur.",
    name: "rank",
    aliases: ["lvl", "niveau", "level"],
    category: "ranks"
}