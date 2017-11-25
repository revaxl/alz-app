const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    fname: String,
    lname: String,
    phone: String,
    address: String,
    longitude: Number,
    latitude: Number,
    contacts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Contact'}]
});

module.exports = mongoose.model('User', userSchema);