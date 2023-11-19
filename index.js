require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session") 

// mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// passport and passport-strategy require
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const port = process.env.PORT;

const server = express();

// mongoose setups
 mongoose.connect('mongodb://localhost:27017/NewDB',{useNewUrlParser:true})

const userSchema = new Schema({
    username:{type:String,unique:true},
    password:Number,
    name:String,
})

const User = mongoose.model('User',userSchema);


// morgan
server.use(logger());

// bodyparser(req.body)
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

// custom middlware
server.use((req, res, next) => {
  console.log(req.ip, req.method, req.path);
  next();
});

// static
server.use(express.static(process.env.STATIC_FOLDER));

// session

server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge:6000 }
}))

server.use(passport.initialize())
server.use(passport.session())

passport.use(new LocalStrategy(
  function(username,password,done){
    //ye check karega ki user name match hota ha ki nahi,
    console.log(username,password);
    // authenticate with mongodb database
    User.findOne({username:username},function(err,user){
  
      if(err){return done(err)}
      // user nahi mila
      if(!user){
        return done(null,false,{message:"Incorrect username."})
      }
      // password invaild ha
      if(!user.password === password){
        return done(null,false,{message:"Incorrect password."})
      }
      // last done mean app authenticate ho gye ho,taki session ke liye woh user store kar sake.
      console.log(user)
      return done(null,user)
    })
  }
))

// serialization steps
// create serializer and de-serailizer,input ma callabck leta ha

passport.serializeUser((user,done)=>{
  if(user){
    // serializer user ke pure object ko le rha but uski id ko session ma bhej rha h
    return done(null,user.id)
  }
  // session bana hi nahi ya user ha hi nahi
  return done(null,false)
})
passport.deserializeUser()


// EndPoints/API

// GET localHost:8080/hompage

server.get("/homepage", (request, response) => {
  // response.send('<h1>hello node js here</h1>')
  // response.send("<h1>Hello</h1>")
  response.json({ name: "sarfraj" });
});

server.get("/about", (request, response) => {
  response.json({
    color: "red",
    background: "#fff",
    name: "sarfraj",
    age: 23,
  });
});

server.get("/login", (req, res) => {
  const query = req.query;
  const name = req.query.name;
  const age = req.query.age;
  const color = req.query.color;
  //  res.json({name,age,color})
  res.json(query);
});


server.get("/school/:name/:city/:state", (req, res) => {
  let school = req.params;
  res.json(school);
});

server.post("/person", (req, res) => {
  let person = req.body;
  res.json(person);
});

server.get('/test',(req,res)=>{
  req.session.test ? req.session.test++:req.session.test =1;
  res.send(req.session.test.toString())
})

server.post('/login',passport.authenticate('local'),(req,res)=>{
  // if this function get called,authentication was successful.
  // req.user contains the authenticated user.
  res.redirect('/')
});



// server listen
server.listen(port, function () {
  console.log(`Server bind at port no:${port}`);
  console.log(`Server restart at at port no:${port}`);
});
