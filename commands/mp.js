module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) return message.error(message.lang.noPerm.replace(/{perm}/g, "ADMINISTRATOR"), message, client);
    if (!args[0]) return message.error(message.lang.noID, message, client);
    const member = await client.users.fetch(args[0]);
    const mp = args.slice(1).join(" ");
    if (!mp) return message.error(message.lang.noArgs, message, client);
    await member.user.send(mp);
}

module.exports.help = {
    description: "Permet d'envoyer un message au membre donné avec son identifiant.",
    name: "mp",
    category: "moderation"
}