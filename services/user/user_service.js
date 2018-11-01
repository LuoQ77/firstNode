const userDao = require("../../dao/user/user_dao.js");

const UserService = {
    login(req,res,next){
        const {username,password} = req.body;
        userDao.find({username})
                .then((data)=>{
                    if(data.length === 1){
                        if(password === data[0].password){

                            req.session.loginUser = username;
                            res.json({
                                res_code:1,
                                res_error: "",
                                res_body: {
                                    status: 1,
                                    message: "success",
                                    data: {
                                        username: data[0].username
                                    }
                                }
                            });
                        }else{
                            res.json({
                                res_code:1,
                                res_error:"",
                                res_body:{
                                    status:0,
                                    message:"密码错误",
                                    data:{}
                                }
                            })
                        }
                        res.json();
                    }else{
                        res.json({
                            res_code:1,
                            res_error:"",
                            res_body: {
                                status:0,
                                message: "用户名不存在",
                                data: {}
                            }
                        })
                    }
                })
                .catch((err)=>{
                    res.json({
                        res_code:0,
                        res_error:err,
                        res_body:{}
                    })
                })
        // userDao.find()
    },

    register(req,res,next){
        const {username, password, email} = req.body;

        userDao.save({username,password,email})
                .then((data) => {
                    req.session.loginUser = username;
                    console.log(data);
                    res.json({res_code:1,res_error:"",res_body:{status:1,message:"success",data:{username:data.username}}});
                })
                .catch((err)=>{
                    console.log(err);
                    res.json({res_code:1,res_error:"",res_body:{status:1,message:"failed" + err,data:{}}})
                });

    },

    logout(req,res,next){
        req.session.loginUser = null;
        res.json({
            res_code:1,
            res_error:"",
            res_body:{
                status:1
            }
        })
    }
}
module.exports = UserService;