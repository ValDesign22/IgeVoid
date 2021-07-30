const { MessageEmbed } = require("discord.js");
const translate = require('@vitalets/google-translate-api');

module.exports.run = async (client, message, args, prefix) => {
    if (!args[0]) {
        const helpEmbed = new MessageEmbed()
        .setTitle("Command's Menu")
        .setColor(client.colors.blue)
        .setDescription(`Prefix: \`${prefix}\`.\nLanguage: \`${prefix}setlang fr/en\`\nCommands: \`${client.commands.size}\`.\nHelp:\n\`${prefix}help <commande>\`.`)
        .addField(`(${client.commands.filter(x => x.help.category === "utils").size}) Utiles`, client.commands.filter(x => x.help.category === "utils").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "music").size}) Musique`, client.commands.filter(x => x.help.category === "music").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "moderation").size}) Modération`, client.commands.filter(x => x.help.category === "moderation").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "ranks").size}) Niveaux`, client.commands.filter(x => x.help.category === "ranks").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "fun").size}) Fun`, client.commands.filter(x => x.help.category === "fun").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "giveaway").size}) Giveaway`, client.commands.filter(x => x.help.category === "giveaway").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "config").size}) Configuration`, client.commands.filter(x => x.help.category === "config").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "bot").size}) Bot`, client.commands.filter(x => x.help.category === "bot").map(x => `\`${x.help.name}\``).join(", "))
        if (message.author.id === client.configs.ownerID) { helpEmbed.addField(`(${client.commands.filter(x => x.help.category === "owner").size}) Owner`, client.commands.filter(x => x.help.category === "owner").map(x => `\`${x.help.name}\``).join(", ")) }
        helpEmbed.addField("Liens", `[Bot Invite](http://gamma.projectheberg.fr:20007/invite) • [Support](${client.configs.support}) • [Top.gg](https://top.gg/bot/804289381141446666/) • [Site](http://igevoid.ml/)`)

        message.channel.send({ embed: helpEmbed });
    }
    else {
        const commandName = args[0].toLowerCase(), command = client.commands.get(commandName) || client.commands.find(x => x.help.aliases && x.help.aliases.includes(commandName));

        if (!command) {
            return message.error(message.lang.noCommand.replace(/{command}/g, commandName).replace(/{prefix}/g, prefix), message, client);
        }
        else {
            let aliases;
            if (!command.help.aliases) {
                aliases = ":x: aliases.";
            }
            else {
                aliases = command.help.aliases.map(x => `\`${x}\``).join(", ");
            }

            let cooldown;
            if (!command.help.cooldown) {
                cooldown = `3 ${message.guild.lang === "fr" ? "secondes" : "seconds"}`;
            }
            else {
                cooldown = `${command.help.cooldown} ${message.guild.lang === "fr" ? "secondes" : "seconds"}`
            }

            let desc = command.help.description || "Aucune description.";
            await translate(desc, { from: "fr", to: message.guild.lang }).then(res => {
                desc = res.text;
            }).catch(err => console.error(err));

            let noCat = "Pas de catégorie.";
            await translate(noCat, { from: "fr", to: message.guild.lang }).then(res => {
                noCat = res.text.toLowerCase()
            }).catch(err => console.error(err));

            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle(`${message.guild.lang === "fr" ? "Commande" : "Command"} ${command.help.name}`)
            .addField("Description :", desc)
            .addField(message.guild.lang === "fr" ? "Nom :" : "Name :", `\`${command.help.name}\``)
            .addField("Aliases :", aliases)
            .addField(message.guild.lang === "fr" ? "Catégorie :" : "Category :", `\`${command.help.category || noCat}\``)
            .addField("Cooldown :", cooldown)

            message.channel.send({ embed: e })
        }
    }
}

module.exports.help = {
    description: "Permet de voir la liste des commandes ou l'aide d'une commande des du bot.",
    name: "help",
    aliases: ["h", "aide", "commandes", "cmds"],
    category: "utils",
    cooldown: 5
}