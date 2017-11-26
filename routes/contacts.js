const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

router.get('/', function(req, res){
    const con = Contact.find({}, function(err, contacts){
        if (err) return res.json(err);
        res.json(contacts);
    });
});


module.exports = router;