const {MongoClient}=require('mongodb')
const url='mongodb://localhost:27017';
//TODO kolla så att databasen stämmer
const databaseName='berrasBoats'
const collectioName='boats'

function testThisShit(){
    return 'funktionen testthisshit verkar funka'
}


function getAllBoats(){
//För att kunna connecta med mongodb
    MongoClient.connect(url,
        {useUnifiedTopology:true},
        (error, client)=>{
            //om anslutning misslyckas, returnera fel
            if(error){
                callback('ERROR! Kunde inte connecta. Attans.')
                return;//exit the callback function
            }
            try{
                //collectionobjektet ska man skicka queries till
                const col=client.db(databaseName).collection(collectioName)
                //dags att hämta alla båtar, måste göra om resultatet till en array
                //Query
                col.find().toArray((error, docs)=>{
                    if(error){
                        callback('ERROR med query') 
                     
                    } else{
                        //om allt går bra returneras detta
                        callback(docs);
                    }
                

              
                })

            }finally{

                client.close();
            }
           
        })
   
}

module.exports={
    getAllBoats,
    testThisShit
}