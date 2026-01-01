const filter = document.getElementById("filter")
const searchInput = document.getElementById("search-input")
const searchForm = document.getElementById("search-form")
const container = document.getElementById("container")
const filterOption = document.getElementById("options-select");

let DATA = [];
let searchedData = [];
let searchedByOptionData = [];
let searched = false;
let searchedByOption = false;


searchForm.addEventListener("submit", e => {
    e.preventDefault()
    searchProperties(searchInput.value);
})

filter.addEventListener("change",() => {
    switch (filter.value) {
        case "lower-higher":
            if(searched) {
                sortByPrice(searchedData, "asc");
            } else if(searchedByOption) {
                sortByPrice(searchedByOption, "asc")
            } else {
                sortByPrice(DATA, "asc");
            }
            break;
        case "higher-lower":
            if(searched) {
                sortByPrice(searchedData, "desc");
            } else if(searchedByOption) {
                sortByPrice(searchedByOption, "desc")
            } else {
                sortByPrice(DATA, "desc");
            }    
        break;
    }  
})

filterOption.addEventListener("change", () => {
    switch (filterOption.value) {
        case "rent":
            searched ? sortByOption(searchedData, "rent") : sortByOption(DATA, "rent");
        break;
        case "sale":
            searched ? sortByOption(searchedData, "sale") : sortByOption(DATA, "sale");
        break;
        case "both":
            searched ? sortByOption(searchedData, "both") : sortByOption(DATA, "both");
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
        const { id, title, image, location, price, listedDate: date, rent } = card;
        generatePropertyCard(id, title, image, location, price, card.specifics, date, rent);
    })
}

function generatePropertyCard(id, title, image, location, price, specifics, date, rent) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.innerHTML =`<img src=${image} alt="" />
                        <div class="card-body">
                            <h5>${title}</h5>                    
                            <p>Location: ${location.country}, ${location.city}, ${location.street}</p>
                            <span><b>${price}</b></span>
                        </div>
                        <div class="card-specs">
                            <span>Icon - ${specifics.bedrooms + specifics.bedrooms} Rooms</span>
                            <span>Icon - ${specifics.parking} Parking</span>
                            <span>Icon - ${specifics.area} sqft</span>
                        </div>
                        <div class="bottom-section">
                            <p id="date">Posted: <b>${date}</b></p>
                            <span>${rent == 1 ? "Rent" : "Sale"}</span>
                        </div>
                        <a class="view-btn" href="http://127.0.0.1:5500/html/PropertyPage.html?id=${id}">View</a>
                    `;
    container.appendChild(element);
}

function parsePrice(priceStr) {
return Number(priceStr.replace(/\$|,/g, '').replace(/\./g, ''));
}

function sortByPrice(data, order) {
    const result = data.sort((a, b) => {
        const priceA = parsePrice(a.price)
        const priceB = parsePrice(b.price)

        if (order === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    })

    searched = true;
    searchedData = result;
    container.innerHTML = "";
    generatePropertyCards(result);
}

function sortByOption(data, type) {
    let result;

    if(type == "rent") {
        result =  data.filter((property) => property.rent == 1);
    } else if(type == "sale") {
        result = data.filter((property) => property.rent == 0);
    } else if(type == "both") {
        result = searched ? searchedData : DATA;
    }

    searchedByOption = true;
    searchedByOptionData = result;
    container.innerHTML = "";
    generatePropertyCards(result);
}


function searchProperties(input) {
    input = input.toLowerCase();

    if(input === '') searched = false;

    const result = DATA.filter(function(property) {
        return property.title.toLowerCase().includes(input) || property.location.country.toLowerCase().includes(input) || property.location.city.toLowerCase().includes(input);
    })

    container.innerHTML = "";
    searched = true;
    searchedData = result;
    generatePropertyCards(result);
}
