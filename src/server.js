import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import mongoose from "mongoose"
import session from "express-session"
const { Schema } = mongoose;
require("dotenv").config()
let app = express();

// config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


viewEngine(app)
initWebRoutes(app)

//Mongoose
var con
const connectDB = async () => {
    try {
        con = await mongoose.connect(process.env.Mongoose_URL, {});
        console.log('Connected to mongoDB')
        console.log()
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
  
connectDB()

var UserSchema = new mongoose.Schema({
    mail: String,
    pw: String
})


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

var UserModel = mongoose.model('users', UserSchema);

// File mongoose.model.js
// ... more code
// const findUser = async () => {
//     try {
//         const userFind = await UserModel.find();
//         console.log("Find user:" + userFind);
//     } catch(err) {
//         console.log(err);
//     }
// }

// findUser();

app.get("/", async (req, res) => {
    console.log(process.env.Mongoose_URL)
    const users = await UserModel.find();
    if(users.length === 0){
        return res.status(404).json({
            message: "Ko tim thay san pham",
        })
    }
    
    return res.status(200).json(users)
})

var mail, pw
var userLogin
app.post('/login', async (req, res, next) => {
    mail = req.body.mail
    pw = req.body.pw
    const user = await UserModel.findOne({mail: mail, pw: pw})
    if(!user){
        return res.status(401).send("Username or password is incorrect")
    }
    req.session.user = mail;
    res.json(req.session)
    next()
})

app.post('/sign-in', (req, res, next) => {
    mail = req.body.mail
    pw = req.body.pw
    const user = new UserModel({
        mail: req.body.mail,
        pw: req.body.pw
    })

    UserModel.insertMany(user)
    console.log(user)
    next()
})


app.get('/set', (req, res) => {
    res.json(req.session)
})

let port = process.env.PORT || 6969
app.listen(port, () => {
    console.log("Running on the port " + port)
})
