const Router = new require('express').Router();
const User = require('../models/user');
Router.post('/createuser',async (req,res)=>{
    User.createUser(req.body)
    res.send()
});
Router.get('/user/:email',async (req,res)=>{
    console.log("user..")
    console.log(req.params)
    

    const user = await User.getUser(req.params.email)
    res.send(user)
});
Router.post('/deduct',async (req,res)=>{
    User.deductPoint(req.body.email,req.body.points);
    res.send()
});
module.exports=Router;