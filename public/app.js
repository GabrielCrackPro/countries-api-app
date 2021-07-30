const countriesContainer = document.querySelector(".countries-container");
const API_URLS = {
  all: "https://restcountries.eu/rest/v2/all",
  map: "https://www.google.com/maps/place/",
  search: {
    name: "https://restcountries.eu/rest/v2/name/",
    fullname: "https://restcountries.eu/rest/v2/name/{name}?fullText=true",
    code: "https://restcountries.eu/rest/v2/alpha/{code}",
    currency: "https://restcountries.eu/rest/v2/currency/{currency}",
    language: "https://restcountries.eu/rest/v2/lang/{et}",
    capital: "https://restcountries.eu/rest/v2/capital/{capital}",
    callingcode: "https://restcountries.eu/rest/v2/callingcode/{callingcode}",
    region: "https://restcountries.eu/rest/v2/region/{region}",
  },
};
const getData = async (url) => {
  let data = await fetch(url).then((response) => response.json());
  return data;
};
const formatNumber = (number) => {
  if (typeof number != "number") {
    number = Number(number);
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
window.onload = async () => {
  let countries = await getData(API_URLS.all);
  countries.forEach((country) => {
    if (country.borders.length == 0) {
      country.borders = "No borders";
    }
    countriesContainer.innerHTML += `
    <div class="card mb-2 mt-2 p-2">
    <h3 class="card-header bg-primary text-white">#${
      countries.indexOf(country) + 1
    } ${country.name} - ${country.nativeName}</h3>
    <a href="${country.flag}" target="blank">View flag</a>
    <p class="card-text">Region: ${country.region} - ${country.subregion}</p>
    <p class="card-text">Population: ${formatNumber(
      country.population
    )} people</p>
    <p class="card-text">Languages: ${country.languages[0].name}</p>
    <p class="card-text">Demonym: ${country.demonym}</p>
    <p class="card-text">Capital: ${country.capital}</p>
    <p class="card-text">Area: ${formatNumber(country.area)} Km<sup>2</sup></p>
    <p class="card-text">Borders: ${country.borders}</p>
    <p class="card-text">Calling Code: ${country.callingCodes}</p>
    <p class="card-text">Currency: ${country.currencies[0].code} - ${
      country.currencies[0].name
    }</p>
    <p class="card-text">Timezones: ${country.timezones}</p>
    <p class="card-text">Top Level Domain: ${country.topLevelDomain}</p>
    <p class="card-text">Lat: ${country.latlng[0]} Lon: ${
      country.latlng[1]
    } <a href="${
      API_URLS.map + country.name
    }" target="blank" class="btn btn-primary btn-sm">View on Google Maps</a></p>
    </div>
    `;
  });
  console.log(countries[0]);
};
