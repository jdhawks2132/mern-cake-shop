const { Schema, model } = require('mongoose');

const cakeSchema = new Schema({
    cakeName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    cakePrice: {
        type: Number,
        required: true,
    },
    cakeDescription: {
        type: String,
        required: true,
    },
});

const Cake = model('Cake', cakeSchema);

module.exports = Cake;