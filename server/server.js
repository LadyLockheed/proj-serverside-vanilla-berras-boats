const express=require('express')
const app=express();
const port=1338;
const {getAllBoats}=require('./database.js')
const {testThisShit}=require('./database.js')


let boatList=[
    {
        modelName:'Regalskeppet Vasa', constructionYear:1627, 
        price:1000000,
        sailingBoat:'yes',
        motor:'no'
    },
    {
        modelName:'Titanic',
        constructionYear:1911,
        price:60000000,
        sailingBoat:'no',
        motor:'yes'
    }
]

// ROUTES
app.get('/api/boats', (req,res)=>{
    console.log('GET /api/boats')
    //skickar in en funktion som parameter, i database.js heter parametern callback
    getAllBoats(dataOrError=>{
       res.send(dataOrError)
   });
})

app.get('/api/test',(req,res)=>{
    console.log('get test')

        let data=testThisShit();
        res.send(data)
})

app.get('/api/testBoats', (req,res)=>{
    console.log('GET testBoats')
    res.send(boatList)
})





//START WEBBSERVER
app.listen(port,()=>{
    console.log('Webserver is listening on port: '+ port)
})