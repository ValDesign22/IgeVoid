const { Schema, model } = require('mongoose');

const ticketDB = new Schema({
    id: { type: String, required: true },
    cID: { type: String, required: false },
    text: { type: String, required: false },
    content: { type: String, required: true },
    reason: { type: String, required: true }
});

const ticket = module.exports = model('ticket', ticketDB);