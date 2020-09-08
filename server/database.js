const {MongoClient, ObjectID}=require('mongodb')
// const url='mongodb://localhost:27017';
// const url='mongodb+srv://berrasBoatsDatabase:berrasBoatsServerside@karinfrontend.foi9f.gcp.mongodb.net/berrasBoatsDatabase?retryWrites=true&w=majority'
const url='mongodb+srv://berrasBoatsDatabase:berrasBoatsServerside@karinfrontend.foi9f.gcp.mongodb.net/berrasBoatsDatabase?retryWrites=true&w=majority'

// 'mongodb+srv://neda:7713601nj@cluster0.pn5gs.mongodb.net/goteborgaren_bera?retryWrites=true&w=majority'
const databaseName='berrasBoats'
const collectionName='boats'
console.log('I database')

function updateBoat(requestBody, callback){
    console.log('i database updateboat, requestBody', requestBody)
    id={_id:new ObjectID(requestBody.boatId)}

    MongoClient.connect(
    url,
    {useUnifiedTopology:true},
    async(error, client)=>{
        if (error){
            callback('Error, could not connect.')
            return;
        }
        const col=client.db(databaseName).collection(collectionName)
        try{

            const result=await col.updateOne(id,{$set:{modelName:requestBody.updateName, price:requestBody.updatePrice, constructionYear:requestBody.updateConstructionYear, url:requestBody.imgUrl}})
                callback({
                    result:result.result,
                    ops:result.ops
                })

        } catch(error){
            console.log('Query error: ', error.message);
            callback('ERROR med query'); 
        } finally{
            client.close();
        }
    })

}


function get( filter, callback) {
    //För att kunna connecta med mongodb
    MongoClient.connect(
    url,
    {useUnifiedTopology:true},
    async (error, client)=>{
        //om anslutning misslyckas, returnera fel
        if(error){
            console.log('database i if: ', error.message, error)
            callback('ERROR! Kunde inte connecta. Attans.', error.message)
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

//GET all boats
function getAllBoats(callback){
    get({}, callback)
}

//Hämta båt på id
function getBoat(id, callback){
    // get({ _id: new ObjectID(id) }, array => callback( array[0] ))
    get({_id: new ObjectID(id)},callback)
}


//DELETE boat
function deleteBoat(id, callback){
    
    let filter={_id:new ObjectID(id)}

      MongoClient.connect(
        url,
        {useUnifiedTopology:true},
        async (error, client)=>{
            
            if(error){
                callback('ERROR! Kunde inte connecta. Attans.')
                return;
            }
            const col=client.db(databaseName).collection(collectionName)
    
            try{
                const result=await col.deleteOne(filter);
                callback(result);
    
            } catch(error){
                console.log('Query error: ', error.message);
                callback('ERROR med query'); 
            } finally{
                client.close();
            }
      
        })
    
}

//SÖK
function search(query, callback){

    const filter={}
    let sortKey={}
    
    if(query.order=='name_asc'){
       sortKey={modelName:1}
    }
    if(query.order=='name_desc'){
        sortKey={modelName:-1}
    }
    if(query.order=='lowprice'){
        sortKey={price:1}
    }
    if(query.order=='oldest'){
        sortKey={constructionYear:1}
    }
    if(query.order=='newest'){
        sortKey={constructionYear:-1}
    }
   
    if(query.word){

        filter.modelName={ "$regex": `.*${query.word}.*`,"$options":"i"};  
    }
    if(query.maxprice){

       filter.price={$lt: parseFloat(query.maxprice)}
    }
    if(query.madebefore){
        
        filter.constructionYear={$lt:Number(query.madebefore)}
    }
    if(query.madeafter){

        filter.constructionYear={$gt:Number(query.madeafter)}
    }
    if(query.is_sail){
        filter.sailingBoat=query.is_sail;
    }
    if(query.has_motor){

        filter.motor=query.has_motor;
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
                
                const cursor=await col.find(filter).sort(sortKey).limit(5);
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


//POST
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

function resetDatabase(requestBody, callback){

    MongoClient.connect(
        url,
        {useUnifiedTopology:true},
        async (error, client)=>{
            if (error){
                callback('Error, could not connect');
                return;
            }

            const empty=client.db(databaseName).collection(collectionName)
            try{
                empty.drop()
                const col=client.db(databaseName).collection(collectionName)
                const result=await col.insertMany(requestBody)
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
    search,
    deleteBoat,
    resetDatabase,
    updateBoat
    
}