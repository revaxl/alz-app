const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true },
    lname: {
        type: String,
        required: true },
    phone: {
        type: String,
        required: true },
    address: {
        type: String,
        required: true },
    longitude: Number,
    latitude: Number,
    login: {
        type: String,
        required: true },
    password: {
        type: String,
        required: true },
    contacts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Contact'
    }],
    medications: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Medication'
    }],
    activities: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Activity'
    }]
});

function autoPopulate(next){
    this.populate('contacts');
    this.populate('medications', '-user');
    this.populate('activities')
	next();
};

userSchema.pre('find', autoPopulate);
userSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('User', userSchema);