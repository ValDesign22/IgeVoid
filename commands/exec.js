const { exec } = require("child_process");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.author.id !== client.configs.ownerID) return message.reply("Tu n'es pas le propiétaire du bot.");

    const command = args.join(" ").toLowerCase();

    if (!command) return message.reply("Merci de me donner une commande à éxecuter dans le terminal et non un texte vide.");

    exec(`${command}`, (error, data, getter) => {
        if (error) {
            console.log("error: ", error.message);

            const eError = new MessageEmbed()
            .setTitle(`${client.emotes.error} Erreur`)
            .setColor(client.colors.red)
            .setDescription(error.message)

            message.channel.send(eError);

            return;
        }
        if (getter) {
            console.log("data: ", data);

            const eGetter = new MessageEmbed()
            .setTitle(`:white_check_mark: Réussite`)
            .setColor(client.colors.green)
            .setDescription(data)

            message.channel.send(eGetter);

            return;
        }
        console.log("data: ", data);
    
    });
}

module.exports.help = {
    name: "exec",
    aliases: ["shell", "node"],
    category: "owner",
    description: "Permet d'éxecuter une commande dans le terminal via le bot.",
}