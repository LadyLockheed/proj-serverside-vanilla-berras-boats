window.addEventListener('load',()=>{
    //GET all boats
    let buttonGetBoats=document.querySelector('.getBoatsButton')
    let boatList=document.querySelector('.boatList')
    //GET spec. båt
    let buttonFindBoat=document.querySelector('.findBoatButton')
    let findBoatContainer=document.querySelector('.findBoatContainer')
    let findBoatInput=document.querySelector('#inputFindBoat')
    //POST ny båt
    let buttonAddBoat=document.querySelector('.addBoatButton')
    let newBoatMsg=document.querySelector('.newBoat')
    
    //GET search
    let buttonSearch=document.querySelector('.searchButton')
    let inputSearchParam=document.querySelector('#searchInput')
    let searchResultList=document.querySelector('.searchResultList')
    let searchCategorys = document.querySelectorAll('input[name=category]');
    //DELETE
    let inputDelete=document.querySelector('#boatDelete')
    let buttonDelete=document.querySelector('.deleteButton')
    
   

 

    buttonGetBoats.addEventListener('click', async()=>{
       
        const response=await fetch ('/api/boats',{method:'GET'})
        const boatsObject=await response.json();
        console.log('Fetch hämtade: ', boatsObject)

        boatList.innerHTML='';
        boatsObject.forEach(boat=>{
            let li=document.createElement('li')
            
            li.className='boat'
            li.innerHTML= `Modell: ${boat.modelName} <br> Pris: ${boat.price} <br> Id: ${boat._id}`
            // let button=document.createElement('button')

            //TODO Kan jag göra nåt med dessa knappar? Tex ta bort valt element?
            // button.innerHTML=boat.modelName
            // button.className=boat._id
            boatList.appendChild(li)
            // boatList.appendChild(button)
           
        })

    })


    buttonFindBoat.addEventListener('click', async()=>{
      
        let inputParam=findBoatInput.value
       
     
        // console.log(`/api/boat?searchParam=${inputParam}`)
        
        try{
            const response=await fetch (`/api/boat?searchParam=${inputParam}`,{method:'GET'})
            const boats=await response.json();
            const boat=boats[0];
            console.log('Hämtade båt: ', boat)

            findBoatContainer.innerHTML='';
            let p=document.createElement('p');
            p.className='findBoat';
            p.innerHTML=`Modell: ${boat.modelName} <br> Pris: ${boat.price}<br> Byggdes år: ${boat.constructionYear} <br> `
            findBoatContainer.appendChild(p)
        } catch(error){
            console.log('Kunde inte hämta nånting')
            findBoatContainer.innerHTML='';
            let p=document.createElement('p');
            p.className='findBoat';
            p.innerHTML='Tyvärr finns inte båten du letade efter.'
            findBoatContainer.appendChild(p)

        }
   
        
    })


    buttonSearch.addEventListener('click', async()=>{
 
        let searchParam=inputSearchParam.value
        let selectedCategory;
        for (const category of searchCategorys){
            if(category.checked){
                selectedCategory=category.value
            }
        }

        try{
       
            const response=await fetch (`/api/search?${selectedCategory}=${searchParam}`,{method:'GET'})
            const results=await response.json();
            console.log('Hämtat resultat: ', results)

            searchResultList.innerHTML='';
            results.forEach(result=>{
              
                let li=document.createElement('li')
                li.className='result'
                li.innerHTML= `Modell: ${result.modelName} <br> Price: ${result.price} <br> Id: ${result._id}`
                searchResultList.appendChild(li)
        
            })

        }
        catch(error){
            console.log('Nånting blev fel under sökningen: ', error.message)
        }
       
    })

    buttonDelete.addEventListener('click', async()=>{
       
        let deleteBoat=inputDelete.value
        console.log(deleteBoat)
        //TODO göra en fetch med DELETE
        //TODO i server.js göra en route som tar req.query och skickar den samt callback. Glöm ej att den ska heta app.delete
        //TODO i server.js importera funktionen från database.
        //TODO i database, skapa funktion för att ta bort. 
        //TODO Använd deleteOne
    })


    buttonAddBoat.addEventListener('click', async()=>{
   
        //om egenskapen har samma namn som variabeln kan man förenkla och bara ha med en av dom.
        let inputData={modelName:'Ockelbo DC 21', constructionYear:1989, price:99000, sailingBoat:'no', motor:'yes'}
        //gör om datan till string
        let newBoat=JSON.stringify(inputData)
        console.log('Script, newBoat: ',newBoat)

        const response= await fetch('/api/addBoat', {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'POST',
            body:newBoat
        });
        const text=await response.json();
        console.log(text)

        newBoatMsg.innerHTML='Du la till en ny båt.'


        // console.log('Script, data: ',text)
        // let stringdata=JSON.stringify(data)
        // console.log('Script: stringifyad data: ', stringdata)

    })

   




})