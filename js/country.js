//console.log("connected");

const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all') 
        .then(res => res.json())
        .then(data => displayCountry(data))

}

loadCountries ()

const displayCountry =(countries)=> {
    //console.log(countries);
    const ui = document.getElementById('countries')
    countries.forEach(country => {  
        //console.log(country);
        const div = document.createElement('div')
        div.classList.add('country')
        div.innerHTML = `
        <img class="w-full h-52 border border-2" src="${country.flags.png}" alt="">
         <h3 class="text-2xl mt-3">Name: ${country.name.common}</h3>
        <p class="my-5">Capital: ${country.capital}</p>
        <button onclick="loadCountryByName('${country.name.common}')" class="btn btn-primary btn-outline w-full">See Details</button>

        `
        ui.appendChild(div)
    })        
 
}



const loadCountryByName = (name) => {
    // console.log('function run', name);
    //console.log(name);
    // fetch(`https://restcountries.com/v3.1/name/${name}`) 
    const url = `https://restcountries.com/v3.1/name/${name}`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    //.then(data => console.log(data[0]))   
    .then(data => displayCountryDetails(data[0]))   

}


const displayCountryDetails = (country) => {
    console.log(country);
    
    const detailsDiv = document.getElementById('country-details');
    detailsDiv.innerHTML = `
        <img class="w-100 h-80 mx-auto border border-2" src="${country.flags.png}" alt="">
        <h3 class="text-5xl mt-3">Name: ${country.name.common}</h3>
        <p class="my-5">Capital: ${country.capital}</p>
        <p class="my-5">Population: ${country.population}</p>
        <p class="my-5">Region: ${country.region}</p>
       
    `
window.scrollTo({
    top:0,
    // behavior:'smooth'
});
}