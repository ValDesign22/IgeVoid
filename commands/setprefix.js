const { MessageEmbed, MessageCollector } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Vous n'avez pas la permission `ADMINISTRATOR`.");

    const e = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle("Menu du changement de prefix.")
    .setDescription("⚙️ Pour changer le prefix.\n🔁 Pour reset le prefix.\n❌ Pour annuler.");

    const msg = await message.channel.send(e);

    msg.react("⚙️");
    msg.react("🔁");      
    msg.react("❌");

    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    collector.on("collect", async (reaction) => {
        if (reaction.emoji.name === "⚙️") { //set
            const filter = (m) => m.author.id === message.author.id;

            const setprefix = new MessageCollector(message.channel, filter, {
                max: 1,
                time: 1000 * 10
            });

            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle("Menu du changement de prefix.")
            .setDescription("Merci de me donner un prefix à changer ci dessous.");

            msg.edit(e);
            msg.reactions.removeAll();   
            msg.react("❌");

            setprefix.on('collect', (m) => {});

            setprefix.on("end", (collected) => {
                collected.forEach((value) => {
                    if (!value) {
                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setTitle("Menu du changement de prefix.")
                        .setDescription("Le temps est écoulé, vous pouvez réessayer d'executer la commande dans 3 secondes.");

                        msg.edit(e);
                        msg.reactions.removeAll();
                        msg.delete({timeout: 3000});
                    }
                    else if (value.content === prefix) {
                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setTitle("Menu du changement de prefix.")
                        .setDescription("Le prefix donné est celui déjà défini sur le serveur actuelement, vous pouvez réessayer d'executer la commande dans 3 secondes.");

                        msg.edit(e);
                        msg.reactions.removeAll();
                        msg.delete({timeout: 3000});

                        value.delete({timeout: 3000})
                    }
                    else if (value && value.content.length < 6) {
                        client.db.set(`prefix_${message.guild.id}`, value.content);

                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setTitle("Menu du changement de prefix.")
                        .setDescription(`Le prefix du bot sur le serveur a été changé par **${value.content}**`);

                        msg.edit(e);
                        msg.reactions.removeAll();
                        msg.delete({timeout: 3000});

                        value.delete({timeout: 3000})
                    }
                    else if (value && value.content.length > 5) {
                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setTitle("Menu du changement de prefix.")
                        .setDescription("Le prefix en peut pas faire plus de 5 caractères.");

                        msg.edit(e);
                        msg.reactions.removeAll();
                        msg.delete({timeout: 3000});

                        value.delete({timeout: 3000})
                    }
                })
            })
        }
        else if (reaction.emoji.name === "🔁") {
            client.db.set(`prefix_${message.guild.id}`, "m!");
            
            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle("Menu du changement de prefix.")
            .setDescription(`Le prefix du bot sur le serveur a été réinitialisé, nouveau prefix: **m!**`);
            
            msg.edit(e)
            msg.reactions.removeAll()
            msg.delete({timeout: 3000})
        }
        else if (reaction.emoji.name === "❌") { //cancel
            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle("Menu du changement de prefix.")
            .setDescription("Commande annulée.");

            msg.edit(e);
            msg.reactions.removeAll();
            msg.delete({timeout: 3000});
        }
        
        await reaction.users.remove(message.author.id);
    });
}

module.exports.help = {
    description: "Permer de changer le prefix du bot sur le serveur où à été éxécutée la commande.",
    name: "setprefix",
    aliases: ["setp", "prefixset", "pset", "botprefix", "prefixbot"],
    category: "config"
}