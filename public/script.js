window.addEventListener('load',()=>{
    //GET all boats
    let buttonGetBoats=document.querySelector('.getBoatsButton')
    let boatList=document.querySelector('.boatList')
    //GET spec. båt
    let buttonFindBoat=document.querySelector('.findBoatButton')
    let findBoatContainer=document.querySelector('.findBoatContainer')
    let findBoatInput=document.querySelector('#inputFindBoat')
    //POST new båt
    let inputModelName=document.querySelector('#inputModelName')
    let inputConstructionYear=document.querySelector('#inputConstructionYear')
    let inputPrice=document.querySelector('#inputPrice')
    let inputHasSail = document.getElementById('inputHasSail');
    let inputHasMotor = document.getElementById('inputHasMotor');
    let inputImgUrl=document.querySelector('#inputImgUrl')
    let buttonAddBoat=document.querySelector('.addBoatButton')
    let newBoatMsg=document.querySelector('.newBoat')
    //GET search
    let buttonSearch=document.querySelector('.searchButton')
    let inputSearchParam=document.querySelector('#searchInput')
    let searchResultList=document.querySelector('.searchResultList')
    let category=document.querySelector('#categorys')
    //DELETE
    let buttonDelete=document.querySelector('buttonDelete')
    //DELETE GET Restore database
    let buttonRestore=document.querySelector('.restoreButton')
    let restoreMsg=document.querySelector('.restoreMsg')



    //get all boats function
    async function getBoats(){

        const response=await fetch ('/api/boats',{method:'GET'})
        const boatsObject=await response.json();
        console.log('script.js, getBoats: ', boatsObject)

        boatList.innerHTML='';
        boatsObject.forEach(boat=>{
            
            let li=document.createElement('li')
            li.className='boat'
            li.innerHTML= `Modell: ${boat.modelName} <br> Pris: ${boat.price} <br> Byggdes år: ${boat.constructionYear} <br> Id: ${boat._id}`
            let button=document.createElement('button')
            button.innerHTML='Delete'
            button.className=buttonDelete
            button.id=boat._id
            button.addEventListener('click', async()=>{
 
                let boatID=button.id
                
                try {
                    const response=await fetch (`/api/boat?id=${boatID}`, {method:'DELETE'})
                    const deletedBoat=await response.json()
                    
                } catch(error){
                    console.log("Something went wrong while trying to get boats ", error.message)
                }
                getBoats();
            })
            //TODO TEsta att lägga till bild från url i sök båt på id istället, då jobbar jag bara med en båt.
            // let imageDiv=document.createElement('div')
            // imageDiv.className='boatImage'
            // imageDiv.style.backgroundImage="url('boat.url')";
            // imageDiv.style.height='150px';
            // imageDiv.style.width='150px'
            boatList.appendChild(li)
            li.appendChild(button)
            // li.appendChild(imageDiv)
           
        })
    }


    //GET all boats
    buttonGetBoats.addEventListener('click', async()=>{
        getBoats();
    })

    //GET boat from id
    buttonFindBoat.addEventListener('click', async()=>{
      
        let inputParam=findBoatInput.value
  
        try{
            const response=await fetch (`/api/boat?searchParam=${inputParam}`,{method:'GET'})
            const boats=await response.json();
            const boat=boats[0];
            console.log(boat)
            console.log(boat.url)
           
            findBoatContainer.innerHTML='';
            let p=document.createElement('p');
            p.className='foundBoat';
            p.innerHTML=`Modell: ${boat.modelName} <br> Pris: ${boat.price}<br> Byggdes år: ${boat.constructionYear} <br> `
            findBoatContainer.appendChild(p)
            let image=document.createElement('img');
            image.className='boatImage';
            image.style.height='150px';
            image.style.width='150px';
            image.setAttribute("src", "boat.url")
            findBoatContainer.appendChild(image)


        } catch(error){
            console.log('Something went wrong while getting boat by id: ', error.message)
            findBoatContainer.innerHTML='';
            let p=document.createElement('p');
            p.className='findBoat';
            p.innerHTML='Sorry, cant find the boat you are looking for. Try with another ID-number.'
            findBoatContainer.appendChild(p)

        }
    
    })

    //GET search
    buttonSearch.addEventListener('click', async()=>{

        let searchParam=inputSearchParam.value
        let selectedCategory=category.value
        
        try{
       
            const response=await fetch (`/api/search?${selectedCategory}=${searchParam}`,{method:'GET'})
            const results=await response.json();
           
            searchResultList.innerHTML='';
            results.forEach(result=>{
              
                let li=document.createElement('li')
                li.className='result'
                li.innerHTML= `Modell: ${result.modelName} <br> Price: ${result.price} <br> Byggdes år: ${result.constructionYear} <br> Id: ${result._id}`
                searchResultList.appendChild(li)
        
            })

        }
        catch(error){
            console.log('Something went wrong while searching: ', error.message)
        }
       
    })

    
    //POST add boat
    buttonAddBoat.addEventListener('click', async()=>{
        
        let hasSail='no';
        let hasMotor='no';
        if (inputHasSail.checked){
            hasSail='yes'
        }
        if(inputHasMotor.checked){
            hasMotor='yes'
        }
       
        let newBoat={modelName:inputModelName.value, constructionYear:Number(inputConstructionYear.value), price:Number(inputPrice.value), sailingBoat:hasSail, motor:hasMotor, url:inputImgUrl.value }
        
        //gör om datan till string
        const response= await fetch('/api/addBoat', {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(newBoat)
        });
        const text=await response.json();
        console.log(text)

        newBoatMsg.innerHTML='Success. You added a new boat.'

        // console.log('Script, data: ',text)
        // let stringdata=JSON.stringify(data)
        // console.log('Script: stringifyad data: ', stringdata)

    })


    //POST restore database
    buttonRestore.addEventListener('click', async()=>{
      
        let originalDatabaseBoats=[{modelName:'Regalskeppet Vasa', constructionYear:1627, price:1000000, sailingBoat:'yes', motor:'no', url:'https://www.so-rummet.se/sites/default/files/nu_och_da/vasaskeppet-regalskeppet-vasa_0.jpg'}, {modelName:'Titanic', constructionYear:1911, price:60000000, sailingBoat:'no', motor:'yes', url:'https://historiskamedia.se/wp-content/uploads/2019/06/Titanic_sista-fotot.jpg'},{modelName:'Ostindiefararen Götheborg', constructionYear:2003, price:250000000, sailingBoat:'yes', motor:'yes', url:'https://www.nyteknik.se/Nyhetsbrev_compost/Nyhetsbrev_Allm_nna_Compost/n7dxpy-gotheborg-seglar-700-394-ny-teknik.jpg/binary/original/gotheborg-seglar-700-394-ny-teknik.jpg'}, {modelName:'Ohlsson 22',  constructionYear:1989, price:5000, sailingBoat:'yes', motor:'no', url:'https://i.blocketcdn.se/pictures/0380537654.jpg'}, {modelName:'Slice of Life', constructionYear:2001, price:30500, sailingBoat:'no', motor:'yes', url:'https://i.pinimg.com/originals/d1/b9/d1/d1b9d1fe61aed5fb2caf2dc503f745a2.jpg'}, {modelName:'Coronet 32 Oceanfarer', constructionYear:1975, price:420000, sailingBoat:'no', motor:'yes', url:'https://i.blocketcdn.se/pictures/5093741039.jpg'},{modelName:'Nordkapp Avant 705', constructionYear:2020, price:729000, sailingBoat:'no', motor:'yes', url:'https://i.blocketcdn.se/pictures/9081878214.jpg'}, {modelName:'Havskajak', constructionYear:1999, price:5400, sailingBoat:'no', motor:'no', url:'https://i.blocketcdn.se/pictures/0945062804.jpg'},{modelName:'Orca', constructionYear:1975, price:55700, sailingBoat:'no', motor:'yes', url:'https://i.redd.it/6eq4mnbb3w821.jpg'}, {modelName:'Jolle Walker bay 8', constructionYear:2005, price:8000, sailingBoat:'yes', motor:'no', url:'https://i.blocketcdn.se/pictures/8840867421.jpg'},{modelName:'Optimistjolle McLaughlin', constructionYear:2001, price:11500, sailingBoat:'yes', motor:'no', url:'https://i.blocketcdn.se/pictures/9786249019.jpg'}];
      
        const response= await fetch('/api/resetDatabase', {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(originalDatabaseBoats)
        });
        const text=await response.json();

        restoreMsg.innerHTML="Database cleared and restored"
       

      

    })

   




})