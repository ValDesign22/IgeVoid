const guild = require("../models/guild");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_CHANNELS"), message, client);

    const langs = ["fr", "en"];

    if (!args[0]) return message.error(message.lang.noLang.replace(/{langs}/g, langs.join(", ")), message, client);

    if (!langs.includes(args[0])) return message.error(message.lang.notVLang.replace(/{lang}/g, args[0]).replace(/{langs}/g, langs.join(", ")), message, client);

    if (message.guild.lang === args[0]) return message.error(message.lang.alreadyLang.replace(/{lang}/g, args[0]), message, client);

    const newLang = await guild.findOneAndUpdate({ id: message.guild.id, reason: `lang` }, { $set: { content: args[0], reason: `lang` } }, { new: true });

    message.reply(message.lang.language.replace(/{lang}/g, args[0]));
}

module.exports.help = {
    description: "Permet de changer la langue du bot sur le serveur.",
    name: "setlang",
    aliases: ["lang", "botlang", "setl", "language"],
    category: "config",
    cooldown: 5
}