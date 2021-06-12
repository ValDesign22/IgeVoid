const Discord = require('discord.js');
const { Router } = require('express');
const { website } = require("../settings/website.json");

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			if (!req.user) return res.redirect('/login');

			return res.render('guilds', {
                bot: website,
				user: req.user,
				perms: Discord.Permissions
            });
		});

		this.get('/:ID', function (req, res) {
			if (!req.user) return res.redirect('/login');

			const guild = req.client.guilds.cache.get(req.params.ID);

			if (!guild) return res.redirect('/invite');
			if (!guild.members.cache.get(req.user.me.id).hasPermission('MANAGE_GUILD')) return res.redirect('/guilds');
			

			return res.render("dashboard", { bot: website, user: req.user, clien: req.client, server: guild, alert: null });
		});

		this.get("/:ID/prefix", async (req, res) => {
			if (!req.user) return res.redirect("/login");

			const guild = req.client.guilds.cache.get(req.params.ID);

			if (!guild) return res.redirect("/invite");
			if (!guild.members.cache.get(req.user.me.id).hasPermission('MANAGE_GUILD')) return res.redirect('/guilds');

			return res.render("dashboard/prefix", { bot: website, user: req.user, clien: req.client, server: guild, alert: null });
		});

		this.get("/:ID/bvn", async (req, res) => {
			if (!req.user) return res.redirect("/login");

			const guild = req.client.guilds.cache.get(req.params.ID);

			if (!guild) return res.redirect("/invite");
			if (!guild.members.cache.get(req.user.me.id).hasPermission('MANAGE_GUILD')) return res.redirect('/guilds');

			return res.render("dashboard/bvn", { bot: website, user: req.user, clien: req.client, server: guild, alert: null });
		})

		this.get("/:ID/gb", async (req, res) => {
			if (!req.user) return res.redirect("/login");

			const guild = req.client.guilds.cache.get(req.params.ID);

			if (!guild) return res.redirect("/invite");
			if (!guild.members.cache.get(req.user.me.id).hasPermission('MANAGE_GUILD')) return res.redirect('/guilds');

			return res.render("dashboard/gb", { bot: website, user: req.user, clien: req.client, server: guild, alert: null });
		})
	}
};

module.exports.page = '/guilds';