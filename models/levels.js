const { Schema, model } = require('mongoose');

const levelDB = new Schema({
    sID: { type: String, required: true },
    uID: { type: String, required: true },
    xp: { type: Number, required: true },
    lvl: { type: Number, required: true },
    msgCount: { type: Number, required: true },
});

const levels = module.exports = model('level', levelDB);