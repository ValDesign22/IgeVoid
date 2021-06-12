const { Router } = require('express');
const { website } = require("../settings/website.json");

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			if (!req.user) return res.redirect('/login');

			const { client } = req;

			return res.render('profil', {
                bot: website,
				user: req.user,
				clien: client
            });
		});
	}
};

module.exports.page = '/profil';