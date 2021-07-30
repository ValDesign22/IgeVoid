module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_MESSAGES"), message, client);

    if (!args[0]) return message.error(message.lang.gw.noID, message, client);

    let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) return message.error(`${message.lang.gw.noVID} \`${args.join(' ')}\``, message, client);

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send(message.lang.gw.endIn+(client.giveawaysManager.options.updateCountdownEvery/1000)+` second${message.guild.lang === "fr" ? "e" : ""}s...`);
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) return message.error(message.lang.gw.ardEnd, message, client);
        console.error(e);
        message.error(message.lang.gw.err + e, message, client);
    });
};

module.exports.help = {
    description: "Permet de forcer l'arrêt d'un giveaway.",
    name: "end",
    aliases: ["endgw", "gwend"],
    category: "giveaway"
}