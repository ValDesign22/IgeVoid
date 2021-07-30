const { Schema, model } = require('mongoose');

const premiumDB = new Schema({
    id: { type: String, required: true },
    stat: { type: Boolean, required: true }
});

const premium = module.exports = model('premium', premiumDB);