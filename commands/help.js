const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args, prefix) => {
    if (!args[0]) {
        const helpEmbed = new MessageEmbed()
        .setTitle("Menu des commandes")
        .setColor(client.colors.blue)
        .setDescription(`Mon prefix sur le serveur est: \`${prefix}\`.\nCommandes: \`${client.commands.size}\`.\nPour voir l'aide d'une commande:\n\`${prefix}help <commande>\`.`)
        .addField(`(${client.commands.filter(x => x.help.category === "utils").size}) Utiles`, client.commands.filter(x => x.help.category === "utils").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "music").size}) Musique`, client.commands.filter(x => x.help.category === "music").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "moderation").size}) Modération`, client.commands.filter(x => x.help.category === "moderation").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "ranks").size}) Niveaux`, client.commands.filter(x => x.help.category === "ranks").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "fun").size}) Fun`, client.commands.filter(x => x.help.category === "fun").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "giveaway").size}) Giveaway`, client.commands.filter(x => x.help.category === "giveaway").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "config").size}) Configuration`, client.commands.filter(x => x.help.category === "config").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "bot").size}) Bot`, client.commands.filter(x => x.help.category === "bot").map(x => `\`${x.help.name}\``).join(", "))
        .addField(`(${client.commands.filter(x => x.help.category === "owner").size}) Owner`, client.commands.filter(x => x.help.category === "owner").map(x => `\`${x.help.name}\``).join(", "))
        .addField("Liens", `[Bot Invite](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Support](${client.configs.support}) • [Top.gg](https://top.gg/bot/804289381141446666/) • [Site](http://beta.projectheberg.fr:20251)`)
        .setImage("https://media.discordapp.net/attachments/825774787598090280/826847828651016202/350kb_1.gif")

        message.channel.send(helpEmbed);
    }
    else {
        const commandName = args[0].toLowerCase(), command = client.commands.get(commandName) || client.commands.find(x => x.help.aliases && x.help.aliases.includes(commandName));

        if (!command) {
            const e = new MessageEmbed()
            .setColor(client.color)
            .setTitle(`${client.emotes.error} Erreur`)
            .setColor(client.colors.red)
            .setDescription(`Je ne possède pas la commande \`${commandName}\`, merci de regarder le \`${prefix}help\` correctement pour pouvoir utiliser la commande demandée.`)
        
            return message.channel.send(e)
        }
        else {
            let aliases;
            if (!command.help.aliases) {
                aliases = "Pas d'aliases.";
            }
            else {
                aliases = command.help.aliases.join(", ")
            }

            let cooldown;
            if (!command.help.cooldown) {
                cooldown = "3 secondes";
            }
            else {
                cooldown = `${command.help.cooldown} secondes`
            }

            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle(`Commande ${command.help.name}`)
            .addField("Description", `${command.help.description || "Aucune description."}`)
            .addField("Nom :", `\`${command.help.name}\``)
            .addField("Aliases :", `${aliases}`)
            .addField("Categorie :", `\`${command.help.category || "Pas de catégorie."}\``)
            .addField("Cooldown :", `${cooldown}`)

            message.channel.send(e)
        }
    }
}

module.exports.help = {
    description: "Sert à voir la liste des commandes ou l'aide d'une commande.",
    name: "help",
    aliases: ["h", "aide", "commandes", "cmds"],
    category: "utils",
    cooldown: 5
}