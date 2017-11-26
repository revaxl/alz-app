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
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false }

});

module.exports = mongoose.model('Activity', activitySchema);