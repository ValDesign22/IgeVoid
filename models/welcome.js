const { Schema, model } = require('mongoose');

const welcomeDB = new Schema({
    id: { type: String, required: true },
    cID: { type: String, required: false },
    rID: { type: String, required: false },
    text: { type: String, required: false },
    statut: { type: Boolean, required: false },
    content: { type: String, required: true },
    reason: { type: String, required: true }
});

const welcome = module.exports = model('welcome',  welcomeDB);