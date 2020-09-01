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
       
       
        // let inputParam='Titanic'
        
        const response=await fetch (`/api/boat?searchParam=${inputParam}`,{method:'GET'})

        const boat=await response.json();
        console.log('Hämtade båt: ', boat)
        if(boat.length==1){
            findBoatContainer.innerHTML='';
            let p=document.createElement('p')
            p.className='findBoat'
            p.innerHTML= `Modell: ${boat[0].modelName} <br> Pris: ${boat[0].price}<br> Byggdes år: ${boat[0].constructionYear} <br> `
            findBoatContainer.appendChild(p)
        }
        else{

            let p=document.createElement('p')
            p.innerHTML='Båten du letade efter finns inte'
            findBoatContainer.appendChild(p)
        }

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
        const text=await response.text();

        newBoatMsg.innerHTML='Du la till en ny båt.'


        // console.log('Script, data: ',text)
        // let stringdata=JSON.stringify(data)
        // console.log('Script: stringifyad data: ', stringdata)

    })




})