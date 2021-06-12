const ms = require('ms');

module.exports.run = async (client, message, args) => {
    if (!args[0]) {
        message.reply("Merci de me donner une durée: `1s/m/h/d`");
    }
    else {
        const time = ms(args[0]);

        if (!time || time > 1209600000) {
            message.reply("Merci de me donner une durée de 14 maximum ou moins: `1s/m/h/d`.");
        }
        else {
            const raison = args.slice(1).join(" ")

            if (!raison) {
                message.reply("Merci de me donner une explication de pourquoi vous rappeler.");
            }
            else {
                message.channel.send(`Parfait, je vais vous rappeler dans ${args[0]} pour raison: ${raison}`);

                setTimeout(() => {
                    message.channel.send(`${message.author}, Je vous ai rappellé pour raison: ${raison}`);
                }, time);
            }
        }
    }
}

module.exports.help = {
    description: "Sert à vous rappeler de faire une choses dans un temps donné.",
    name: "remind",
    aliases: ["re", "rappel"],
    category: "utils"
}