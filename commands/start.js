const ms = require('ms');

module.exports.run = async (client, message, args, prefix) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_MESSAGES"), message, client);

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel) return message.error(message.lang.gw.chanel+`\`${prefix}start [#channel] [1s/m/h/d] [${message.guild.lang === "fr"?"nombre":"number"}] [${message.guild.lang === "fr"?"cadeau":"gift"}]\``, message, client);

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))) return message.error(message.lang.gw.duration+`\`${prefix}start [#channel] [1s/m/h/d] [${message.guild.lang === "fr"?"nombre":"number"}] [${message.guild.lang === "fr"?"cadeau":"gift"}]\``, message, client);

    let giveawayNumberWinners = args[2];
    if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) return message.error(message.lang.gw.winners+`\`${prefix}start [#channel] [1s/m/h/d] [${message.guild.lang === "fr"?"nombre":"number"}] [${message.guild.lang === "fr"?"cadeau":"gift"}]\``, message, client);

    let giveawayPrize = args.slice(3).join(' ');
    if (!giveawayPrize) return message.error(message.lang.gw.gift+`\`${prefix}start [#channel] [1s/m/h/d] [${message.guild.lang === "fr"?"nombre":"number"}] [${message.guild.lang === "fr"?"cadeau":"gift"}]\``, message, client);

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: client.configs.hostedBy ? message.author : null,
        messages: {
            giveaway: (client.configs.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY** 🎉",
            giveawayEnded: (client.configs.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY TERMINE** 🎉",
            timeRemaining: `⏱️: **{duration}**!`,
            inviteToParticipate: `${message.guild.lang === "fr"?"Réagis avec":"React with"} 🎉 ${message.guild.lang === "fr"?"pour participer":"to participate"}!`,
            winMessage: `🎉 ${message.guild.lang === "fr" ? "Félicitations" : "Congrulations"}, {winners}! ${message.guild.lang === "fr" ? "Tu as gagné" : "You win"} **{prize}**!`,
            embedFooter: "🎉 Giveaways",
            noWinner: `😥 Giveaway ${message.guild.lang === "fr"?"annulé, aucunes participations":"canceled, no participations"}.`,
            hostedBy: `🎁 ${message.guild.lang === "fr"?"Offert par":"Hosted by"}: {user}`,
            winners: `🏆 ${message.guild.lang === "fr"?"Gagnant":"Winner"}(s)`,
            endedAt: (message.guild.lang === "fr"?"⏱️ Termine à":"⏱️ End at"),
            units: {
                seconds: `second${message.guild.lang === "fr"?"e":""}s`,
                minutes: `minutes`,
                hours: `h${message.guild.lang === "fr"?"eu":"ou"}r${message.guild.lang === "fr"?"e":""}s`,
                days: `${message.guild.lang === "fr"?"jours":"days"}`,
                pluralS: false
            }
        }
    });

    message.channel.send(`Giveaway démaré dans ${giveawayChannel}!`);
};

module.exports.help = {
    description: "Permet de lancer un giveaway.",
    name: "start",
    aliases: ["startgw", "gwstart"],
    cateogry: "giveaway"
}