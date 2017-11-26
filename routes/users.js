const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Contact = mongoose.model('Contact');
// get all users
router.get('/', function(req, res) {
  const users = User.find({}, function(err, result){
    if (err) return res.json(err);
    res.json(result);
  });
});

// find user by ID
router.get('/:id', function(req, res){
  const user = User.findOne({_id: req.params.id}, function(err, u){
    if (err) return res.json(err);
    res.json(u);
  });
});

// router.get('/:id/contact', function(req, res){
//   res.render('contact');
// });

// create new user
router.post('/add', function(req, res){
  const user = new User(req.body);
  user.save(function(err, u){
    if (err) return res.json(err);
    res.json(u);
  });
});

// update user by ID
router.post('/update/:id', function(req, res){
  
  const user = User.findOneAndUpdate(
    {_id: req.params.id},
    {$set: req.body},
    {new: true, context: 'query'},
    function(err, u){
      if (err) return res.json(err);
      res.json(u);
    }
  );
});

// delete user by ID
router.post('/delete/:id', function(req, res){
  User.findOneAndRemove({_id: req.params.id}, function(err){
    if (err) return res.json(err);
    res.json({'response':'user deleted'});
  });
});

/**
 * Contacts
 */

// create new contact for a user
router.post('/:id/add/contact', function(req, res){
  req.body.user = req.params.id;
  const contact = new Contact(req.body);
  contact.save(function(err, con){
      if (err) return res.json(err);
      User.findOneAndUpdate({_id: req.params.id}, {$push: {contacts: con._id}}, function(err){
        if (err) return res.send(err);
      });
      res.json(con);
  });
});

/**
 * Medications
 */

router.post('/:id/add/medication', function(req, res){
  const medication = new Medication(req.body);
  medication.save(function(err, med){
    if (err) return res.json(err);
    User.findOneAndUpdate({_id: req.params.id}, {$push: {medications: med._id}}, function(err){
      if (err) return res.send(err);
    });
    res.json(med);
  });
});

module.exports = router;
