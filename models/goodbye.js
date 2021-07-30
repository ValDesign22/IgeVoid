const { Schema, model } = require('mongoose');

const goodbyeDB = new Schema({
    id: { type: String, required: true },
    cID: { type: String, required: false },
    text: { type: String, required: false },
    statut: { type: Boolean, required: false },
    content: { type: String, required: true },
    reason: { type: String, required: true }
});

const goodbye = module.exports = model('goodbye',  goodbyeDB);