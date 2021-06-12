const { Router } = require('express');
const { website } = require("../settings/website.json");

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			res.render("stats", { bot: website, user: req.user })
		});
	}
};

module.exports.page = '/stats';