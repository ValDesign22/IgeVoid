const translate = require('@vitalets/google-translate-api');

module.exports.run = async (client, message, args, prefix) => {    
    if (!args[0]) return message.error(message.lang.translate.tr1 + ` \`${prefix}translate lang1 lang2 text\``, message, client)
    if (!args[1]) return message.error(message.lang.translate.tr2 + ` \`${prefix}translate lang1 lang2 text\``, message, client)
    if (!args.slice(2).join(" ")) return message.error (message.lang.translate.tr3 + ` \`${prefix}translate lang1 lang2 text\``, message, client)

    await translate(args.slice(2).join(" "), {from: args[0], to: args[1]}).then(res => {
        message.channel.send(res.text);
    }).catch(err => {
        console.error(err);
    });
}

module.exports.help = {
    description: "Permet de traduire une phrase ou un mot donné.",
    name: "translate",
    aliases: ["tr", "trad", "trans", "trlate"],
    category: "utils"
}