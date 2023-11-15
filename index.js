 const express = require('express');

 const server = express();
 const PORT = 8080

 server.use(express.static('public'))

 server.listen(PORT,function(){
    console.log(`Server bind at port no:${PORT}`);

 })