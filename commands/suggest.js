const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
    const channel = message.guild.channels.cache.get(client.db.get(`sug_${message.guild.id}`));
    
    if (!channel) return message.error(`${message.lang.sugg.noChan}: \`${prefix}setsugg\`.`, message, client);
    
    const text = args.join(" ");
    
    if (!text) return message.error(message.lang.noArgs, message, client);
    
    const eSuggestion = new MessageEmbed()
    .setTitle("Suggestion")
    .setColor(client.colors.blue)
    .setDescription(`\`${message.author.tag}\`:\n${text}`)
    
    channel.send({ embed: eSuggestion })
    .then(m => {
        m.react("✅")
        m.react("❌")
    })
    
    message.success(`${message.lang.sugg.sent} ${channel}`, message, client);
}

module.exports.help = {
    description: "Permet de faire une suggestion dans la channel de suggestions du serveur.",
    name: "suggest",
    aliases: ["sugg", "suggestion"],
    category: "utils"
}