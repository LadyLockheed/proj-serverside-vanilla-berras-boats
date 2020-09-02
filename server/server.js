const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const port=1338;
const {getAllBoats, getBoat, addBoat}=require('./database.js')


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

//hämta en specifik
app.get('/api/boat', (req, res)=>{
    
    let id=req.query.searchParam
    getBoat(id, dataOrError=>{
       res.send(dataOrError) 
    })
   
})

//sök
app.get('/api/search', (req, res)=>{
    // console.log('Queryn är: ', req.query.searchParam)
    // res.send('search funkar!')
    let id=req.query.searchParam
    getBoat(id, dataOrError=>{
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