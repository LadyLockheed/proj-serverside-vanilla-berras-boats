const express=require('express')
const app=express();
const bodyParser=require('body-parser')
// const port=1338;
//för cloud atlas
const port = process.env.PORT || 1338
const {getAllBoats, getBoat, addBoat, search, deleteBoat, resetDatabase, updateBoat}=require('./database.js')

console.log('i server.js')


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

// GET hämta alla
app.get('/api/boats', (req,res)=>{
    console.log('server.js, get all boats')
    //skickar in en funktion som parameter, i database.js heter parametern callback
    getAllBoats(dataOrError=>{
       
       res.send(dataOrError)
   });
})

// GET hämta på id-nummer
app.get('/api/boat', (req, res)=>{
    let id=req.query.searchParam
    getBoat(id, dataOrError=>{
       res.send(dataOrError) 
    })
   
})

// GET search
app.get('/api/search', (req, res)=>{
   
     search(req.query, dataOrError=>{
        res.send(dataOrError) 
     })
 })

// DELETE boat on id
app.delete('/api/boat', (req, res)=>{
    let id=req.query.id
    deleteBoat(id, dataOrError=>{
        res.send(dataOrError)
    })
})

// POST lägg till en ny båt
app.post('/api/addBoat', (req, res)=>{

    addBoat(req.body, dataOrError =>{
        res.send(dataOrError)
    })
   
})

// POST reset database
app.post('/api/resetDatabase', (req, res)=>{
    resetDatabase(req.body, dataOrError=>{
        res.send(dataOrError)
    })
})

// PUT update boat
app.put('/api/updateBoat', (req,res)=>{
   
    updateBoat(req.body, dataOrError=>{
        res.send(dataOrError)
    })
})




//START WEBBSERVER
app.listen(port,()=>{
    console.log('Webserver is listening on port: '+ port)
})