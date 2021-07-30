const ms = require('ms');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.error(message.lang.remind.duration, message, client);
    const time = ms(args[0]);

    if (!time || time > 1209600000) return message.error(message.lang.remind.u14, message, client);
    const raison = args.slice(1).join(" ")

    if (!raison) return message.error(message.lang.remind.reason, message, client);
    message.success(`${message.lang.remind.remindYes.replace(/{t}/g, args[0])}: ${raison}`, message, client);

    setTimeout(() => {
        message.channel.send(`${message.author}, ${message.lang.remind.reminded}: ${raison}`);
    }, time);
}

module.exports.help = {
    description: "Sert à vous rappeler de faire une choses dans un temps donné.",
    name: "remind",
    aliases: ["re", "rappel"],
    category: "utils"
}