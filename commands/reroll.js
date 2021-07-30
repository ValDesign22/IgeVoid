module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.error(message.lang.noPerm.replace(/{perm}/g, "MAANGE_MESSAGES"), message, client);

    if (!args[0]) return message.error(message.lang.gw.noID, message, client);

    let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) return message.error(`${message.lang.gw.noVID} \`${args.join(' ')}\`.`, message, client);

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('Giveaway reroll!');
    })
    .catch((e) => {
        if(e.startsWith(`Le giveaway avec cet ID de message ${giveaway.messageID} n'est pas fini.`)) return message.error(message.lang.gw.noEnd, message, client);
        console.error(e);
        message.error(message.lang.gw.err + e, message, client);
    });
};

module.exports.help = {
    descritpion: "Permet de changer le gagnant d'un giveaway donné avec son ID.",
    name: "reroll",
    aliases: ["gwreroll", "rerollgw", "gwrr", "rrgw"],
    category: "giveaway"
}