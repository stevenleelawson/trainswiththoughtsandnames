var express = require('express');
var router = express.Router();
var realtime = require("../rtd-realtime")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', function(req, res, next ){
  realtime.VehiclePositions.load((err, newfeed) => {
    if(err){
      next(err);
      return;
    }
    res.json(newfeed)
  });
});

module.exports = router;
