const userDao = require("../../dao/user/user_dao.js");

const UserService = {
    login(req,res,next){
        const {username,password} = req.body;

        // userDao.find()
    },

    register(req,res,next){
        const {username, password, email} = req.body;

        userDao.save({username,password,email})
                .then((data) => {
                    console.log(data);
                    res.json({res_code:1,res_error:"",res_body:{status:1,message:"success",data:{username:data.username}}});
                })
                .catch((err)=>{
                    console.log(err);
                    res.json({res_code:1,res_error:"",res_body:{status:1,message:"failed" + err,data:{}}})
                });

    }
}