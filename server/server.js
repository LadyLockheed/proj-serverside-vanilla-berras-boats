const express=require('express')
const app=express();
const port=1337;



//ROUTES
app.get('/api/boats', (req,res)=>{
    console.log('GET /api/boats')
    res.send('GET /api/boats')
})





//START WEBBSERVER
app.listen(port,()=>{
    console.log('Webserver is listening on port: '+ port)
})