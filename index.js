 const express = require('express');

 const server = express();
 const PORT = 8080

 server.use(express.static('public'))


// GET localHost:8080/hompage

server.get('/homepage')

 server.listen(PORT,function(){
    console.log(`Server bind at port no:${PORT}`);

 })