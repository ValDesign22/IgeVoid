const D = require("discord.js");

exports.run = async(client, message, args, dbPrefixs, dbTickets) => {
    message.delete()

    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (message.mentions.channels.first()) {
            const panelChannel = message.mentions.channels.first();
            
            const e = new D.MessageEmbed()
            .setTitle("Ticket Panel")
            .setColor("#2F3136")
            .setDescription("Pour poser vos questions merci d'ouvrir un ticket avec ce panel.")
            .setFooter("Pour ouvrir un ticket 🎟️")
        
            panelChannel.send(e)
            .then(msg => {
                msg.react("🎟️");
                
                dbTickets.set(`ticket_${msg.id}`, msg.id);
            });
            message.channel.send(`Le panel ticket a été mis en place dans la channel: <#${panelChannel.id}>`)
        }
        else if (args[0]) {
            message.reply("Merci de mentionner un channel et de ne pas donner de texte.")
        }
        else {
            message.reply("Merci de mentionner un channel.")
        }
    }
    else {
        message.reply("Tu n'as pas la permission `ADMINISTRATOR`")
    }
}