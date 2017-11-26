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

module.exports = router;
