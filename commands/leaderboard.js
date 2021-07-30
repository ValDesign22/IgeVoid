const levels = require("../models/levels");
const guild = require("../models/guild");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
    let levelGet = await guild.findOne({ id: message.guild.id, reason: `levels` });

    let level = levelGet.content;

    if (level !== "on") return message.reply(message.lang.levels.notActivate);

    const usersdata = await levels.find({ sID: message.guild.id });

    if (usersdata.length < 3) return message.reply(`${message.lang.levels.size} ${usersdata.length}\`)`);

    const dataGetCmd = await guild.find({ id: message.guild.id, reason: `command` }).limit(5);
    let array = usersdata.sort((a, b) => (a.msgCount < b.msgCount) ? 1 : -1).slice(0, 10);
    let forfind = usersdata.sort((a, b) => (a.msgCount < b.msgCount) ? 1 : -1);

    function estUser(user) {
        return user.uID === message.author.id;
    }
    const user = forfind.find(estUser);
    const userTried = (element) => element === user;
    let ranked = forfind.findIndex(userTried) + 1
    let first;
    if (ranked === 1) {
        first = "1er"
    } else {
        first = `${ranked}ème`
    }

    const e = new MessageEmbed()
    .setTitle(`${message.guild.lang==="fr"?"Classement":"Leaderboard"} ${message.guild.name}`)
    .addField("Top:", first)
    .addField(message.guild.lang==="fr"?"Classement: ":"Leaderboard: ", `[Leaderboard](http://gamma.projectheberg.fr:20007/leaderboard/${message.guild.id}/)`)
    .setColor(client.colors.blue)
    .setDescription(array.map((r, i) => `#${i + 1} ${client.users.cache.get(r.uID).tag} \n${message.guild.lang==="fr"?"Niveau":"Level"} \`${r.lvl}\`, \`${r.xp}\` xp,  \`${r.msgCount}\` messages `).join("\n"))

    message.channel.send({ embed: e })
}

module.exports.help = {
    description: "Permet de voir le classement des personnes ayant envoyées le plus de messages",
    name: "leaderboard",
    aliases: ["lb", "leaderb", "lboard", "lvls", "levels"],
    category: "ranks",
    cooldown: 10
}