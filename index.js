require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session") 

// bcrypt setup
const bcrypt = require('bcrypt');
const saltRounds = 10;

// mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import passport and passport-strategy require
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

// same code but id lenge isme
passport.deserializeUser((id,done)=>{
  // agar user mil jata ha database ma toh usee done ma bhej dete ha
  User.findById(id,(err,user)=>{
    if(err)return done(null,false)
    // isme user hume mil chuka ha id se
    return done(null,user)
  })
})


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

server.get('/test',isAuthenticated,(req,res)=>{
  req.session.test ? req.session.test++:req.session.test =1;
  res.send(req.session.test.toString() + "" + req.user.username)
})

// logout:-
server.post('/logout',(req,res)=>{
  // ye logout method passport hi create karega request ma,isse res.session tut jata ha or hume index page dikega
  req.logOut();
  res.send("logged out")
})

function isAuthenticated(req,res,done){
  if(req.user){
    // done mean next middleware ko call karna
    return done()
  }
  // app authenticate nahi ho
  res.redirect("/")
}
// Register:- 
server.post('/register',(req,res,done)=>{

const salt = bcrypt.genSaltSync(saltRounds);

User.findOne({username:username},(err,user)=>{
  if(err)done(null,false);
  else if(user)res.redirect('/');
  else{
    User.create({username:req.body.username,password:req.body.password},(err,user)=>{
      if(err){done(null,false)};
      done(null,user)
    })
  }
})

},passport.authenticate('local'),(req,res)=>{
  // if this function get called,authentication was successful.
  // req.user contains the authenticated user.
  // req.user:-passport apne ap session information isme bhej deta ha or isme data agya to sucessful ho gyi authentication.
  res.json(req.user)
});

// Login:- use passport.authenticate(strategy) 
server.post('/login',passport.authenticate('local'),(req,res)=>{
  // if this function get called,authentication was successful.
  // req.user contains the authenticated user.
  // req.user:-passport apne ap session information isme bhej deta ha or isme data agya to sucessful ho gyi authentication.
  res.json(req.user)
});



// server listen
server.listen(port, function () {
  console.log(`Server bind at port no:${port}`);
  console.log(`Server restart at at port no:${port}`);
});
