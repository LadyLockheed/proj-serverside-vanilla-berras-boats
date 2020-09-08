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
    let sortKeys=document.querySelector('#sortKeys')
    //PUT update boat model
    let buttonUpdate=document.querySelector('.updateBoatButton')
    let inputModifyModel=document.querySelector('#inputModifyModel')
    let inputModifyPrice=document.querySelector('#inputModifyPrice')
    let inputModifyConstructionYear=document.querySelector('#inputModifyConstructionYear')
    let inputModifyImgUrl=document.querySelector('#inputModifyImgUrl')
    let inputId=document.querySelector('#inputId')
    let modifyBoatContainer=document.querySelector('.modifyBoat')
    //DELETE GET Restore database
    let buttonRestore=document.querySelector('.restoreButton')
    let restoreMsg=document.querySelector('.restoreMsg')

  


    //get all boats function
    async function getBoats(){
        console.log('i funktion getBoats')

        const response=await fetch ('/api/boats',{method:'GET'})
        const boatsObject=await response.json();
        console.log('script.js, getBoats: ', boatsObject)

        boatList.innerHTML='';
        boatsObject.forEach(boat=>{
            
            let image=document.createElement('img');
            image.className='boatImage';
           
            image.style.height='150px';
            image.style.width='200px';
            image.src=boat.url;

            let li=document.createElement('li')
            li.className='boat'
            li.innerHTML= `<strong>${boat.modelName}</strong> <br> Price: ${boat.price} <br> Construction-year: ${boat.constructionYear} <br> Id: ${boat._id}`
            let deleteButton=document.createElement('button')
            deleteButton.innerHTML='Delete'
            deleteButton.className='buttonDelete'
            deleteButton.id=boat._id
            deleteButton.addEventListener('click', async()=>{
 
                try {
                    const response=await fetch (`/api/boat?id=${deleteButton.id}`, {method:'DELETE'})
                    const deletedBoat=await response.json()
                    
                } catch(error){
                    console.log("Something went wrong while trying to get boats ", error.message)
                }
                getBoats();
            })
            let editButton=document.createElement('button')
            editButton.innerHTML='<a href="#modifyBoatSection">Edit</a>'
            editButton.className='editButton'
            editButton.id=boat._id
            editButton.addEventListener('click', async()=>{

                modifyBoatContainer.style='display:block';
                inputModifyModel.value=boat.modelName
                inputModifyPrice.value=boat.price
                inputModifyConstructionYear.value=boat.constructionYear
                inputModifyImgUrl.value=boat.url
                inputId.value=editButton.id
        
            })
            let div=document.createElement('div')
            div.className='buttonContainer'
            
         
            li.appendChild(image)
            boatList.appendChild(li)
            li.appendChild(div)
            div.appendChild(editButton)
            div.appendChild(deleteButton)
    
        })
    }

    //GET all boats
    buttonGetBoats.addEventListener('click', async()=>{
        console.log('i addeventlistener getboats')
        getBoats();
    })

    //PUT edit/update boat
    buttonUpdate.addEventListener('click', async()=>{
    
        const response= await fetch('/api/updateBoat', {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'put',
            body:JSON.stringify({
                updateName:inputModifyModel.value,
                updatePrice:inputModifyPrice.value,
                updateConstructionYear:inputModifyConstructionYear.value,
                boatId:inputId.value,
                imgUrl:inputModifyImgUrl.value
            })
        });
        const text=await response.json();
        console.log(text)
        getBoats();
        modifyBoatContainer.style='display:none'


    })

    //GET boat from id
    buttonFindBoat.addEventListener('click', async()=>{
      
        let inputParam=findBoatInput.value
  
        try{
            const response=await fetch (`/api/boat?searchParam=${inputParam}`,{method:'GET'})
            const boats=await response.json();
            const boat=boats[0];
           
            findBoatContainer.innerHTML='';
            let p=document.createElement('p');
            p.className='foundBoat';
            p.innerHTML=`Modell: ${boat.modelName} <br> Pris: ${boat.price}<br> Byggdes år: ${boat.constructionYear} <br> `
            findBoatContainer.appendChild(p)
            let image=document.createElement('img');
            image.className='boatImage';
            image.style.height='150px';
            image.style.width='150px';
           image.src=boat.url;
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
        let sortKey=sortKeys.value
      
        try{
       
            const response=await fetch (`/api/search?${selectedCategory}=${searchParam}&order=${sortKey}`,{method:'GET'})
            const results=await response.json();
           
            searchResultList.innerHTML='';
            results.forEach(result=>{
              
                let p=document.createElement('p')
                p.className='result'
                p.innerHTML= `${result.modelName} <br> Price: ${result.price} <br> Byggdes år: ${result.constructionYear}`
                searchResultList.appendChild(p)
        
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
      
        let originalDatabaseBoats=[{modelName:'Regalskeppet Vasa', constructionYear:1627, price:1000000, sailingBoat:'yes', motor:'no', url:'https://www.so-rummet.se/sites/default/files/nu_och_da/vasaskeppet-regalskeppet-vasa_0.jpg'}, {modelName:'Titanic', constructionYear:1911, price:60000000, sailingBoat:'no', motor:'yes', url:'https://historiskamedia.se/wp-content/uploads/2019/06/Titanic_sista-fotot.jpg'},{modelName:'Ostindiefararen Götheborg', constructionYear:2003, price:250000000, sailingBoat:'yes', motor:'yes', url:'https://mb.cision.com/Public/2889/9807569/97cc772d45b5d812_800x800ar.jpg'}, {modelName:'Polisbåt 39-9910',  constructionYear:2018, price:5000, sailingBoat:'no', motor:'yes', url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Polisb%C3%A5t_9910_M%C3%A4laren.jpg/420px-Polisb%C3%A5t_9910_M%C3%A4laren.jpg'}, {modelName:'Slice of Life', constructionYear:2001, price:30500, sailingBoat:'no', motor:'yes', url:'https://i.pinimg.com/originals/d1/b9/d1/d1b9d1fe61aed5fb2caf2dc503f745a2.jpg'}, {modelName:'Swiftships 35PB1208 E-1455', constructionYear:1975, price:420000, sailingBoat:'no', motor:'yes', url:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/160815-N-GP524-465.jpg/1200px-160815-N-GP524-465.jpg'},{modelName:'Pop pop boat', constructionYear:1975, price:100, sailingBoat:'no', motor:'yes', url:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Knatterboot.jpg/330px-Knatterboot.jpg'}, {modelName:'Havskajak', constructionYear:2020, price:5400, sailingBoat:'no', motor:'no', url:'https://stockholmkajak.se/pub_images/large/NordR_S_Yellow.jpg'},{modelName:'Orca', constructionYear:1975, price:55700, sailingBoat:'no', motor:'yes', url:'https://i.redd.it/6eq4mnbb3w821.jpg'}, {modelName:'Ubåt HMS Södermanland ', constructionYear:1988, price:8000, sailingBoat:'no', motor:'yes', url:'https://www.forsvarsmakten.se/imagevault/publishedmedia/z8ws1pihym1bknq4gtgy/DSC_0106.jpg'},{modelName:'Waterworld Trimaran', constructionYear:1995, price:11500, sailingBoat:'yes', motor:'no', url:'https://trienthusiasts.files.wordpress.com/2015/07/waterworld-trimaran-sailboat-31.jpg'}];
      
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