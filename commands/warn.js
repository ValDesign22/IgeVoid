const Discord = require("discord.js");

exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank, dbMCount, dbWarns) => {
  if (!message.mentions.members.first()) {
    message.reply(`Utilisateur non spécifié ou pas trouvé.`)
  }
  else {
    const member = message.mentions.members.first();

    if (message.mentions.members.first()) raison = args.join(" ").slice(22) || "Aucune raison.";

    if (message.member.hasPermission('MANAGE_MESSAGES')) {
      if (!member.kickable) {
        message.reply(`${member.user.tag} ne peut pas être averti.`)
      }
      else if (member.kickable) {
        const embedKick = new Discord.MessageEmbed()
        .setTitle("Warn")
        .setColor("#2F3136")
        .setDescription(`${member.user.tag} (${member.user.id}) à été warn sur le serveur.\n\nPour raison:\n${raison}`)
        .setTimestamp()

        message.channel.send(embedKick)

        if (dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "1") {
          const embedMember = new Discord.MessageEmbed()
          .setTitle("Avertissement")
          .setColor("#2F3136")
          .setDescription(`Tu as été averti sur le serveur ${message.guild.name} par ${message.author.tag} pour raison: ${raison}`)

          member.send(embedMember)

          dbWarns.set(`warns_${message.guild.id}_${member.user.id}`, "2")
        }
        else if (dbWarns.get(`warns_${message.guild.id}_${member.user.id}`) === "2") {
          const embedKick = new Discord.MessageEmbed()
          .setTitle("Kick")
          .setColor("#2F3136")
          .setDescription(`${member.user.tag} (${member.user.id}) à été expulsé du serveur.\n\nPour raison:\n\`3 avertissement.\``)
          .setTimestamp()

          message.channel.send(embedKick)
          
          dbWarns.set(`warns_${message.guild.id}_${member.user.id}`, "3")
          
          const embedMember = new Discord.MessageEmbed()
          .setTitle("Expulsion")
          .setColor("#2F3136")
          .setDescription(`Tu as été expulsé du serveur ${message.guild.name} par ${message.author.tag} pour raison: \`3 avertissement.\`.`)

          member.send(embedMember)

          member.kick()
        }
        else {
          const embedMember = new Discord.MessageEmbed()
          .setTitle("Avertissement")
          .setColor("#2F3136")
          .setDescription(`Tu as été averti sur le serveur ${message.guild.name} par ${message.author.tag} pour raison: ${raison}`)

          member.send(embedMember)

          dbWarns.set(`warns_${message.guild.id}_${member.user.id}`, "1")
        }
      }
    }
    else {
      message.reply("Tu n'as pas la permission `MANAGE_MESSAGES`.")
    }
  }
}