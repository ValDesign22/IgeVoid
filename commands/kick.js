const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.mentions.members.first()) {
            message.reply(`Utilisateur non spécifié ou pas trouvé.`)
    }
    else {
    const member = message.mentions.members.first();
    
    const raison = args.join(" ").slice(22) || "Aucune raison.";
        if (message.member.hasPermission('KICK_MEMBERS')) {
        if (!member.kickable) {
           message.reply(`${member.user.tag} ne peut pas être expulsé.`)
        }
        else if (member.kickable) {
           await member.kick();

           const embedKick = new Discord.MessageEmbed()
           .setTitle("KICK")
           .setColor("#2F3136")
           .setDescription(`${member.user.tag} (${member.user.id}) à été expulsé du serveur.\n\nPour raison:\n${raison}`)
           .setTimestamp()

           message.channel.send(embedKick)

           const embedMember = new Discord.MessageEmbed()
           .setTitle("Expulsion")
           .setColor("#2F3136")
           .setDescription(`Tu as été expulsé du serveur ${message.guild.name} par ${message.author.tag} pour raison: ${raison}.`)

           await member.send(embedMember)
        }
    }
    else {
      message.reply("Tu n'as pas la permission `KICK_MEMBERS`.")
    }
    }
}