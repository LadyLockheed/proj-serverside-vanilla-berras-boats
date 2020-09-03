const {MongoClient, ObjectID}=require('mongodb')
const url='mongodb://localhost:27017';
const databaseName='berrasBoats'
const collectionName='boats'

        


function getAllBoats(callback){
    get({}, callback)
}

function search(query, callback){

    const filter={}
   
    if(query.word){
       
        filter.modelName={ "$regex": `.*${query.word}.*`,"$options":"i"};
       
    }
    if(query.maxprice){
        
       let numberPrice=Number(query.maxprice)
       filter.price={$lt: parseFloat(numberPrice)}

    }

    MongoClient.connect(
        url,
        {useUnifiedTopology:true},
        async(error, client)=>{
            if(error){
                callback('Error, could not connect')
                return;
            }
            const col=client.db(databaseName).collection(collectionName)
            try{
                console.log('I database, try. Filter: ', filter)
                const cursor=await col.find(filter);
                const array=await cursor.toArray();
                callback(array);
            
            } catch(error){
                console.log('Query error: ', error.message);
                callback('ERROR med query'); 
            } finally{
                
                client.close();
            }
        }
    )

}

function getBoat(id, callback){
    // get({ _id: new ObjectID(id) }, array => callback( array[0] ))
    get({_id: new ObjectID(id)},callback)
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
            const col=client.db(databaseName).collection(collectionName) //collectionobjektet ska man skicka queries till
            //dags att hämta alla båtar, måste göra om resultatet till en array
    
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



function addBoat(requestBody, callback){
    MongoClient.connect(
        url,
        {useUnifiedTopology:true},
        async (error, client)=>{
            if (error){
                callback('Error, could not connect');
                return;
            }
            const col=client.db(databaseName).collection(collectionName) //collectionobjektet ska man skicka queries till
            try{
                const result=await col.insertOne(requestBody)
                callback({
                    result:result.result,
                    ops:result.ops
                })
            } catch(error){
                console.error('addHat error: '+ error.message)
                callback('Error, query error')
            } finally{
                client.close;
            }
       
        }
    )
    
}



module.exports={
    getAllBoats,
    getBoat,
    addBoat,
    search
    
}