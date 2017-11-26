const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true },
    when: {
        type: Date,
        required: true },
    completed: {
        type: Boolean,
        default: false }

});

module.exports = mongoose.model('Activity', activitySchema);