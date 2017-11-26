const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Medication = mongoose.model('Medication');

router.get('/', function(req, res) {
  const medications = Medication.find({}, function(err, result){
    if (err) return res.json(err);
    if (result.length <= 0) return res.json({'response':'no medications'});
    res.json(result);
  });
});

router.post('/update/:id', function(req, res){
  
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

router.post('/delete/:id', function(req, res){
  Medication.findOneAndRemove({_id: req.params.id}, function(err){
    if (err) return res.json(err);
    res.json({'response':'user deleted'});
  });
});

module.exports = router;
