const guild = require("../models/guild");

const userMap = new Map();

async function antispam(message) {
    if (!message) return console.trace(`Message value is not defined.`);

    if (!message.author || !message.channel || !message.guild || !message.member) return console.trace(`${message} is not a Discord message.`);

    if (message.author.bot) return;

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return;
    
    if (message.member.hasPermission("MANAGE_CHANNELS")) return;

    const spamFind = await guild.findOne({ id: message.guild.id, reason: "antispam" });
    if (!spamFind) {
        const newGuildDBSave = new guild({
            id: message.guild.id,
            temps: 3000,
            stat: false,
            content: "5",
            reason: "antispam",
        }).save();
    }

    let spamGet = await guild.findOne({ id: message.guild.id, reason: "antispam" });

    let stat = spamGet ? spamGet.stat: false;

    if (stat === false) return;

    let temps = spamGet ? spamGet.temps : 3000;
    let msgCount = spamGet ? Number(spamGet.content) : 5;

    if (userMap.has(`${message.author.id}_${message.guild.id}`)) {
        let getSpam = userMap.get(`${message.author.id}_${message.guild.id}`);

        userMap.set(`${message.author.id}_${message.guild.id}`, getSpam+1);

        getSpam = userMap.get(`${message.author.id}_${message.guild.id}`);

        if (getSpam === msgCount) {
            message.reply("Tu as envoyé trop de messages en peu de temps, merci d'éviter de spammer.");

            userMap.delete(`${message.author.id}_${message.guild.id}`);
        }
    }
    else {
        let getSpam = userMap.get(`${message.author.id}_${message.guild.id}`);

        if (!getSpam) userMap.set(`${message.author.id}_${message.guild.id}`, 1);

        setTimeout(() => {
            userMap.delete(`${message.author.id}_${message.guild.id}`);
        }, temps);
    }
}

module.exports = antispam;