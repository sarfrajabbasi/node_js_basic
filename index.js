require('dotenv').config(); 
 const express = require('express');

 const server = express();
 const PORT = 8080

 server.use(express.static('public'))


// GET localHost:8080/hompage

server.get('/homepage',(request,response)=>{
    // response.send('<h1>hello node js here</h1>')
    // response.send("<h1>Hello</h1>")
    response.json({})
})

server.get("/about",(request,response)=>{
    response.json({
        color:"red",
        background:"#fff",
        name:"sarfraj",
        age:23,

    });

})

 server.listen(PORT,function(){
    console.log(`Server bind at port no:${PORT}`);
    b
 })

