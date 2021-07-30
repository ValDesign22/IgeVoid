const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
    const member = message.mentions.members.first() || message.member;

    const invites = await message.guild.fetchInvites().catch(() => {});

    const memberInvites = invites.filter((i) => i.inviter && i.inviter.id === member.user.id);

    if (memberInvites.size <= 0) return message.error(`${member.user.tag} ${message.guild.lang === "fr" ? "n'a pas d'" : "has no "}invitations`, message, client)

    let index = 0;

    memberInvites.forEach((invite) => index += invite.uses);

    const embed = new MessageEmbed()
    .setColor(client.colors.blue)
    .setAuthor(`Invitations de ${member.user.tag}`)
    .addField(`Memb${message.guild.lang === "fr" ? "re" : "er"}s invit${message.guild.lang === "fr" ? "és" : "ed"} :`, index || '0')
    .addField("Codes", memberInvites.map(i => `**${i.code}** (${i.uses} U${message.guild.lang === "fr" ? "tilisation" : "se"}s) | ${i.channel.toString()}`).join(`\n`));
        
    message.channel.send({ embed: embed });
}

module.exports.help = {
    description: "Sert à voir votre nombre d'invitations ou celui du membre mentionné.",
    name: "invites",
    aliases: ["invs", "userinvites", "userinvs"],
    category: "utils"
}