const { Schema, model } = require('mongoose');

const guildDB = new Schema({
    id: { type: String, required: true },
    temps: { type: Number, required: false },
    stat: { type: Boolean, required: false },
    content: { type: String, required: true },
    reason: { type: String, required: true }
});

const guild = module.exports = model('guild', guildDB);