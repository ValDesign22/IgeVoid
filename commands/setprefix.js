const { MessageEmbed, MessageCollector } = require("discord.js");
const guild = require("../models/guild");
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports.run = async (client, message, args, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.error(message.lang.noPerm.replace(/{perm}/g, "ADMINISTRATOR"), message, client);

    const e = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle(message.lang.prefix.title)
    .setDescription(message.lang.prefix.main);

    let buttonChange = new MessageButton()
    .setStyle("blurple")
    .setEmoji("⚙️")
    .setID("changeBotPrefix")

    let buttonReset = new MessageButton()
    .setStyle("blurple")
    .setEmoji("🔁")
    .setID("resetBotPrefix")

    let buttonCancel = new MessageButton()
    .setStyle("blurple")
    .setEmoji("❌")
    .setID("cancelBotPrefix")

    let buttons = new MessageActionRow()
    .addComponent(buttonChange)
    .addComponent(buttonReset)
    .addComponent(buttonCancel)

    const msg = await message.channel.send({ embed: e, components: buttons });

    const collector = msg.createButtonCollector((button) => button.clicker.user.id === message.author.id);

    collector.on("collect", async (button) => {
        if (button.id === "changeBotPrefix") { //set
            const filter = (m) => m.author.id === message.author.id;

            const setprefix = new MessageCollector(message.channel, filter, {
                max: 1,
                time: 1000 * 10
            });

            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle(message.lang.prefix.title)
            .setDescription(message.lang.prefix.change);

            msg.edit({ embed: e });

            setprefix.on('collect', (m) => {});

            setprefix.on("end", async (collected) => {
                collected.forEach(async (value) => {
                    if (!value) {
                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setTitle(message.lang.prefix.title)
                        .setDescription(message.lang.prefix.cdown);

                        msg.edit({ embed: e });
                        msg.delete({timeout: 3000});
                    }
                    else if (value.content === prefix) {
                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setTitle(message.lang.prefix.title)
                        .setDescription(message.lang.prefix.ard);

                        msg.edit({ embed: e });
                        msg.delete({timeout: 3000});

                        value.delete({timeout: 3000})
                    }
                    else if (value && value.content.length < 6) {
                        const newPrefix = await guild.findOneAndUpdate({ id: message.guild.id, reason: `prefix` }, { $set: { content: value.content, reason: `prefix` } }, { new: true });

                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setTitle(message.lang.prefix.title)
                        .setDescription(`${message.lang.prefix.changed} **${value.content}**`);

                        msg.edit({ embed: e });
                        msg.delete({timeout: 3000});

                        value.delete({timeout: 3000})
                    }
                    else if (value && value.content.length > 5) {
                        const e = new MessageEmbed()
                        .setColor(client.colors.blue)
                        .setTitle(message.lang.prefix.title)
                        .setDescription(message.lang.prefix.tooLong);

                        msg.edit({ embed: e });
                        msg.delete({timeout: 3000});

                        value.delete({timeout: 3000})
                    }
                })
            })
        }
        else if (button.id === "resetBotPrefix") { //reset
            const newPrefix = await guild.findOneAndUpdate({ id: message.guild.id, reason: `prefix` }, { $set: { content: client.configs.prefix, reason: `prefix` } }, { new: true });
            
            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle(message.lang.prefix.title)
            .setDescription(`${message.lang.prefix.reset}: **${client.configs.prefix}**`);
            
            msg.edit({ embed: e })
            msg.delete({timeout: 3000})
        }
        else if (button.id === "cancelBotPrefix") { //cancel
            const e = new MessageEmbed()
            .setColor(client.colors.blue)
            .setTitle(message.lang.prefix.title)
            .setDescription(message.guild.lang==="fr"?"Commande annulée.":"Command canceled");

            msg.edit({ embed: e });
            msg.delete({timeout: 3000});
        }
    });
}

module.exports.help = {
    description: "Permer de changer le prefix du bot sur le serveur où à été éxécutée la commande.",
    name: "setprefix",
    aliases: ["setp", "prefixset", "pset", "botprefix", "prefixbot"],
    category: "config",
    cooldown: 3
}