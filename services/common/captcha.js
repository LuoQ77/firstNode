var svgCaptcha = require("svg-captcha");

const Captcha = {
    gencptcha(req,res,next){
        var captcha = svgCaptcha.create({color:true});
        
        req.session.captcha = captcha.text;
      
        res.status(200).json({
          res_code:1,
          res_error:"",
          res_body: {
            data : captcha.data
          }
        });
      },

    vertifyCaptcha(req,res,next){
        const {code} = req.query;
        console.log(req.query);
        var vaild;
      
        if(code.toUpperCase() === req.session.captcha.toUpperCase()){
          vaild = true;
        }else{
          vaild = false;
        }
        res.json({
          res_code:1,
          res_error:"",
          res_body:{
            vaild
          }
        });
      }
}

module.exports = Captcha;