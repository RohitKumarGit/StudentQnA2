const fs = require('fs')
const mongoose = require('mongoose');
const answersSchema = new mongoose.Schema({
    questionId : String,
    emailExpert : String,
    date: Date,
    answerUrl:{
        type:String,
        default:"NONE"
    },
    finalized:{
        type:Boolean,
        default:false
    }
});
answersSchema.statics.postAnswer = async function(questionId,emailExpert){
    const answer = new Answers({emailExpert,questionId});
    await answer.save();
    return answer
}
answersSchema.statics.setAnswer = async function(id,answer){
    const answerr = await Answers.findById(id);
    console.log(answerr);
    answerr.answerUrl = '/'+ answerr._id+'.txt';
    fs.appendFile(__dirname+'/../answers'+answerr.answerUrl,answer,(err)=>{if(err){console.log(err)}else{console.log("done")}});
    await answerr.save();
}
answersSchema.statics.getAnswers=async function(questionId){
    const answer = await Answers.find({questionId});
    return answer;
}
answersSchema.statics.finalize = async function(answerId){
    const answer =await Answers.findById(answerId);
    answer.finalized = true;
    await answer.save();
}
const Answers = new mongoose.model('Answers',answersSchema);
module.exports = Answers;