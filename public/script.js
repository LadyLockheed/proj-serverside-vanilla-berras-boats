window.addEventListener('load',()=>{
    //GET all boats
    let buttonGetBoats=document.querySelector('.getBoatsButton')
    let boatList=document.querySelector('.boatList')
    //GET spec. båt
    let buttonFindBoat=document.querySelector('.findBoatButton')
    let findBoatContainer=document.querySelector('.findBoatContainer')
    let findBoatInput=document.querySelector('#inputFindBoat')
    //POST ny båt
    let inputModelName=document.querySelector('#inputModelName')
    let inputConstructionYear=document.querySelector('#inputConstructionYear')
    let inputPrice=document.querySelector('#inputPrice')
    let inputHasSail = document.getElementById('inputHasSail');
    let inputHasMotor = document.getElementById('inputHasMotor');
    let buttonAddBoat=document.querySelector('.addBoatButton')
    let newBoatMsg=document.querySelector('.newBoat')
    //GET search
    let buttonSearch=document.querySelector('.searchButton')
    let inputSearchParam=document.querySelector('#searchInput')
    let searchResultList=document.querySelector('.searchResultList')
    let searchCategorys = document.querySelectorAll('input[name=category]');
    let category=document.querySelector('#categorys')
    //DELETE
    // let inputDelete=document.querySelector('#boatDelete')
    // let buttonDelete=document.querySelector('.deleteButton')
    let buttonDelete=document.querySelector('buttonDelete')

    //DELETE
    
    
    async function getBoats(){

        const response=await fetch ('/api/boats',{method:'GET'})
        const boatsObject=await response.json();
        console.log('Fetch hämtade: ', boatsObject)

        boatList.innerHTML='';
        boatsObject.forEach(boat=>{
            
            let li=document.createElement('li')
            li.className='boat'
            li.innerHTML= `Modell: ${boat.modelName} <br> Pris: ${boat.price} <br> Id: ${boat._id}`
            let button=document.createElement('button')
            button.innerHTML='Delete'
            button.className=buttonDelete
            button.id=boat._id
            button.addEventListener('click', async()=>{
 
                let deleteBoat=button.id
                
                try {
                    const response=await fetch (`/api/boat?id=${deleteBoat}`, {method:'DELETE'})
                    const deletedBoat=await response.json()
                    console.log('Deleted boat: ', deletedBoat)
                } catch(error){
                    console.log("Nånting gick fel vid delete: ", error.message)
                }
                getBoats();
            })
            boatList.appendChild(li)
            li.appendChild(button)
           
        })
    }



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

    //GET search
    buttonSearch.addEventListener('click', async()=>{

        console.log(category.value)

 
        let searchParam=inputSearchParam.value
        let selectedCategory=category.value

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

    

    //POST add boat
    buttonAddBoat.addEventListener('click', async()=>{
        
        let newModelName=inputModelName.value
        let newConstructionYear=Number(inputConstructionYear.value)
        let newPrice=Number(inputPrice.value)
        let hasSail='yes';
        let hasMotor='yes';

        if (!inputHasSail.checked){
            hasSail='no'
        }
        if(!inputHasMotor.checked){
            hasMotor='no'
        }
    
        console.log(newModelName)
        console.log(newConstructionYear)
        console.log(newPrice)
        console.log(hasSail)
        console.log(hasMotor)
        let newBoatTest={modelName:inputModelName.value, constructionYear:Number(inputConstructionYear.value), price:Number(inputPrice.value), sailingBoat:hasSail, motor:hasMotor}
        console.log(newBoatTest)

        //om egenskapen har samma namn som variabeln kan man förenkla och bara ha med en av dom.
        let inputData={modelName:'Ockelbo DC 21', constructionYear:1989, price:99000, sailingBoat:'no', motor:'yes'}
        //gör om datan till string
        let newBoat=JSON.stringify(newBoatTest)
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