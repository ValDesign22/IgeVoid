const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
    const member = message.mentions.members.first() || message.member;

    const invites = await message.guild.fetchInvites().catch(() => {});

    const memberInvites = invites.filter((i) => i.inviter && i.inviter.id === member.user.id);

    if (memberInvites.size <= 0) {
        if (member === message.member) {
            return message.channel.send(`${member.user.tag} n'a pas d'invitations`)
        } else {
            return message.channel.send(`${member.user.tag} n'a pas d'invitations`)
        }
    }

    let index = 0;

    memberInvites.forEach((invite) => index += invite.uses);

    const embed = new MessageEmbed()

    .setColor(client.colors.blue)
    .setAuthor(`Invitations de ${member.user.tag}`)
    .addField('Membres invités :', index || '0')
    .addField("Codes d'invitations", memberInvites.map(i => `**${i.code}** (${i.uses} Utilisations) | ${i.channel.toString()}`).join(`\n`));
        
    message.channel.send(embed);
}

module.exports.help = {
    description: "Sert à voir votre nombre d'invitations ou celui du membre mentionné.",
    name: "invites",
    aliases: ["invs", "userinvites", "userinvs"],
    category: "utils"
}