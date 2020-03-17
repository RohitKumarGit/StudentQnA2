/* eslint-disable prettier/prettier */
const express = require('express');
const app = express();
app.use(express.json());
const questionRouter = require('./srrc/routers/qna');
const userRouter = require('./srrc/routers/user');
app.use(questionRouter)
app.use(userRouter)
require('./srrc/mongodb/db');
const User = require('./srrc/models/user');
const Answers = require('./srrc/models/answers');
const Questions = require('./srrc/models/questions');
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/login.html')
});
app.listen(5000);