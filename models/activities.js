const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true },
    date: {
        type: Date,
        required: true },
    place: {
            type: String,
            required: true },
    time: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        default: false }

});

module.exports = mongoose.model('Activity', activitySchema);