const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

router.get('/', function(req, res) {
  const act = Activity.find({}, function(err, result){
    if (err) return res.json(err);
    if (result.length <= 0) return res.json({'response':'no activities'});
    res.json(result);
  });
});

router.post('/add', function(req, res){
  const act = new Activity(req.body);
  act.save(function(err, u){
    if (err) return res.json(err);
    res.json(u);
  });
});

router.post('/update/:id', function(req, res){
  
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

router.post('/delete/:id', function(req, res){
  Activity.findOneAndRemove({_id: req.params.id}, function(err){
    if (err) return res.json(err);
    res.json({'response':'activity deleted'});
  });
});

module.exports = router;
