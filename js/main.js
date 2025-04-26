const loadCategories = ()=> {
fetch("https://openapi.programming-hero.com/api/peddy/categories")
.then((res)=> res.json())
.then((data)=>displayCategories(data.categories))
.catch(error => console.log(error));
}

// Loading pets when the specific button is clicked
const loadCategoryByPets = (data)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${data}`)
    .then(res=>res.json())
    .then((data)=> {
        displayAllPets(data.data)})
}

function removePrevPet(){
    const petContainner = document.getElementById("petcontainer");
    petContainner.innerHTML = "";
}

// Display Category name dynamically and 
function displayCategories(data){
    console.log(data)

    const getCat = document.getElementById("categories");

    console.log(getCat)
    data.forEach(element => {
        //console.log(element) 
        const div = document.createElement("div")
        div.classList = "div-cat flex justify-center items-center px-6 py-2 hover:bg-gray-300 rounded-xl";
        div.innerHTML = 
        `<button  class="flex justify-center items-center">
        <img class="w-5 lg:w-10 h-5 lg:h-10 mr-4" src=${element.category_icon} alt="">
         <h2 class="text-lg lg:text-2xl font-bold">${element.category}</h2>
        </button>
        `
        div.querySelector('button').addEventListener('click', () => {
            // need all div button for remove previous border
                const allButtons = document.querySelectorAll("div");
                allButtons.forEach(btn => btn.classList.remove("active-border"));

                removePrevPet();
                loadCategoryByPets(`${element.category}`);
                div.classList.add("active-border");
                
                
                
                
                
        })            
        getCat.append(div)     
    });
    
}

const loadAllPets = ()=> {
    fetch(" https://openapi.programming-hero.com/api/peddy/pets")
    .then((res)=> res.json())
    .then((data)=>displayAllPets(data.pets))
    .catch(error => console.log(error));
    }

// Adopt Start

//Give adopt section by Id
const getAdoptById = (data)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${data}`)
    .then((res)=> res.json())
    .then(data => displayAdopt(data))
    
}
const displayAdopt = (data)=>{
    //console.log("adopt button paise",data)
    const modalContainer = document.getElementById("openModalAdopt")
    const modalText = document.getElementById("modaltextAdopt")
    // Remove pre loaded modal
    removePrevModalText()
    const div = document.createElement("div")
    removePrevModalTextAdopt()
    div.classList.add("flex","flex-col","justify-center","items-center")

    div.innerHTML = `
    <img class="w-20 h-20 object-cover" src="https://img.icons8.com/?size=100&id=7NHc4WZuftxh&format=png&color=000000"/>
    <h2 class="text-xl font-bold">Congratulations</h2>
    <p class="text-base font-semibold my-4">Adoption Process is start for your pet</p>
    <p id="countvalue" class="text-3xl font-bold">3</p>
    `
    modalText.append(div)
    openModal();
    

}

function openModal() {
    const modalContainer = document.getElementById("openModalAdopt");
    modalContainer.classList.remove("hidden");
    const countdownElement = document.getElementById('countvalue');
    modalContainer.showModal(); // Show the modal
    let count = 3; // Reset the countdown value
    countdownElement.textContent = count; // Display the countdown starting value

    // Start the from 3 to 1 . stop when count will be 0
    countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;

        // If countdown reaches 0, close the modal
        if (count === 0) {
            // Stop the countdown
            clearInterval(countdownInterval); 
            // Close the modal automatically
            modalContainer.close()
        }
    }, 1000); // Run every second
}

// Remove pre loaded modal
function removePrevModalTextAdopt(){
    const modalText = document.getElementById("modaltextAdopt")
    modalText.innerHTML=""; 
}



// Adopt Ends

//Give detais section by Id start
const getDetailsById = (data)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${data}`)
    .then((res)=> res.json())
    .then(data => displayDetails(data.petData))    
}
// Display DetailsbyId Modal
const displayDetails = (data)=>{
    const modalContainer = document.getElementById("openModal")
    const modalText = document.getElementById("modaltext")
    // Remove pre loaded modal
    removePrevModalText()
    const div = document.createElement("div")

    div.innerHTML = `
            <img class="w-full h-full object-cover" src=${data.image} />
            <h2 class="text-2xl font-bold text-center py-5">${data.pet_name}</h2>
        
            <div class ="flex gap-3 items-center text-base font-semibold text-gray-500">
                <img class ="w-4 h-4" src="https://img.icons8.com/?size=100&id=Roa2QOIOdmUA&format=png&color=000000"/>
                <p> Breed: ${data.breed?data.breed:"Not Avaiable"}</p>
            </div>
            <div class ="flex gap-3 items-center text-base font-semibold text-gray-500">
                <img class ="w-4 h-4" src="https://img.icons8.com/?size=100&id=12776&format=png&color=000000"/>
                <p> Birth: ${new Date(data.date_of_birth).getFullYear()?new Date(data.date_of_birth).getFullYear(): "Not Available" }</p>
            </div>
            <div class ="flex gap-3 items-center text-base font-semibold text-gray-500">
                <img class ="w-4 h-4" src="https://img.icons8.com/?size=100&id=g28xXQQiupBQ&format=png&color=000000"/>
                <p>Gender: ${data.gender?data.gender:"Not Available"}</p>
            </div>
            <div class ="flex gap-3 items-center text-base font-semibold text-gray-500">
                <img class ="w-4 h-4" src="https://img.icons8.com/?size=100&id=85782&format=png&color=000000"/>
                <p>Price: ${data.price?`${data.price}$`:"Not Available"}</p>
            </div>
            <div>
            <h2 class="text-lg font-bold text-start py-5">Details Information</h2>
            <p class="py-5 "> ${data.pet_details} </p>
            </div>
            
            

    `
    modalText.append(div)
    modalContainer.showModal();
    
}
// Remove pre loaded modal
function removePrevModalText(){
    const modalText = document.getElementById("modaltext")
    modalText.innerHTML=""; 
}
///Give detais section by Id End


//Give PokeImage by Id start
const pokeImage = (data)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${data}`)
    .then((res)=> res.json())
    .then(data => getImageContainerPoke(data.petData))
    
}
 const getImageContainerPoke = (data)=>{
    //console.log(data)
    const imageContainer = document.getElementById("pokeimage")

    const div = document.createElement("div")
    div.classList.add("leading-none")
    div.innerHTML = `
        <img class="p-2 rounded-lg border-[2px] border-gray-400" src=${data.image} />
    `
    imageContainer.append(div)
 }
//Give PokeImage by Id end

// Sort By Price Starts Here
const sortByPrice =()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res=>res.json())
    .then(data=>{
        const getCat = document.getElementsByClassName("active-border")
        // remove pre selected category button style
        Array.from(getCat).forEach((element) => {
            element.classList.remove("active-border");
        });
        sortArray(data.pets)});
}

const sortArray = (petArray)=>{
    // get descending ordered array "petArray"
    petArray.sort((a, b) => {
        // Handle unavailable prices (empty string or undefined)
        // Move to end
        if (a.price === "" || a.price === undefined) return 1; 
        // Move other ahead
        if (b.price === "" || b.price === undefined) return -1; 
    
        // Sort by price in descending order
        return b.price - a.price;
    });
    // goto displayallPets
    displayAllPets(petArray);
    
}
// Sort By Price Ends Here


// get an array and give all pet card

const displayAllPets = (pets)=>{
    
    //console.log("this is all pet display")
    
    const petContainner = document.getElementById("petcontainer");
    const pokeConainer = document.getElementById("pokeimage")
    // petContainner.innerHTML = "";
    // pokeConainer.innerHTML = "";
    pokeConainer.classList.remove("border-2","border-gray-600")
    const spinContainer = document.getElementById("spin")
    //petContainner.innerHTML = "";
    spinContainer.classList.remove("hidden")
    setTimeout(()=>{
        spinContainer.classList.add("hidden")
        petContainner.innerHTML = "";
        pokeConainer.innerHTML = "";
        // for each
        //check if array length is zero or not 
        //if zero then show appropriate meaning
        if(pets.length === 0){
            //console.log("No data available");
            petContainner.classList.remove("grid")
            const card = document.createElement("div");
            //card.classList = ""
            card.innerHTML = 
            `
            <div class="flex flex-col justify-center items-center p-10">
                <div class="w-1/6 mx-auto flex justify-center items-center">
                <img class="h-full w-full object-cover rounded-lg"
              src="./images/error.webp"
              alt=""/>
              </div>
              <h2 class="text-3xl font-bold my-4">No Information Available</h2>
              <p class="w-1/2 mx-auto text-lg font-semibold text-center">Oops! It seems there's no information available for the Bird at the moment. Please check back later or try refreshing the page for updates. Thank you for your patience!"</p>
            </div>
            
            `
            petContainner.append(card);
        }
        else{
        pets.forEach((element)=>{
            //console.log(element.petId)
            petContainner.classList.add("grid")
            pokeConainer.classList.add("border-2","border-gray-600")
            const card = document.createElement("div");
            card.classList = "card card-compact border-[1px] border-gray-400 p-2"
            card.innerHTML = 
            `<figure class="h-1/2">
            <img class="h-full w-full object-cover rounded-lg"
              src=${element.image}
              alt="" />
          </figure>
          <div class="card-body">
            <h2 class="text-xl font-bold">${element.pet_name}</h2>
        
            <div class ="flex gap-3 items-center text-base font-semibold text-gray-500">
                <img class ="w-4 h-4" src="https://img.icons8.com/?size=100&id=Roa2QOIOdmUA&format=png&color=000000"/>
                <p> Breed: ${element.breed?element.breed:"Not Available"}</p>
            </div>
            <div class ="flex gap-3 items-center text-base font-semibold text-gray-500">
                <img class ="w-4 h-4" src="https://img.icons8.com/?size=100&id=12776&format=png&color=000000"/>
                <p> Birth: ${new Date(element.date_of_birth).getFullYear()?new Date(element.date_of_birth).getFullYear():"Not Available" }</p>
            </div>
            <div class ="flex gap-3 items-center text-base font-semibold text-gray-500">
                <img class ="w-4 h-4" src="https://img.icons8.com/?size=100&id=g28xXQQiupBQ&format=png&color=000000"/>
                <p>Gender: ${element.gender?element.gender:"Not Available"}</p>
            </div>
            <div class ="flex gap-3 items-center text-base font-semibold text-gray-500">
                <img class ="w-4 h-4" src="https://img.icons8.com/?size=100&id=85782&format=png&color=000000"/>
                <p>Price: ${element.price?`${element.price}$`: "Not Available"}</p>
            </div>
            
            <div class="flex justify-between">
              <button onclick="pokeImage(${element.petId})" class="btn box-border border-[2px]  border-gray-300"><img class="w-4 h-4" src="https://img.icons8.com/?size=100&id=u8MTpAq972MG&format=png&color=000000" /></button>
              <button onclick="getAdoptById(${element.petId})" id="openModalButton" class="btn box-border border-[2px] text-[#0E7A81] border-gray-300">Adopt</button>
              <button onclick="getDetailsById(${element.petId})" class="btn box-border border-[2px] text-[#0E7A81] border-gray-300">Details</button>
            </div>
          </div>
            `
        
            petContainner.append(card);
            })
        }
    },2000)

   
}

loadCategories();
loadAllPets();