const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction) => {
    /* Embeds */

    const ePing = new MessageEmbed()
    .setColor(client.colors.blue)
    .addField("Message", `\`${Date.now() - interaction.createdTimestamp} ms\``)
    .addField("API", `\`${Math.round(client.ws.ping)} ms\``)

    const eHelp = new MessageEmbed()
    .setTitle("Command's Menu")
    .setColor(client.colors.blue)
    .setDescription(`Prefix: \`${client.configs.prefix}\`.\nLanguage: \`${client.configs.prefix}setlang fr/en\`\nCommands: \`${client.commands.size}\`.\nHelp:\n\`${client.configs.prefix}help <command>\`.`)
    .addField(`(${client.commands.filter(x => x.help.category === "utils").size}) Utiles`, client.commands.filter(x => x.help.category === "utils").map(x => `\`${x.help.name}\``).join(", "))
    .addField(`(${client.commands.filter(x => x.help.category === "music").size}) Musique`, client.commands.filter(x => x.help.category === "music").map(x => `\`${x.help.name}\``).join(", "))
    .addField(`(${client.commands.filter(x => x.help.category === "moderation").size}) Modération`, client.commands.filter(x => x.help.category === "moderation").map(x => `\`${x.help.name}\``).join(", "))
    .addField(`(${client.commands.filter(x => x.help.category === "ranks").size}) Niveaux`, client.commands.filter(x => x.help.category === "ranks").map(x => `\`${x.help.name}\``).join(", "))
    .addField(`(${client.commands.filter(x => x.help.category === "fun").size}) Fun`, client.commands.filter(x => x.help.category === "fun").map(x => `\`${x.help.name}\``).join(", "))
    .addField(`(${client.commands.filter(x => x.help.category === "giveaway").size}) Giveaway`, client.commands.filter(x => x.help.category === "giveaway").map(x => `\`${x.help.name}\``).join(", "))
    .addField(`(${client.commands.filter(x => x.help.category === "config").size}) Configuration`, client.commands.filter(x => x.help.category === "config").map(x => `\`${x.help.name}\``).join(", "))
    .addField(`(${client.commands.filter(x => x.help.category === "bot").size}) Bot`, client.commands.filter(x => x.help.category === "bot").map(x => `\`${x.help.name}\``).join(", "))
    .addField(`(${client.commands.filter(x => x.help.category === "owner").size}) Owner`, client.commands.filter(x => x.help.category === "owner").map(x => `\`${x.help.name}\``).join(", "))
    .addField("Liens", `[Bot Invite](http://gamma.projectheberg.fr:20007/invite) • [Support](${client.configs.support}) • [Top.gg](https://top.gg/bot/804289381141446666/) • [Site](http://igevoid.ml/)`)

    /* Interactions */

    const cmd = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if (cmd === "ping") {
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                embeds: [ePing]
            }
          }})
    }
    if (cmd === "help") {
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                embeds: [eHelp]
            }
        }})
    }
}