var express = require('express');
var router = express.Router();
var realtime = require("../rtd-realtime")
var axios = require("axios")

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

router.get("/quote", function (req, res, next) {
  axios.get("http://quotesondesign.com/wp-json/posts")
  .then(function (response) {
    res.json(response.data)
  })
  .catch(function (error) {
    next(error)
  })
})

module.exports = router;
