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

module.exports = router;
