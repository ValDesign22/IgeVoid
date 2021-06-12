const figlet = require("figlet");

module.exports.run = async (client, message, args) => {
    if (!args[0]) {
        message.channel.send("Merci de me donner un texte à transformer en ascii.");
    }
    else if (args[0]) {
        figlet(`${args.join(" ")}`, function(err, data) {
            if (err) {
                console.log("Une erreur s'est produit avec la commande ascii.");
                console.dir(err);
                return;
            }
            message.channel.send(`\`\`\`\n${data}\n\`\`\``)
        });
    }
}

module.exports.help = {
    description: "Permet d'envoyer votre message sous forme d'ascii.",
    name: "ascii",
    aliases: ["asciimsg", "ascmsg", "asc"],
    category: "fun"
}