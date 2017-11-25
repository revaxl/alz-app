const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: String,
    when: Date,
    completed: {
        type: Boolean,
        default: false }

});

module.exports = mongoose.model('Activity', activitySchema);