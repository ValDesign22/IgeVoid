exports.run = async (client, message, args) => {
    if (message.author.id === "650664078649458699") {
        if (!args[0]) {
            message.reply("Merci de me donner un event à recharger.")
        }
        else if (args[1]) {
            message.reply("Je ne peux pas reload plus d'un event à la fois. ")
        }
        else if (args[0]) {
            const eventName = args[0];

            const event = require(`../events/${eventName}`);

            const res = client.listeners(eventName)
            
        	try {
                client.off(eventName, res[0]);
                client.on(eventName, event.bind(null, client));
                message.channel.send(`Event ${eventName} rechargé.`)
                delete require.cache[require.resolve(`../events/${eventName}`)];
        	}
        	catch (error) {
                console.error(error);
            	message.channel.send("Une erreur est survenu lors du rechargement de l'event.")
        	}
        }
    }
    else {
        message.reply("Seul le propriétaire du bot peut exécuter cette commande.")
    }
}