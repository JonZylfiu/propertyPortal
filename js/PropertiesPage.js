const filter = document.getElementById("filter")
const searchInput = document.getElementById("search-input")
const searchForm = document.getElementById("search-form")
const container = document.getElementById("container")

let DATA = [];

searchForm.addEventListener("submit", e => {
    e.preventDefault()
    console.log(searchInput.value)
})

filter.addEventListener("change", e => {
    switch (filter.value) {
        case "lower-higher":
            sort("asc")
            break;
        case "higher-lower":
            sort("desc")
            break;
        case "newest":
            console.log(filter.value)
            break;
        case "oldest":
            console.log(filter.value)
            break;
    }  
})

window.addEventListener("load", async () => {
    DATA = await fetchProperties();    
    console.log(DATA)
    generatePropertyCards(DATA);
})

async function fetchProperties() {
    const response = await fetch("http://127.0.0.1:5500/properties.json");
    const data = await response.json();
    return data;
}

function generatePropertyCards(data) {

    data.forEach(card => {
        const { title, image, location, price } = card;
        generatePropertyCard(title, image, location, price, card.specifics);
    })
}

function generatePropertyCard(title, image, location, price, specifics) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.innerHTML =`<img src=${image} alt="" />
                        <div class="card-body">
                            <h5>${title}</h5>                    
                            <p>Location: ${location}</p>
                            <span>${price}</span>
                        </div>
                        <div class="card-specs">
                            <span>Icon - ${specifics[0]} Rooms</span>
                            <span>Icon - ${specifics[1]} Baths</span>
                            <span>Icon - ${specifics[2]} sqft</span>
                        </div>
                        <button>Check</button>
                    `
    container.appendChild(element);
}

function parsePrice(priceStr) {
  return Number(priceStr.replace(/\$|,/g, '').replace(/\./g, ''));
}


function sort(order) {
    result = DATA.sort((a, b) => {
        const priceA = parsePrice(a.price)
        const priceB = parsePrice(b.price)

        if (order === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    })

    container.innerHTML = "";
    
    generatePropertyCards(result)
}
