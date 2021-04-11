const Discord = require ("discord.js");

exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank, dbMCount, dbWarns, dbRanks) => {
    if (message.author.id === "650664078649458699") {
        if (!args[0]) {
                message.reply("Merci de mettre des arguments.")
            }
            else if (args[0]) {
                
                
        try {
            
            

            var code = args.join(" ");

            var evaled = eval(code);

            if (typeof evaled !== "string")

                evaled = require("util").inspect(evaled);

            const embed = new Discord.MessageEmbed()

                .setColor('#3A871F')

            .addField(":inbox_tray: Entrée: ", `\`\`\`${code}\`\`\``)

                .addField(":outbox_tray: Sortie: ", `\`\`\`js\n${clean(evaled)}\n\`\`\``)

                .setFooter("Eval command")

            message.channel.send({ embed })

        } catch (err) {

            const embed = new Discord.MessageEmbed()

                .setColor('#3A871F')

            .addField(":inbox_tray: Entée: ", `\`\`\`${code}\`\`\``)

                .addField(":outbox_tray: Sortie: ", `\`\`\`${clean(err)}\`\`\``)

                .setFooter("eval command")

            message.channel.send({ embed })

        }

        function clean(text) {

            if (typeof(text) === 'string')

                return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));

            else

                return text;

        }
                }

    }
    else { message.reply("Tu n'as pas le droit d'utiliser cette commande"); }
}