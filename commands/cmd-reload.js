exports.run = async (client, message, args) => {
    if (message.author.id === "650664078649458699") {
        if (!args[0]) {
            message.reply("Merci de me donner une commande à recharger.")
        }
        else if (args[1]) {
            message.reply("Je ne peux pas reload plus de une commande à la fois. ")
        }
        else if (args[0]) {
            const command = args[0];
            
            delete require.cache[require.resolve(`./${command}.js`)];
            
        	try {
            	const reloadedCommand = require(`./${command}.js`);
                let props = require(`./${command}`);
            	client.commands.set(command, props);
                message.channel.send(`Commande ${command} rechargée.`)
        	}
        	catch (error) {
                console.error(error);
            	message.channel.send("Une erreur est survenu lors du rechargement.")
        	}
        }
    }
    else {
        message.reply("Seul le propriétaire du bot peut exécuter cette commande.")
    }
}