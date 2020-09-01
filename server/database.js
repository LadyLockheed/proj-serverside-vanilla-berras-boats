const {MongoClient, ObjectID}=require('mongodb')
const url='mongodb://localhost:27017';
const databaseName='berrasBoats'
const collectioName='boats'


function getAllBoats(callback){
    get({}, callback)
}

function getBoat(id, callback){
    // console.log('I getboat funktion, id är : ', `${id}`)
    get({modelName:`${id}`}, callback)

}

function get( filter, callback) {
//För att kunna connecta med mongodb
    MongoClient.connect(
    url,
    {useUnifiedTopology:true},
    async (error, client)=>{
        //om anslutning misslyckas, returnera fel
        if(error){
            callback('ERROR! Kunde inte connecta. Attans.')
            return;//exit the callback function
        }
        //collectionobjektet ska man skicka queries till
        const col=client.db(databaseName).collection(collectioName);
        //dags att hämta alla båtar, måste göra om resultatet till en array
        //Query
        try{
            const cursor=await col.find(filter);
            const array=await cursor.toArray();
            callback(array);

        } catch(error){
            console.log('Query error: ', error.message);
            callback('ERROR med query'); 
        } finally{
            client.close();
        }
  
    })
    
}

module.exports={
    getAllBoats,
    getBoat,
    
}