const {Schema,model}=require("mongoose")

const PollSchema = new Schema({
   title:{
        type:String,
        required:true,
        trim:true
   },
   description:{
        type:String,
        required:true,
        trim:true
   },
   totalVote:Number,
   options:{
        type:[{
            name:String,
            vote:Number
        }]

   }
})

const Poll = model("Poll",PollSchema)
module.exports = Poll