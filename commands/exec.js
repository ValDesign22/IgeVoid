const { exec } = require("child_process");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.author.id !== client.configs.ownerID) return message.error(message.lang.ownerOnly, message, client);

    const command = args.join(" ");

    if (!command) return message.error(message.lang.noArgs, message, client);

    exec(`${command}`, (error, stdout, stderr) => {
        if (error) {
            const eError = new MessageEmbed()
            .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
            .setColor(client.colors.red)
            .setDescription(`\`\`\`\n${client.shorten(error, 2040)}\n\`\`\``)

            message.channel.send({ embed: eError });

            return;
        }
        if (stdout) {
            const eStdout = new MessageEmbed()
            .setTitle(`:white_check_mark:`)
            .setColor(client.colors.green)
            .setDescription(`\`\`\`\n${client.shorten(stdout, 2040)}\n\`\`\``)

            message.channel.send({ embed: eStdout });

            return;
        }
        if (stderr) {
            const eStderr = new MessageEmbed()
            .setTitle(`:white_check_mark:`)
            .setColor(client.colors.green)
            .setDescription(`\`\`\`\n${client.shorten(stderr, 2040)}\n\`\`\``)

            message.channel.send({ embed: eStderr });

            return;
        }
    });
}

module.exports.help = {
    name: "exec",
    aliases: ["shell", "node", "cmd"],
    category: "owner",
    description: "Permet d'éxecuter une commande dans le terminal via le bot.",
}