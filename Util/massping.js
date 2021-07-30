const guild = require("../models/guild");

const pingMap = new Map();

async function massping(message) {
    if (!message) return console.trace(`Message value is not defined.`);

    if (!message.author) return console.trace(`${message} is not a Discord message.`);

    if (message.author.bot) return;

    if (!message.content.includes("<@")) return;

    const pingFind = await guild.findOne({ id: message.guild.id, reason: "massping" });
    if (!pingFind) {
        const newGuildDBSave = new guild({
            id: message.guild.id,
            temps: 3000,
            stat: false,
            content: "5",
            reason: "massping",
        }).save();
    }

    let pingGet = await guild.findOne({ id: message.guild.id, reason: "massping" });

    let stat = pingGet ? pingGet.stat: false;

    if (stat === false) return;

    let temps = pingGet ? pingGet.temps : 3000;
    let msgCount = pingGet ? Number(pingGet.content) : 5;

    if (pingMap.has(`${message.author.id}_${message.guild.id}`)) {
        let getping = pingMap.get(`${message.author.id}_${message.guild.id}`);

        pingMap.set(`${message.author.id}_${message.guild.id}`, getping+1);

        getping = pingMap.get(`${message.author.id}_${message.guild.id}`);

        if (getping === msgCount) {
            message.reply("Tu as envoyé trop mentions en peu de temps merci de mentionner un peu moins.");

            pingMap.delete(`${message.author.id}_${message.guild.id}`);
        }
    }
    else {
        let getping = pingMap.get(`${message.author.id}_${message.guild.id}`);

        if (!getping) pingMap.set(`${message.author.id}_${message.guild.id}`, 1);

        setTimeout(() => {
            pingMap.delete(`${message.author.id}_${message.guild.id}`);
        }, temps);
    }
}

module.exports = massping;