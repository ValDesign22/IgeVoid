const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let member = message.mentions.members.first() || message.member;

        if (!member) member = message.member;

        // Gets the invites

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

        const embed = new Discord.MessageEmbed()

            .setColor(`#2F3136`)
                

            .setAuthor("Compteur d'invitations")

            .setDescription(`Invitations de ${member.user.tag}`)

            .addField('Membres invités :', index || '0')

            .addField('Codes', memberInvites.map(i => `**${i.code}**(${i.uses} Utilisations) | ${i.channel.toString()}`).join(`

            `));

        message.channel.send(embed);
}