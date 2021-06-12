module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!args[0]) {
            message.reply("Merci de me donner l'ID de la personne à MP.")
        }
        else {
            const member = message.guild.members.cache.get(`${args[0]}`)
    		const mp = args.join(" ").slice(19)
    
    		await member.user.send(mp)
        }
    }
    else {
        message.reply("Tu n'as pas la permission `ADMINISTRATOR`.")
    }
}

module.exports.help = {
    description: "Permet d'envoyer un message au membre donné avec son identifiant.",
    name: "mp",
    category: "moderation"
}