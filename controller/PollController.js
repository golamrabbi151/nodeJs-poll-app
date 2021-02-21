const Poll = require("../model/Poll")


// Create Poll form
exports.GetPollForm = (req,res)=>{
    res.render("create")
}


// create new poll

exports.PostPoll = async (req,res,next)=>{

    let {title,description,totalVote,options} = req.body

    options = await options.map( opt => {
        return {name:opt }
    })

    let poll = await new Poll({title,description,totalVote,options})

    try{
       await poll.save()
        res.redirect("./polls")

    }catch(error){
        console.log(error)
    }
    
    // res.render("create")
}

// poll list

exports.ShowPollList = async (req,res,next) => {
    try{
        const polls = await Poll.find()
         res.render('polls',{polls})
    }catch(error){
        console.log(error)
    }
}

// View Single poll

exports.ViewSinglePoll = async (req,res,next)=>{

    let id = req.params.id
    // console.log(id)
    try {
        let polls = await Poll.findById(id)
        let options = [...polls.options]
        // console.log(options)
        let result = []
        options.forEach(option => {
            let parcentage = (option.vote * 100)/polls.totalVote
            result.push({
                ...option._doc,
                parcentage:parcentage?parcentage:0
            })
        });


        res.render('viewPoll',{polls,result})
    } catch (error) {
        console.log(error.message)
    }
}

exports.SubmitVote = async (req,res,next)=>{
    const id = req.params.id
    // console.log("params = "+id)
    const optionsId = req.body.options

    const poll = await Poll.findById(id)
    let options = [...poll.options]
    let index = options.findIndex(opt => opt.id === optionsId)
    options[index].vote = options[index].vote + 1

    let totalVote = poll.totalVote + 1

    await Poll.findOneAndUpdate({_id:id},{$set:{options,totalVote}})

    res.redirect('/polls/'+id)

    


}
