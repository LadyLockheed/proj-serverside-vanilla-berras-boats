window.addEventListener('load',()=>{
    //GET all boats
    let buttonGetBoats=document.querySelector('.getBoatsButton')
    let boatList=document.querySelector('.boatList')
    //POST ny båt
    let buttonAddBoat=document.querySelector('.addBoatButton')
    //GET spec. båt
    let buttonFindBoat=document.querySelector('.findBoatButton')
    let inputId=document.querySelector('#inputIdNumber')
 

    


    buttonGetBoats.addEventListener('click', async()=>{
       
        const response=await fetch ('/api/boats',{method:'GET'})
        const boatsObject=await response.json();
        console.log('Fetch hämtade: ', boatsObject)

        boatList.innerHTML='';
        boatsObject.forEach(boat=>{
            let li=document.createElement('li')
            li.className='boat'
            li.innerHTML= boat.modelName
            boatList.appendChild(li)

            li.innerHTML= `Modell: ${boat.modelName} <br> Pris: ${boat.price}`
        })


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

    // buttonFindBoat.addEventListener('click', async()=>{

    //    let id=inputId.value;
    //     // url=`/boat?id=${id}`
    //    const response=await fetch (`/boat?id=${id}`,{method:'GET'})
    //    const boat=await response.json();
    //    console.log('Hämtade båt: ', boat)
     

    // })


})