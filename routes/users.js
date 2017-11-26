const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Contact = mongoose.model('Contact');
const Medication = mongoose.model('Medication');
const Activity = mongoose.model('Activity');

// get all users
router.get('/', function(req, res) {
  User.find({}, function(err, result){
    if (err) return res.json(err);
    res.send(result);
  });
});

// find user by ID
router.get('/:id', function(req, res){
  User.findOne({_id: req.params.id}, function(err, u){
    if (err) return res.json(err);
    res.send(u);
  });
});

router.get('/:login/:pass', function(req, res){
  User.findOne({$and: [{login: req.params.login, }, {password: req.params.pass}]}, function(err, user){
    if (err) return res.json(err);
    res.send(user);
  });
});

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
router.get('/:id/contacts', function(req, res){
  Contact.find({}, function(err, cons){
    if (err) return res.json(err);
    res.json(cons);
  });
});

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

router.post('/:user_id/update/contact/:id', function(req, res){
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

router.post('/:user_id/delete/contact/:id', function(req, res){
  Contact.findOneAndRemove({_id: req.params.id}, function(err, con){
      if (err) return res.json(err);
      User.findOneAndUpdate({_id: req.params.id}, {$pull: {contacts: con._id}});
      res.json({'response': 'delete success'});
  });
});

/**
 * Medications
 */
router.get('/:id/medications', function(req, res){
  User.findOne({_id: req.params.id}, function(err, u){
    if (err) return res.json(err);
    res.json(u);
  });
});

router.post('/:id/add/medication', function(req, res){
  req.body.user = req.params.id;
  const medication = new Medication(req.body);
  medication.save(function(err, med){
    if (err) return res.json(err);
    User.findOneAndUpdate({_id: req.params.id}, {$push: {medications: med._id}}, function(err){
      if (err) return res.send(err);
    });
    res.json(med);
  });
});

router.post('/:user_id/update/medication/:id', function(req, res){
  
  const med = Medication.findOneAndUpdate(
    {_id: req.params.id},
    {$set: req.body},
    {new: true, context: 'query'},
    function(err, u){
      if (err) return res.json(err);
      res.json(u);
    }
  );
});

router.post('/:user_id/delete/medication/:id', function(req, res){
  Medication.findOneAndRemove({_id: req.params.id}, function(err, med){
    if (err) return res.json(err);
    User.findOneAndUpdate({_id: req.params.id}, {$pull: {medication: med._id}});
    res.json({'response':'medication deleted'});
  });
});

/**
 * Activity
 */
router.post('/:id/add/activity', function(req, res){
  req.body.user = req.params.id;
  const activity = new Activity(req.body);
  activity.save(function(err, act){
    if (err) return res.json(err);
    User.findOneAndUpdate({_id: req.params.id}, {$push: {activities: act._id}}, function(err){
      if (err) return res.json(err);
    });
    res.json(act);
  });
});

router.post('/:user_id/update/activity/:id', function(req, res){
  
  const act = Activity.findOneAndUpdate(
    {_id: req.params.id},
    {$set: req.body},
    {new: true, context: 'query'},
    function(err, u){
      if (err) return res.json(err);
      res.json(u);
    }
  );
});

router.post('/:user_id/delete/activity/:id', function(req, res){
  Activity.findOneAndRemove({_id: req.params.id}, function(err, act){
    if (err) return res.json(err);
    User.findOneAndUpdate({_id: req.params.id}, {$pull: {activities: act._id}});
    res.json({'response':'activity deleted'});
  });
});

module.exports = router;
