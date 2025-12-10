const filter = document.getElementById("filter")
const searchInput = document.getElementById("search-input")
const searchForm = document.getElementById("search-form")
const container = document.getElementById("container")

let DATA = [];
let searchedData = [];
let searched = false;

searchForm.addEventListener("submit", e => {
    e.preventDefault()
    searchProperties(searchInput.value);
})

filter.addEventListener("change", e => {
    switch (filter.value) {
        case "lower-higher":
            searched ? sort(searchedData, "asc") : sort(DATA, "asc");
            break;
        case "higher-lower":
            searched ? sort(searchedData, "desc") : sort(DATA, "desc");
            break;
    }  
})

window.addEventListener("load", async () => {
    DATA = await fetchProperties();    
    generatePropertyCards(DATA);
    filter.value = "Default";
})

async function fetchProperties() {
    const response = await fetch("http://127.0.0.1:5500/properties.json");
    const data = await response.json();
    return data;
}

function generatePropertyCards(data) {
    data.forEach(card => {
        const { id, title, image, location, price, date } = card;
        generatePropertyCard(id, title, image, location, price, card.specifics, date);
    })
}

function generatePropertyCard(id, title, image, location, price, specifics, date) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.innerHTML =`<img src=${image} alt="" />
                        <div class="card-body">
                            <h5>${title}</h5>                    
                            <p>Location: ${location}</p>
                            <span><b>${price}</b></span>
                        </div>
                        <div class="card-specs">
                            <span>Icon - ${specifics[0]} Rooms</span>
                            <span>Icon - ${specifics[1]} Baths</span>
                            <span>Icon - ${specifics[2]} sqft</span>
                        </div>
                        <p id="date">Posted: <b>${date}</b></p>
                        <a href="127.0.0.1:5500/html/PropertyPage.html?id=${id}">View</a>
                    `;
    container.appendChild(element);
}

function parsePrice(priceStr) {
  return Number(priceStr.replace(/\$|,/g, '').replace(/\./g, ''));
}

function sort(data, order) {
    const result = data.sort((a, b) => {
        const priceA = parsePrice(a.price)
        const priceB = parsePrice(b.price)

        if (order === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    })

    container.innerHTML = "";
    generatePropertyCards(result);
}


function searchProperties(input) {
    input = input.toLowerCase();

    if(input === '') searched = false;
 
    const result = DATA.filter(function(property) {
        return property.title.toLowerCase().includes(input) || property.location.toLowerCase().includes(input);
    })

    container.innerHTML = "";
    searched = true;
    searchedData = result;
    generatePropertyCards(result);
}