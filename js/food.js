// Search button event listener
document.getElementById("search-button").addEventListener('click', function () {
    // Get the search text from input box
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    if (searchText === '') {
        alert("Please write something in the search box");
        return;
    }

    // Clear previous search results and details
    document.getElementById('foods-div').innerHTML = '';  // Clear previous food items
    document.getElementById('food-details').innerHTML = '';  // Clear previous details

    // Fetch API for new search
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displayFoodsData(data?.meals))  // Pass the data to display function
        .catch(error => alert("Failed to fetch data. Please try again later."));
    
    // Clear input box after search
    searchInput.value = '';
});

// Function to display food search results
const displayFoodsData = (foods) => {
    if (foods == null) {
        alert("No food found");
        return;
    }

    const ui = document.getElementById('foods-div');  // Get the div to display food cards

    foods?.map((food) => {
        const div = document.createElement('div');
        div.classList.add("card", "border-2");
        div.innerHTML = `
         <figure>
          <img src="${food?.strMealThumb}" alt="Food" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${food?.strMeal}</h2>
          <p>${food?.strInstructions?.slice(0, 180)}</p>
          <div class="card-actions justify-end">
            <button onclick="loadFoodByName('${food.strMeal}')" class="btn btn-primary btn-outline w-full">See Details</button>
          </div>
        </div>
        `;
        ui.appendChild(div);
    });
}

// Function to load food details when "See Details" is clicked
const loadFoodByName = (name) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodDetails(data.meals[0]))  // Accessing the first meal object
        .catch(error => alert("Failed to load details. Please try again later."));
}

// Function to display food details
const displayFoodDetails = (food) => {
    if (!food) {
        alert("No food details available.");
        return;
    }

    // Clear previous details
    const detailsDiv = document.getElementById('food-details');
    detailsDiv.innerHTML = '';  // Clear previous details

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
    `;

    // Scroll to the top smoothly when details are shown
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
