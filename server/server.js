const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const port=1338;
const {getAllBoats, getBoat, addBoat, search, deleteBoat}=require('./database.js')


// MIDDLEWARE--------

app.use(express.static(__dirname +'/../public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//logger
app.use( (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next()
})


// ROUTES--------

app.get('/api/test', (req, res)=>{
    res.send('Test funkar')
})

//hämta alla
app.get('/api/boats', (req,res)=>{
    console.log('GET /api/boats')
    //skickar in en funktion som parameter, i database.js heter parametern callback
    getAllBoats(dataOrError=>{
       res.send(dataOrError)
   });
})

//hämta på id-nummer
app.get('/api/boat', (req, res)=>{
    
    let id=req.query.searchParam
    getBoat(id, dataOrError=>{
       res.send(dataOrError) 
    })
   
})
//DELETE
app.delete('/api/boat', (req, res)=>{
    let id=req.query.id
    deleteBoat(id, dataOrError=>{
        res.send(dataOrError)
    })
})

//sök
app.get('/api/search', (req, res)=>{
   console.log("server.js, req.query: ", req.query)
    search(req.query, dataOrError=>{
       res.send(dataOrError) 
    })
})

//lägg till en ny båt
app.post('/api/addBoat', (req, res)=>{

    addBoat(req.body, dataOrError =>{
        res.send(dataOrError)
    })
   
})


//START WEBBSERVER
app.listen(port,()=>{
    console.log('Webserver is listening on port: '+ port)
})