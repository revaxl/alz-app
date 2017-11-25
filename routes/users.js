const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res) {
  const users = User.find({}, function(err, result){
    if (err) return res.send(err);
    if (result.length <= 0) return res.send('no users');
    res.json(result);
  });
});

router.post('/add', function(req, res){
  const user = new User(req.body);
  user.save(function(err, u){
    if (err) return res.send(err);
    res.json(u);
  });
});

router.post('/update/:id', function(req, res){
  
  const user = User.findOneAndUpdate(
    {_id: req.params.id},
    {$set: req.body},
    {new: true, context: 'query'},
    function(err, u){
      if (err) return res.send(err);
      res.json(u);
    }
  );
});

router.post('/delete/:id', function(req, res){
  User.findOneAndRemove({_id: req.params.id}, function(err){
    if (err) return res.send(err);
    res.send('user deleted');
  });
});

module.exports = router;
