/* Modules */

const { Client, Collection } = require("discord.js");
const { readdir, readdirSync } = require("fs");
const Database = require("easy-json-database");
const { Player } = require('discord-player');

/* Configs */

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const configs = require("./settings/configs.json");
const emotes = require("./utils/emojis.json");
const colors = require("./utils/colors.json");
const db = new Database("database/db.json");
const ranks = new Database("database/ranks.json");
const logs = new Database("database/logs.json");
const rr = new Database("database/rr.json");
const dashboardDB = new Database("database/dashDB.json");

client.player = new Player(client, { enableLive: true });
client.configs = configs;
client.emotes = emotes;
client.colors = colors;
client.db = db;
client.ranks = ranks;
client.logs = logs;
client.rr = rr;
client.dash = dashboardDB;

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

// client.commands = new Collection();
// client.aliases = new Collection();
// client.categories = new Collection();

["commands", "aliases", "categories", "cooldowns", "premium"].forEach(x => { client[x] = new Collection() });

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