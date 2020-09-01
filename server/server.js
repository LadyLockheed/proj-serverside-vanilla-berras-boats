const express=require('express')
const app=express();
const port=1338;
const {getAllBoats, getBoat}=require('./database.js')
const {testThisShit}=require('./database.js')

// MIDDLEWARE

app.use(express.static(__dirname +'/../public'))

app.use( (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next()
})


// ROUTES
app.get('/api/boats', (req,res)=>{
    console.log('GET /api/boats')
    //skickar in en funktion som parameter, i database.js heter parametern callback
    getAllBoats(dataOrError=>{
       res.send(dataOrError)
   });
})


app.get('/api/boat', (req, res)=>{
    
    let id=req.query.searchParam
    console.log('i appgetboat, id är: ', id)
    getBoat(id, dataOrError=>{
    console.log('i app.get.boat: '+ dataOrError)
       res.send(dataOrError) 
    })
    // let model=req.query.searchParam
   
    // res.send(model)
    
    
})






//START WEBBSERVER
app.listen(port,()=>{
    console.log('Webserver is listening on port: '+ port)
})