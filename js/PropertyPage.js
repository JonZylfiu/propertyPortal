import { fetchProperties } from "./PropertiesPage.js";
import { readFileSync, writeFileSync } from "fs";


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


async function fetchProperty() {
    const data = await fetchProperties();
    const property = data.filter(data => data.id == id);
    return property[0];
}



fetchProperty();