const PositionDao = require("../../dao/position/position_dao.js");

const PositionService = {
    add(req,res,next){

        const {companyName, salary, workName,workExp,workType,workSpace} = req.body;
        // console.log(req.body)
        let logo = "";
        if(req.file){
            logo = "/images/upload/" + req.file.filename;
        }
        PositionDao.save({companyName, salary, workName,workExp,logo,workType,workSpace})
                .then((data)=>{
                    res.json({
                        res_code:1,
                        res_error:"",
                        res_body:{
                            status:1,
                            data: data
                        }
                    });
                })
                .catch((err)=>{
                    res.json({
                        res_code:0,
                        res_error:err,
                        res_body:{}
                    })
                });
    },

    findByPage(req,res,next){
        const {page} = req.query;

        PositionDao.findByPage(page)
                    .then((data)=>{
                        res.json({
                            res_code:1,
                            res_error:"",
                            res_body:{
                                status:1,
                                list:data
                            }
                        })
                    })
                    .catch((err)=>{ 
                        res.json({
                            res_code:0,
                            res_error:err,
                            res_body:{}
                        })
                    })
    },

    delete(req,res,next){
        const {_id} = req.body;

        PositionDao.delete({_id})
                .then(()=>{
                    res.json({
                        res_code:1,
                        res_error:"",
                        res_body:{
                            status:1,
                        }
                    })
                })
    },

    update(req,res,next){
        const {_id,updatecompanyName, updatesalary, updateworkName,updateworkExp,updateworkType,updateworkSpace} = req.body;
        console.log(updatecompanyName);
        let logo = "";
        if(req.file){
            logo = "/images/upload/" + req.file.filename;
        }
        console.log(logo);
        PositionDao.update(_id,{companyName:updatecompanyName, salary:updatesalary, workName:updateworkName,workExp:updateworkExp,logo,workType:updateworkType,workSpace:updateworkSpace})
                .then((data)=>{
                    res.json({
                        res_code:1,
                        res_error:"",
                        res_body:{
                            status:1,
                            data: data
                        }
                    })
                })
    }
    
};

module.exports = PositionService;