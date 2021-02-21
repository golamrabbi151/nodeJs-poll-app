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
   totalVote:{
        type:Number,
        default:0
   },
   options:{
        type:[{
            name:String,
            vote:{type:Number,default:0}
        }]

   }
})

const Polls = model("Poll",PollSchema)
module.exports = Polls