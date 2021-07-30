module.exports.run = (client, message, args) => {
    if (!args[0]) return message.error(message.lang.giveCalc, message, client);
    if (isNaN(parseInt(args[0]))) return message.error(message.lang.notNmb.replace(/{nmb}/g, args[0]), message, client);
    message.channel.send(`${args.join(" ")} = ${eval(args.join(" "))}`)
}

module.exports.help = {
    description: "Permet de résoudre un calcul avec le bot.",
    name: "calcul",
    aliases: ["math", "calc"],
    category: "fun"
}