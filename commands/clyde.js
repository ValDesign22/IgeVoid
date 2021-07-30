const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
    if (!args.join(" ")) return message.error(message.lang.noArgs, message, client);

    const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${args.join(" ")}`));
    const json = await res.json();
    message.channel.send(new MessageAttachment(json.message, "clyde.png"));
}

module.exports.help = {
    description: "Permet d'envoyer votre message dans un message de clyde.",
    name: "clyde",
    aliases: ["clydemsg"],
    category: "fun"
}