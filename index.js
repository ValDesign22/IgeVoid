/* Modules */

const { Client, Collection, WebhookClient } = require("discord.js");
const { readdir, readdirSync } = require("fs");
const Database = require("easy-json-database");
const { Player } = require('discord-player');
const { Webhook } = require("@top-gg/sdk");
const ms = require("ms");
const express = require("express");
const http = require("http");

/* Configs */

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const configs = require("./settings/configs.json");
const emotes = require("./utils/emojis.json");
const colors = require("./utils/colors.json");
const db = new Database("database/db.json");
const ranks = new Database("database/ranks.json");

client.player = new Player(client);
client.configs = configs;
client.emotes = emotes;
client.colors = colors;
client.db = db;
client.ranks = ranks;

/* Giveaways */

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

/* Handler */

readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Event: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
    console.log(`${files.length} events`)
});

const player = readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
    console.log(`Music Event: ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();

readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const props = require(`./commands/${file}`);
        client.commands.set(props.help.name, props);
        if (props.help.aliases) {
            props.help.aliases.forEach(alias => {
                client.aliases.set(alias, props);
            });
        }
        if (props.help.category) {
            client.categories.set(props.help.category, props);
        }
        console.log(`Commande: ${props.help.name}`)
    });
    console.log(`${client.commands.size} commandes`)
});

client.login(configs.token);

/* Express */

const webhook = new Webhook("VOTRE MOT DE PASSE DE WEBHOOK TOP.GG");
const hook = new WebhookClient(`${configs.voteHookID}`, `${configs.voteHookToken}`);

const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.post('/dblwebhook', webhook.middleware(), (req, res) => {
    const user = client.users.cache.find(u => u.id === `${req.vote.user}`);
    
    hook.send(`${user.tag} vient juste de voter pour [MultiBot](https://top.gg/bot/804289381141446666/).\nIl a obtenu le premium pour 12h.`);
    
    client.db.set(`premium_${user.id}`, true);
    
    user.send(`Merci d'avoir voté pour moi.\nTu as obtenu le premium pour 12h, commandes débloquées: \`${configs.prefix}menu\`, \`${configs.prefix}giveaway\`.\nN'hésite pas à rejoindre le serveur support (${configs.support}) pour plus d'informations.`);
    
    const time = ms("12h")
    
    setTimeout(() => {
        user.send(`Tu vient de perdre ton premium, si tu veux à nouveaux l'obtenir n'hésite pas à aller voter pour moi sur Top.gg`);
        
        client.db.set(`premium_${user.id}`, false);
    }, time);
})

const listener = server.listen(PORT, function() { //Remplace PORT par le port de votre hébergement.
    console.log("Dashboard en ligne sur le port " + listener.address().port);
})
