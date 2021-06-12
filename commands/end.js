module.exports.run = async (client, message, args) => {
    
    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(`${client.emotes.error} Vous devez avoir la permission \`MANAGE_MESSAGE\` pour finir un giveaway.`);
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(`${client.emotes.error} Merci de spécifier l'id d'un giveaway!`);
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send(`${client.emotes.error} Impossible de trouver un giveaway pour \`${args.join(' ')}\``);
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('Le giveaway se terminera en moins de '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
    })
    .catch((e) => {
        if(e.startsWith(`Le giveaway avec cet ID de message ${giveaway.messageID} est déjà terminé.`)){
            message.channel.send('Ce giveaway est déjà terminé!');
        } else {
            console.error(e);
            message.channel.send("Une erreur s'est produite...");
        }
    });
};

module.exports.help = {
    description: "Permet de forcer l'arrêt d'un giveaway.",
    name: "end",
    aliases: ["endgw", "gwend"],
    category: "giveaway"
}