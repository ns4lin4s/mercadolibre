const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationLogSchema = new Schema({

    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    available_bikes: {
        type: Number,
        required: true
    },
    busy_bikes: {
        type: Number,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    date_formatted: {
        type: String,
        required: true
    },
});

module.exports =  mongoose.model('StationLog', StationLogSchema);