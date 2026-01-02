const section = document.getElementById("main");


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


async function fetchProperty() {
    const data = await fetchProperties();
    const property = data.filter(data => data.id == id);
    document.title = property[0].title;

    const {title, image, location, price, specifics, about, details, features, owner, rent} = property[0];
    generatePropertyCard(title, image, location, price, specifics, about, details, features, owner, rent);
    console.log(features)
    return property[0];
}

function generatePropertyCard(title, image, location, price, specifics, about, details, features, owner, rent) {
    section.innerHTML =`<div class="image-div">
                            <img src=${image} alt=${title}>
                            <div>
                                <h3>${title}</h3>
                                <p> <svg xmlns="http://www.w3.org/2000/svg" class="location-icon" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>
                                    ${location.country}, ${location.city}, ${location.street}
                                </p>
                            </div>
                        </div>
                        
                        <div class="section-body">
                            <div>
                                <div class="specs">
                                    <p class="price">
                                        <svg class="euro-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1408"><path fill="currentColor" d="m976 1179l35 159q3 12-3 22.5t-17 14.5l-5 1q-4 2-10.5 3.5t-16 4.5t-21.5 5.5t-25.5 5t-30 5t-33.5 4.5t-36.5 3t-38.5 1q-234 0-409-130.5T127 926H32q-13 0-22.5-9.5T0 894V781q0-13 9.5-22.5T32 749h66q-2-57 1-105H32q-14 0-23-9t-9-23V498q0-14 9-23t23-9h98q67-210 243.5-338T774 0q102 0 194 23q11 3 20 15q6 11 3 24l-43 159q-3 13-14 19.5t-24 2.5l-4-1q-4-1-11.5-2.5L877 236l-22.5-3.5l-26-3l-29-2.5l-29.5-1q-126 0-226 64T394 466h468q16 0 25 12q10 12 7 26l-24 114q-5 26-32 26H350q-3 37 0 105h459q15 0 25 12q9 12 6 27l-24 112q-2 11-11 18.5t-20 7.5H398q48 117 149.5 185.5T776 1180q18 0 36-1.5t33.5-3.5t29.5-4.5t24.5-5t18.5-4.5l12-3l5-2q13-5 26 2q12 7 15 21"/></svg>
                                        <span>${price}</span>
                                    </p>
                                    <div class="specs-cards-div">
                                        <div>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 640 512"><path fill="currentColor" d="M32 32c17.7 0 32 14.3 32 32v256h224V160c0-17.7 14.3-32 32-32h224c53 0 96 43 96 96v224c0 17.7-14.3 32-32 32s-32-14.3-32-32v-32H64v32c0 17.7-14.3 32-32 32S0 465.7 0 448V64c0-17.7 14.3-32 32-32m144 96a80 80 0 1 1 0 160a80 80 0 1 1 0-160"/></svg>
                                            </span>
                                            <span>${specifics.bedrooms}</span>
                                            <span>Bedrooms</span>
                                        </div>
                                        <div>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="currentColor" d="M21 13v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2.4a.6.6 0 0 1 .6-.6z"/><path d="m16 20l1 2m-9-2l-1 2m14-9V7a4 4 0 0 0-4-4h-5"/><path fill="currentColor" d="M15.4 8H8.6c-.331 0-.596-.268-.56-.598C8.186 6.075 8.863 3 12 3s3.814 3.075 3.96 4.402c.036.33-.229.598-.56.598"/></g></svg>
                                            </span>
                                            <span>${specifics.bathrooms}</span>
                                            <span>Bathrooms</span>
                                        </div>
                                        <div>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm0 0V5z"/></svg>
                                            </span>
                                            <span>${specifics.area} sq ft</span>
                                            <span>Area</span>
                                        </div>
                                        <div>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M22 21V9.61c0-1.322 0-1.984-.344-2.496s-.953-.758-2.17-1.25l-6-2.42C12.752 3.148 12.386 3 12 3s-.752.148-1.486.444l-6 2.42c-1.217.492-1.826.738-2.17 1.25S2 8.288 2 9.61V21m14-2v2m-8-2v2"/><path d="m7.5 14l.243-.97c.363-1.455.545-2.183 1.088-2.606C9.373 10 10.123 10 11.623 10h.754c1.5 0 2.25 0 2.792.424c.543.423.725 1.15 1.088 2.606l.243.97m.5 0H7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1m-8.5 2.49v.01m7-.01v.01"/></g></svg>
                                            </span>
                                            <span>${specifics.parking}</span>
                                            <span>Parking</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="about-div">
                                    <h3>About this property</h3>
                                    <p>${about}</p>
                                </div>
                                
                                <div class="property-div">
                                    <h3>Property Details</h3>
                                    <div>
                                        <p><span>Property ID</span><span>${details.propertyId}</span></p>
                                        <p><span>Property Type</span><span>${details.propertyType}</span></p>
                                        <p><span>Year Built</span><span>${details.yearBuilt}</span></p>
                                        <p><span>Status</span><span>${rent == 1 ? "For Rent" : "For Sale"}</span></p>
                                    </div>
                                </div>

                                <div class="features-div">
                                    <h3>Features & Amenities</h3>
                                    <ul>
                                        ${features.map(feature => {
                                            
                                            return `<li>${feature}</li>`;
                                        }).join("")}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div class="owner-div">
                                    <span>Contact Owner</span>
                                    <div class="profile">
                                        ${owner.initials}
                                    </div>
                                    <h3>${owner.name}</h3>
                                    <p>${owner.bio}</p>
                                    <div class="owner-contact-div">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"/></svg>
                                        <a>
                                            <span>Email</span>
                                            <p>${owner.email}</p>
                                        </a>
                                    </div>
                                    <div class="owner-contact-div">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M4.063 1.25h3.751a.75.75 0 0 1 .702.486l1.456 3.87a.75.75 0 0 1 .035.401l-.73 3.912c.897 2.108 2.378 3.525 4.833 4.796l3.865-.75a.75.75 0 0 1 .41.036l3.882 1.48a.75.75 0 0 1 .483.7v3.584c0 1.626-1.432 2.945-3.108 2.58c-3.053-.664-8.71-2.353-12.672-6.315c-3.796-3.795-5.068-9.037-5.495-11.87c-.245-1.618 1.052-2.91 2.588-2.91" clip-rule="evenodd"/></svg>
                                        <a>
                                            <span>Phone</span>
                                            <p>${owner.phone}</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                `;
}

async function fetchProperties() {
    const response = await fetch("http://127.0.0.1:5500/properties.json");
    const data = await response.json();
    return data;
}


fetchProperty();