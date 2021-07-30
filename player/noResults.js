module.exports = (client, message, query) => {
    message.channel.send(`Aucun résultat trouvé sur YouTube pour ${query}.`);
};