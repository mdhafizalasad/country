document.getElementById("search-button").addEventListener('click',function(){
   const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    
    if (searchText == ''){
        alert("Pls. write something in search box")
        return
    } 

    //api fetch  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(res => res.json())
    //.then (data => console.log(data.meals))
    .then(data => displayFoodsData(data?.meals)) //pass the data to display Foods Data function
    // clear the input
    searchInput.value = ""
    
})

// in foods receive the array data ++ loop in rray and get single data from array

const displayFoodsData =(foods) => {
    //console.log(foods);
    //foods.map((food) => console.log(food))

    if (foods == null) {
        alert("Something went wrong")
        return
    }

    const ui = document.getElementById('foods-div'); //id div
    ui.innerHTML =''
    foods?.map((food) => { 
        //console.log(food);  
        const div = document.createElement('div');
        div.classList.add("card")
        div.classList.add("border-2")
        div.innerHTML = `
         <figure>
          <img
            src="${food?.strMealThumb}"
            alt="Food" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${food?.strMeal}</h2>
          <p>${food?.strInstructions?.slice(0,180)}</p>
          <div class="card-actions justify-end">
            <button onclick="loadFoodByName('${food.strMeal}')" class="btn btn-primary btn-outline w-full">See Details</button>
          </div>
        </div>
        
        `
        ui.appendChild(div)

    }) 
 
}


const loadFoodByName = (name) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodDetails(data.meals[0])) // Accessing the first meal object
}


const displayFoodDetails = (food) => {
    if (!food) {
        alert("No food details available.");
        return;
    }

    const detailsDiv = document.getElementById('food-details');
    detailsDiv.innerHTML = ` 
     <div class="ml-10 mr-10"> 
        <div class="card card-side bg-base-100 shadow-xl">
          <img src="${food.strMealThumb}" class="w-full h-80 ml-10 mb-6" alt="Food" />
          <div class="card-body">
            <h2 class="card-title">Name: ${food.strMeal}</h2>
            <h2 class="card-title">Category: ${food.strCategory}</h2>
            <h2 class="card-title">Area: ${food.strArea}</h2>
            <p class="card-actions text-justify">Details: ${food.strInstructions}</p>
          </div>
        </div>
        </div>
    `

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

