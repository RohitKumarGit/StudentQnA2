const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name : String,
    email:String,
    role:String,
    college:{
        type:String,
        default:"none"
    },
    profileUrl:String,
    points : {
        type:Number,
        default:500
    },
    class:{
        type:String,
        default:"college"
    },
    branch:{
        type:String,
        default:"none"
    },
    yearOfAdmission:{
        type:String,
        default:"none"
    }
});

userSchema.statics.getUser = async function(email){
    console.log(email)
    const user =await User.findOne({email});
    console.log(user)
    return user;
}
userSchema.statics.createUser = async function(details){
    const user = new User(details);
    await user.save()
}
userSchema.statics.deductPoint = async function(email,point){
   
    const user =await User.findOne({email});
    console.log(user)
    console.log(point)
    const x = user.points - point

    user.points = x;
    console.log(user)
    await user.save()
}
const User =new  mongoose.model('User',userSchema);
module.exports = User