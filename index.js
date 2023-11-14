const express = require('express');

const server = express();

server.use(express.static('public'));

// GET localhost:8080/homepage
server.get('/homepage',(request,response)=>{
    // response.send('<h1>Hello</h1>')
    response.json({name:"sarfraj abbasi"})
})

server.listen(8080,()=>{
    console.log("server started");
})

