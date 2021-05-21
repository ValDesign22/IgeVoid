const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
    let text = args.join(" ");
    
    if (!args[0]) {
    	message.reply("Merci de me donner un texte.")
    }
    else {
        const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
        const json = await res.json();
        const attachment = new MessageAttachment(json.message, "clyde.png");
        message.channel.send(attachment);
    }
}

module.exports.help = {
    description: "Permet d'envoyer votre message dans un message de clyde.",
    name: "clyde",
    aliases: ["clydemsg"],
    category: "fun"
}