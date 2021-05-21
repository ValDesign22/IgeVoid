const figlet = require("figlet");
const Topgg = require('@top-gg/sdk');

module.exports = async (client) => {
    figlet(`READY !`, function(err, data) {
        if (err) {
            console.log("Une erreur s'est produite avec l'ascii de l'event ready.");
            console.dir(err);
            return;
        }
        console.log(`${data}`)
    });

    console.log(`${client.user.tag} est en ligne.`);

    client.user.setActivity(`${client.configs.prefix}help | Dans ${client.guilds.cache.size} serveurs | ${client.users.cache.size} utilisateurs`, {type: "WATCHING"});

    const api = new Topgg.Api(`${client.configs.topggToken}`);

    setInterval(() => {
        api.postStats({
            serverCount: client.guilds.cache.size
        })
    }, 1800000);
}