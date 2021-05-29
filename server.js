const express=require('express')
const app=express()


//create database with server
const user = require('./models/User')

//parse the data
app.use(express.json())
let mongoose = require('mongoose');
require('dotenv').config({path:'./config/.env'})
mongoose.connect(process.env.DB_URI,{ useUnifiedTopology: true ,useNewUrlParser: true,useFindAndModify:false},(err)=>{
      
    err ? console.log(err): console.log('DB coonected')

})


// GET :  RETURN ALL USERS 

app.get('/', (req, res) => {
    user.find({}, (err, data) => {
        err ? console.log(err) : res.json(data)
    })
})
//POST :  ADD A NEW USER TO THE DATABASE 
app.post('/newuser' ,(req, res) => {
    let newuser = new user(req.body)
    newuser.save((err, newuser) => {
        err ? console.log(err) : res.json(newuser)
    })
})


// DELETE : REMOVE A USER BY ID 
app.delete('/:id', (req, res) => {
    user.findByIdAndDelete({ _id: req.params.id }, (err, msg) => {
        err ? console.log(err) : res.json({ msg: "user was deleted" })

    })
})


//PUT : EDIT A USER BY ID 
app.put('/:id', (req, res) => {
    user.findByIdAndUpdate({ _id:req.params.id}, {...req.body }, (err, data) => {
        err ? console.log(err) : res.json(data)
    })
})



//app.use('/users', require('./Routes/UserRoutes'))
const port=5000

app.listen( port, (err)=> {
    err ? console.log(err) : console.log('the server is running on port 5000')
})
