module.exports = (client, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`Il n'y a pas de musique en cours de lecture sur ce serveur.`);
            break;
        case 'NotConnected':
            message.channel.send(`Vous n'êtes connecté à aucun salon vocal!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`Je ne parviens pas à rejoindre votre salon vocal, veuillez vérifier mes permissions.`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`${args[0].title} n'est pas disponible dans votre pays! Chanson suivante...`);
            break;
        case 'MusicStarting':
            message.channel.send(`La musique commence ... veuillez patienter et réessayer!`);
            break;
        default:
            message.channel.send(`Une erreur s'est produite... Erreur: ${error}`);
    };
};