const figlet = require("figlet");
const { Api } = require('@top-gg/sdk');
const axios = require("axios");

module.exports = async (client) => {
    const { user, configs, guilds, users } = client;
    const { log, dir } = console;

    figlet(`READY !`, function(err, data) {
        if (err) {
            log("Une erreur s'est produite avec l'ascii de l'event ready.");
            dir(err);
            return;
        }
        log(`${data}`.rainbow)
    });

    log(`${`${user.tag}`.info} est en ligne. ${`${guilds.cache.size}`.info} serveurs et ${`${users.cache.size}`.info} utilisateurs.`);

    user.setActivity(`${configs.prefix}help | Dans ${guilds.cache.size} serveurs | ${users.cache.size} utilisateurs`, {type: "WATCHING"});
    /* Slashs */

    client.api.applications(client.user.id).guilds('820279543402987553').commands.post({data: {
        name: 'ping',
        description: 'Get bot and API latency'
    }})
    client.api.applications(client.user.id).guilds('820279543402987553').commands.post({data: {
        name: 'help',
        description: 'Get bot commands'
    }})

    /* Stats */

    const api = new Api(`${configs.topggToken}`);

    api.postStats({
        serverCount: guilds.cache.size
    });
    
    await axios
    .post(`https://discord.bots.gg/api/v1/bots/${user.id}/stats`, {
        guildCount: guilds.cache.size,
    }, {
        headers: {
            Authorization: configs.dbotsToken,
            "User-Agent": `${user.username}-${user.discriminator}/${require("../package.json").version} (discord.js;+http://igevoid.ml) DBots/${user.id}`
        }
    })
    .catch(err => {
        console.error(err);
    })

    setInterval(async () => {
        api.postStats({
            serverCount: guilds.cache.size
        });

        await axios
        .post(`https://discord.bots.gg/api/v1/bots/${user.id}/stats`, {
            guildCount: guilds.cache.size,
        }, {
            headers: {
                Authorization: configs.dbotsToken,
                "User-Agent": `${user.username}-${user.discriminator}/${require("../package.json").version} (discord.js;+http://igevoid.ml) DBots/${user.id}`
            }
        })
        .catch(err => {
            console.error(err);
        })
    }, 1800000);
}
