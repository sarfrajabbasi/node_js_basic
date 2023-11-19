require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session") 

// mongoose
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema;

// passport and passport-strategy
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


// server listen
server.listen(port, function () {
  console.log(`Server bind at port no:${port}`);
  console.log(`Server restart at at port no:${port}`);
});
