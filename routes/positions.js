var express = require('express');
var router = express.Router();
var path = require("path");

const PositionService = require("../services/position/position_service.js");

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"../public/images/upload/"));
    },

    filemame:function(req,file,cb){
        const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
        cb(null,file.filemame + '-' + Date.now() + ext);
    }
})

var upload = multer({storage:storage});

router.post("/add",upload.single("logo"),PositionService.add);

router.get("/find_by_page",PositionService.findByPage);

router.post("/delete",PositionService.delete);

router.post("/update",upload.single("updatelogo"),PositionService.update);


module.exports = router;
