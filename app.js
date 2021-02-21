const express = require("express")
const mongoose = require("mongoose");
const morgan = require("morgan")
const PollController = require("./controller/PollController")

const app = express();

// ejs engin
app.set("view engine","ejs")

app.use(morgan("dev"))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.render("home")
})
// app.get('/create',(req,res)=>{
//     res.render("create")
// })

// create poll
app.get('/create',PollController.GetPollForm)
// poll list 
app.post('/create',PollController.PostPoll)
// poll list
app.get('/polls',PollController.ShowPollList)
// single poll
app.get('/polls/:id',PollController.ViewSinglePoll)
// vote poll
app.post('/polls/:id',PollController.SubmitVote)

mongoose.connect('mongodb+srv://gulu:gulu123@cluster0.kacbg.mongodb.net/poll', 
                {
                 useNewUrlParser: true, 
                 useUnifiedTopology: true
                })
                .then(()=>{
                    app.listen(2121,()=>{
                        console.log(`app is running port 2121`)
                    })
                })
                .catch(e=>{
                    console.log(e)
                })

