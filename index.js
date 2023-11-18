require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session") 
const port = process.env.PORT;

const server = express();

// morgan
server.use(logger());

// bodyparser(req.body)
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

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

server.listen(port, function () {
  console.log(`Server bind at port no:${port}`);
  console.log(`Server restart at at port no:${port}`);
});
