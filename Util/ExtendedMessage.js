const { Message, MessageEmbed, Structures } = require("discord.js");

class NewMessage extends Message {
    error(content, message, client) {
        if (!message) throw new Error("Message value is not defined.");
        if (!message.channel || !message.author || !message.member) throw new Error(`${message} is not a Discord Message.`);

        if (!client) throw new Error("No client was provided.");
        if (!client.ws || !client.user) throw new Error(`${client} is not a Discord Client.`);

        const eError = new MessageEmbed()
        .setColor(client.colors.red)
        .setTitle(message.lang.error.replace(/{errorEmote}/g, client.emotes.error))
        .setDescription(content)

        return message.reply({ embed: eError });
    }

    success(content, message, client) {
        if (!message) throw new Error("Message value is not defined.");
        if (!message.channel || !message.author || !message.member) throw new Error(`${message} is not a Discord Message.`);

        if (!client) throw new Error("No client was provided.");
        if (!client.ws || !client.user) throw new Error(`${client} is not a Discord Client.`);

        const eSuccess = new MessageEmbed()
        .setColor(client.colors.green)
        .setTitle(`${client.emotes.yes} ${message.lang.success}`)
        .setDescription(content)

        return message.reply({ embed: eSuccess });
    }
}

Structures.extend('Message', () => NewMessage);