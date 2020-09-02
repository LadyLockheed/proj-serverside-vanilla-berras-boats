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
    let inputId=document.querySelector('#inputIdNumber')
    //GET search name
    let buttonSearch=document.querySelector('.searchButton')
 

    buttonGetBoats.addEventListener('click', async()=>{
       
        const response=await fetch ('/api/boats',{method:'GET'})
        const boatsObject=await response.json();
        console.log('Fetch hämtade: ', boatsObject)

        boatList.innerHTML='';
        boatsObject.forEach(boat=>{
            let li=document.createElement('li')
            
            li.className='boat'
            li.innerHTML= `Modell: ${boat.modelName} <br> Pris: ${boat.price}`
            // let button=document.createElement('button')

            //TODO Kan jag göra nåt med dessa knappar? Tex ta bort valt element?
            // button.innerHTML=boat.modelName
            // button.className=boat._id
            boatList.appendChild(li)
            // boatList.appendChild(button)
           
        })

    })


    buttonFindBoat.addEventListener('click', async()=>{
        //TODO lägg in alternativ att man ska kunna söka på id också, kan då ha ett färdigt id som value='idnummer så står det färdigt i inputfältet.
     
        let inputParam=findBoatInput.value
     
        console.log(`/api/boat?searchParam=${inputParam}`)
        
        try{
            const response=await fetch (`/api/boat?searchParam=${inputParam}`,{method:'GET'})
            const boat=await response.json();
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
 
        // let inputParam=findBoatInput.value
        let inputParam='Orca'
        console.log(`/api/search?searchParam=${inputParam}`)
        
        const response=await fetch (`/api/search?searchParam=${inputParam}`,{method:'GET'})

        const boat=await response.json();
        console.log('Hämtade båt: ', boat)
      

    })


    // buttonSearch.addEventListener('click', async() =>{

   

    //     let inputParam="Orca"
    //     console.log(`/api/search?searchParam=${inputParam}`)

    //     const response=await fetch (`/api/search?searchParam=${inputParam}`,{method:'GET'})

    //     const foundThis=await response.json();
    //     console.log('Script: Hämtade båt: ', foundThis)


    // })

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
        const text=await response.text();

        newBoatMsg.innerHTML='Du la till en ny båt.'


        // console.log('Script, data: ',text)
        // let stringdata=JSON.stringify(data)
        // console.log('Script: stringifyad data: ', stringdata)

    })

   




})