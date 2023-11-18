require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT;

const server = express();

server.use(logger());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());
server.use((req, res, next) => {
  console.log(req.ip, req.method, req.path);
  next();
});
server.use(express.static(process.env.STATIC_FOLDER));

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

server.listen(port, function () {
  console.log(`Server bind at port no:${port}`);
  console.log(`Server restart at at port no:${port}`);
});
