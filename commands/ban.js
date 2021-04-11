const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.mentions.members.first()) {
            message.reply(`Utilisateur non spécifié ou pas trouvé.`)
    }
    else {
    const member = message.mentions.members.first();
    
    if (message.mentions.members.first()) raison = args.join(" ").slice(22) || "Aucune raison.";
    
    if (message.member.hasPermission('BAN_MEMBERS')) {
        if (!member.bannable) {
           message.reply(`${member.user.tag} ne peut pas être banni.`)
        }
        else if (member.bannable) {
           await member.ban();

           const embedBan = new Discord.MessageEmbed()
           .setTitle("BAN")
           .setColor("#2F3136")
           .setDescription(`${member.user.tag} (${member.user.id}) à été banni du serveur.\n\nPour raison:\n${raison}`)
           .setTimestamp()

           message.channel.send(embedBan)

           const embedMember = new Discord.MessageEmbed()
           .setTitle("Bannissement")
           .setColor("#2F3136")
           .setDescription(`Tu as été banni du serveur ${message.guild.name} par ${message.author.tag} pour raison: ${raison}.`)

           await member.send(embedMember)
        }
    }
    else {
      message.reply("Tu n'as pas la permission `BAN_MEMBERS`.")
    }
    }
}