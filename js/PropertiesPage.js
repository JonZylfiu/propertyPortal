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
                            <p class="location">Location: ${location.country}, ${location.city}, ${location.street}</p>
                            <span><b>${price}</b></span>
                        </div>
                        <div class="card-specs">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512"><path fill="currentColor" d="M32 32c17.7 0 32 14.3 32 32v256h224V160c0-17.7 14.3-32 32-32h224c53 0 96 43 96 96v224c0 17.7-14.3 32-32 32s-32-14.3-32-32v-32H64v32c0 17.7-14.3 32-32 32S0 465.7 0 448V64c0-17.7 14.3-32 32-32m144 96a80 80 0 1 1 0 160a80 80 0 1 1 0-160"/></svg>
                                ${specifics.bedrooms + specifics.bedrooms} Rooms
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M22 21V9.61c0-1.322 0-1.984-.344-2.496s-.953-.758-2.17-1.25l-6-2.42C12.752 3.148 12.386 3 12 3s-.752.148-1.486.444l-6 2.42c-1.217.492-1.826.738-2.17 1.25S2 8.288 2 9.61V21m14-2v2m-8-2v2"/><path d="m7.5 14l.243-.97c.363-1.455.545-2.183 1.088-2.606C9.373 10 10.123 10 11.623 10h.754c1.5 0 2.25 0 2.792.424c.543.423.725 1.15 1.088 2.606l.243.97m.5 0H7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1m-8.5 2.49v.01m7-.01v.01"/></g></svg>
                                ${specifics.parking} Parking
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm0 0V5z"/></svg>
                                ${specifics.area} sqft
                            </span>
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
