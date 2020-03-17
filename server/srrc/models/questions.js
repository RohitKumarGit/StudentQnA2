const mongoose = require('mongoose')
const questionsSchema = new mongoose.Schema({
    urgent:{
        type:Boolean,
        default:false
    },
    date : Date,
    raise_request:{
        type:Boolean,
        default:false
    },
    email : String,
    answered : {
        type:Boolean,
        default:false
    },
   
    question:String
});
questionsSchema.statics.postQuestion = async function(question,email){
    const questionn = new Question({question:question,email:email});
    await questionn.save();
    
};
questionsSchema.methods.createUrgency = async function(){
    const question = this;
    question.urgent = true;
    await question.save()
}
questionsSchema.statics.getQuestions = async function(email){
    const questions = await Question.find({email})
    return questions
}
questionsSchema.methods.getAllQuestions = async function(){
    const questions = await Question.find({answered:false});
    return questions
}
questionsSchema.methods.raiseRequest = async function(){
    console.log("raising request")
    const question = this
    question.raise_request = true
    console.log(question.raise_request);
    await question.save();
}
const Question = new mongoose.model('Questions',questionsSchema);
module.exports = Question;
