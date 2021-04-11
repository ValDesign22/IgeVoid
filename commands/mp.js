const Discord = require ("discord.js");

exports.run = async (client, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        const user = await client.users.fetch(`${args[0]}`)
    	const mp = args.join(" ").slice(19)
    
    	await user.send(mp)
    }
    else {
        message.reply("Tu n'as pas la permission `ADMINISTRATOR`.")
    }
}