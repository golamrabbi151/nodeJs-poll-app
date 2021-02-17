const express = require("express")
const mongoose = require("mongoose");
const morgan = require("morgan")

const app = express();

// ejs engin
app.set("view engine","ejs")

app.use(morgan("dev"))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.render("home")
})

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

