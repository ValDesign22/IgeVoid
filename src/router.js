const fs = require('fs');
const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const { website } = require("../settings/website.json");
const { Webhook } = require("@top-gg/sdk");
const { WebhookClient, Collection } = require("discord.js");
const ms = require("ms");

const webhook = new Webhook("YOUR TOP.GG WEBHOOK PASSWORD");

class Dashboard {
    constructor(client) {
        this.app = express();
        this.client = client;

        this.setup();
        this.routes();

        this.dashboardURL = `${this.client.configs.dashboard.url}${this.client.configs.dashboard.port !== 80 ? ':' + this.client.configs.dashboard.port : ''}`;

        console.log(`Dashboard launched on the port ${this.client.configs.dashboard.port}`);
        console.log(`Access it at : ${this.dashboardURL}`);
    }

    setup() {
        this.app.use(express.json());
        this.app.set('view engine', 'ejs');
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(expressLayouts);

        this.app.use(session({ secret: `${Date.now()}${this.client.user.id}`, resave: false, saveUninitialized: false }));

        this.app.use((req, res, next) => {
            req.user = req.session.user;
            req.client = this.client;
            req.dashURL = this.dashboardURL;
            req.config = this.client.configs.dashboard;

            next();
        });

        this.app.listen(this.client.configs.dashboard.port);
    }

    routes() {
        const files = fs.readdirSync('./routes/').filter(file => file.endsWith('.js'));

        for (const file of files) {
            const route = require(`../routes/${file}`);

            if (!this.client.configs.enabled && route.page === '/support') return;

            this.app.use(route.page, new route.Router());

            console.log(`Route ${file.split('.')[0].toLowerCase()} launched`);
        }

        /* Top.gg */
        
        this.app.post('/dblwebhook', webhook.middleware(), (req, res) => {
            const hook = new WebhookClient(`${this.client.configs.voteHookID}`, `${this.client.configs.voteHookToken}`);
            const user = this.client.users.cache.find(u => u.id === `${req.vote.user}`);
            
            hook.send(`${user.tag} vient juste de voter pour [MultiBot](https://top.gg/bot/804289381141446666/).\nIl a obtenu le premium pour 12h.`);
            
            user.send(`Merci d'avoir voté pour moi.\nTu as obtenu le premium pour 12h, commandes débloquées: \`${this.client.configs.prefix}menu\`, \`${this.client.configs.prefix}giveaway\`.\nN'hésite pas à rejoindre le serveur support (${this.client.configs.support}) pour plus d'informations.`);
            
            if (!this.client.premium.has(user.id)) {
            	this.client.premium.set(user.id, new Collection())
        	}
    
        	const tNow = Date.now();
        	const tStamps = this.client.premium.get(user.id);
        	const cdAmount = ms("12h");
    
        	if (tStamps.has(user.id)) {
            	const cdExpTime = tStamps.get(user.id) + cdAmount;
        	}
    
        	tStamps.set(user.id, tNow);
            
            setTimeout(() => {
                user.send(`Tu vient de perdre ton premium, si tu veux à nouveaux l'obtenir n'hésite pas à aller voter pour moi sur Top.gg`);
        
                tStamps.delete(user.id)
            }, cdAmount);
        })

        /* Dashboard */

        this.app.post("/guilds/:ID/prefix", async (req, res) => {
            const guild = req.client.guilds.cache.get(req.params.ID);

            let prefix = req.body.prefix;
            
            let currentPrefix = req.client.configs.prefix;
            if (req.client.db.has(`prefix_${guild.id}`)) {
                currentPrefix = req.client.db.get(`prefix_${guild.id}`);
            }

            let alert;

            if (prefix === currentPrefix) return res.render("dashboard/prefix", { bot: website, user: req.user, clien: req.client, server: guild, alert });

            if (prefix.length > 5) {
                alert = "Le prefix ne peut pas faire plus de 5 caractères.";
            }
            else {
                alert = `Prefix du serveur ${guild.name} changé par ${req.body.prefix}.`
            }

            req.client.db.set(`prefix_${guild.id}`, prefix);

            return res.render("dashboard/prefix", { bot: website, user: req.user, clien: req.client, server: guild, alert });
        })

        this.app.post("/guilds/:ID/bvn", async (req, res) => {
            const guild = req.client.guilds.cache.get(req.params.ID);

            const channel = guild.channels.cache.find(x => x.id === `${req.body.bvn}` && x.type === "text")

            let alert = `Channel de bienvenue changé par ${channel}.`

            return res.render("dashboard/bvn", { bot: website, user: req.user, clien: req.client, server: guild, alert });
        })

        this.app.post("/guilds/:ID/gb", async (req, res) => {
            const guild = req.client.guilds.cache.get(req.params.ID);

            const channel = guild.channels.cache.find(x => x.id === `${req.body.bvn}` && x.type === "text")

            let alert = `Channel d'aurevoir changé par ${channel}.`

            return res.render("dashboard/gb", { bot: website, user: req.user, clien: req.client, server: guild, alert });
        })

        /* Error Pages */

        this.app.use(function(req, res, next) {
            res.status(404);
          
            res.render("404", { bot: website, user: req.user })
        });
    }
}

module.exports = Dashboard;
