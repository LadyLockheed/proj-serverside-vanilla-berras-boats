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
 
    let inputId=document.querySelector('#inputIdNumber')
 

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

        let inputParam=findBoatInput.value
        console.log('Inputparam är: ', inputParam)
       
        // let inputParam='Titanic'
        
        const response=await fetch (`/api/boat?searchParam=${inputParam}`,{method:'GET'})

        const boat=await response.json();
        console.log('Hämtade båt: ', boat)
        
        //! Varför blir det en lista med ett objekt, så jag måste in i listan.

        findBoatContainer.innerHTML='';
        let p=document.createElement('p')
        p.className='findBoat'
        p.innerHTML= `Modell: ${boat[0].modelName} <br> Pris: ${boat[0].price}<br> Byggdes år: ${boat[0].constructionYear} <br> `
        findBoatContainer.appendChild(p)

            
        
      
 
    })

    // buttonAddBoat.addEventListener('click', async()=>{
       
        
    //     //om egenskapen har samma namn som variabeln kan man förenkla och bara ha med en av dom.
    //     let newBoat={modelName:'Ockelbo DC 21', constructionYear:1989, price:99000, sailingBoat:'no', motor:'yes'}
        
    //     const response= await fetch('/addBoat', {
    //         method:'POST', 
    //         headers:{'Content-Type':'application/json'},
    //         body:JSON.stringify(newBoat)
    //     });
    //     const text=await response.text();
    //     console.log(text)

    // })




})