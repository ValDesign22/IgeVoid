/* Modules */

const { Client, Collection, Intents } = require("discord.js");
const { readdir, readdirSync } = require("fs");
const Database = require("easy-json-database");
const { Player } = require('discord-player');
const color = require('colors');

/* Extends */

//require("./Util/ExtendedMessage")

/* Configs */

const client = new Client({
    partials: [
        'MESSAGE',
        'CHANNEL',
        'REACTION'
    ],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    allowedMentions: {
        repliedUser: false
    }
});
color.enable();

const configs = require("./settings/configs.json");
const { Create } = require("djs-extend");

client.player = new Player(client, {
    enableLive: true,
    leaveOnEmpty: false
});
client.configs = configs;
["db", "logs", "dashDB"].forEach(x => client[x] = new Database(`database/${x}.json`));
["emotes", "colors"].forEach(x => client[x] = require(`./utils/${x}.json`));
["encode", "decode"].forEach(x => client[x] = require(`./src/functions/${x}`));
["shorten", "antispam", "massping"].forEach(x => client[x] = require(`./Util/${x}`));

color.setTheme({
    command: ["blue", "bold"],
    event: ["red", "bold"],
    music: ["green", "bold"],
    route: ["yellow", "bold"],
    url: ["cyan", "bold"],
    info: ["green", "underline", "bold"]
});

/* Imports */

const { log } = console;

/* MongoDB */

Create(configs.mongoSrv);

/* Functions */

readdir("./src/functions/", (_err, files) => {
    log(`${`${files.length}`.info} fonctions`);
});

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
    log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

/* Handler */

readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        //log(`Event: `.event + `${eventName}`.underline);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
    log(`${`${files.length}`.info} events`)
});

readdir("./clientWs/", (_err, files) => {
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const ws = require(`./clientWs/${file}`);
        let wsName = file.split(".")[0];
        client.ws.on(wsName, ws.bind(null, client));
        delete require.cache[require.resolve(`./clientWs/${file}`)];
    })
    log(`${`${files.length}`.info} ws events`);
})

const player = readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
    //log(`Music Event: `.music + `${file.split(".")}`.underline);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

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
        //log(`Commande: `.command + `${props.help.name}`.underline)
    });
    log(`${`${client.commands.size}`.info} commandes`)
});

client.login(configs.token);

const test = require("./lang");

test();