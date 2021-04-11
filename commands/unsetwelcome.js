exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye) => {
    message.delete()

    if (message.member.hasPermission("MANAGE_SERVER")) {
        dbWelcome.delete(`bvn_${message.guild.id}`);
        message.channel.send("Le channel de bienvenue à été supprimé");
    }
    else {
        message.reply("Tu n'as pas la permission `MANAGE_SERVER`")
    }
}