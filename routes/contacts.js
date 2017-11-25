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

router.post('/add', function(req, res){
    const contact = new Contact(req.body);
    contact.save(function(err, con){
        if (err) return res.json(err);
        res.json(con);
    });
});

router.post('update/:id', function(req, res){
    Contact.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true, context: 'query'},
        function(err, con){
            if (err) return res.json(err)
            res.json(con);
        }
    );
});

router.post('delete/:id', function(req, res){
    Contact.findOneAndRemove({_id: req.params.id}, function(err){
        if (err) return res.json(err);
        res.json({'response': 'delete success'});
    });
});