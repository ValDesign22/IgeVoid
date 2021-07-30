const { MessageEmbed } = require ("discord.js");

module.exports.run = async (client, message, args, prefix) => {
    if (message.author.id !== client.configs.ownerID) return message.error(message.lang.ownerOnly, message, client);
    if (!args[0]) return message.error(message.lang.noArgs, message, client);
    try {
        var code = args.join(" ");
        var evaled = eval(code);
        if (typeof evaled !== "string")
        
        evaled = require("util").inspect(evaled);

        const embed = new MessageEmbed()
        .setColor(client.color)
        .addField(":inbox_tray: : ", `\`\`\`${code}\`\`\``)
        .addField(":outbox_tray: : ", `\`\`\`\n${client.shorten(clean(evaled), 1000)}\n\`\`\``)
        .setFooter(`Eval ${message.author.tag}`)

        message.channel.send({ embed: embed })
    } catch (err) {
        const embed = new MessageEmbed()
        .setColor(client.color)
        .addField(":inbox_tray: : ", `\`\`\`${code}\`\`\``)
        .addField(":outbox_tray: : ", `\`\`\`\n${client.shorten(clean(err), 1000)}\n\`\`\``)
        .setFooter(`Eval ${message.author.tag}`)

        message.channel.send({ embed: embed })
    }

    function clean(text) {
        if (typeof(text) === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
        else return text;
    }
}

module.exports.help = {
    name: "eval",
    aliases: ["e", "code", "run"],
    category: "owner",
    description: "Permet d'éxecuter un code ou un calcul.",
}