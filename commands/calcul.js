module.exports.run = (client, message, args) => {
    if (!args[0]) {
        message.reply("Merci de me donner un calcul à faire.");
    }
    else {
        const amount = parseInt(args[0]);
        if (isNaN(amount)) {
            message.reply("Ce n'est pas un nombre.");
        }
        else if (!isNaN(amount)) {
            const number = eval(args.join(" "));
            
            message.channel.send(`${args.join(" ")} = ${number}`)
        }
    }
}

module.exports.help = {
    description: "Permet de résoudre un calcul avec le bot.",
    name: "calcul",
    aliases: ["math", "calc"],
    category: "fun"
}