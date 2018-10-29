var express = require('express');
var router = express.Router();

var Captcha = require("../services/common/captcha.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/api/captcha",Captcha.gencptcha);

router.get("/api/captcha/vertify",Captcha.vertifyCaptcha);
module.exports = router;
