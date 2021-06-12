const { Router } = require('express');

module.exports.Router = class Routes extends Router {
    constructor() {
        super();

        this.get('/', function (req, res) {
            return res.redirect(`${req.client.configs.support}`);
        });
    }
};

module.exports.page = '/support';