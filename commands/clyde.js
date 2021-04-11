const Discord = require("discord.js");
const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
    let text = args.join(" ");
    
    if (!args[0]) {
    	message.reply("Merci de me donner un texte.")
    }
    else {
        const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`));
        const json = await res.json();
        const attachment = new Discord.MessageAttachment(json.message, "clyde.png");
        message.channel.send(attachment);
    }
}