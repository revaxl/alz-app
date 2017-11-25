const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
    name: String,
    dose: Number,
    taken: {
        type: Boolean,
        default: false }
});

module.exports = mongoose.model('Medication', medicationSchema);