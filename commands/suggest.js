const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
    const channel = message.guild.channels.cache.get(client.db.get(`sug_${message.guild.id}`));
    
    if (!channel) return message.reply(`Le channel de suggestions n'est pas encore défini, demande au modérateurs du serveur de le mettre avec la commande: \`${prefix}setsugg\`.`);
    
    const text = args.join(" ");
    
    if (!text) return message.reply("Merci de donner un argument pour une suggestion et non un espace vide.");
    
    const eSuggestion = new MessageEmbed()
    .setTitle("Nouvelle suggestion")
    .setColor(client.colors.blue)
    .setDescription(`Suggestion de \`${message.author.tag}\`\n${text}`)
    
    channel.send(eSuggestion)
    .then(m => {
        m.react("✅")
        m.react("❌")
    })
    
    message.reply(`Votre suggestion à été envoyée dans ${channel}`);
}

module.exports.help = {
    description: "Permet de faire une suggestion dans la channel de suggestions du serveur.",
    name: "suggest",
    aliases: ["sugg", "suggestion"],
    category: "utils"
}