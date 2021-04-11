exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye) => {
    message.delete()

    if (message.member.hasPermission("MANAGE_SERVER")) {
        dbGoodbye.delete(`gb_${message.guild.id}`);
        message.channel.send("Le channel d'aurevoir à été supprimé");
    }
    else {
        message.reply("Tu n'as pas la permission `MANAGE_SERVER`")
    }
}