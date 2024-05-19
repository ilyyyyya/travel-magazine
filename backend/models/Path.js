const mongoose = require('mongoose');

const PathSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
        min: 0,
        max: 5,
    },
    place: {
        type: String,
        required: true,
    },
    unavailableDates: {
        type: [Number],
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model('Path', PathSchema);