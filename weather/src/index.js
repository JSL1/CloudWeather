//index.js > main.js
const apiKey = "affbb1c4b60c4e5b96451606232203";
const url = "https://api.weatherapi.com/v1/current.json?key=";
const forecastURL = "https://api.weatherapi.com/v1/forecast.json?key=";

//Declaring DOM elements
const cityName = document.querySelector('.cityName');
const desc = document.querySelector('.description');
const tempC = document.querySelector('.tempC');
const tempF = document.querySelector('.tempF');
const windSpeed = document.querySelector('.wind');
const iconIMG = document.createElement('img');
iconIMG.classList.add('icon');
const feelsLike = document.querySelector('.feelslike');
const humid = document.querySelector('.humidity');
const rainCh = document.querySelector('.rainChance');
const tempH = document.querySelector('.temp-high');
const tempL = document.querySelector('.temp-low');

const button = document.getElementById('search-button');
const searchform = document.getElementById('search-form');

function fetchWeather(city) {
  fetch(url + apiKey + '&q=' + city)
    .then((response) => response.json())
      .then((data) => displayWeather(data));
}

function fetchForecast(city) {
  fetch(forecastURL + apiKey + '&q=' + city)
    .then((response) => response.json())
      .then((data) => displayForecast(data));
}

window.addEventListener('load', () => {
  fetchWeather('Windsor');
  fetchForecast('Windsor');//Search bar and button controls
  searchform.addEventListener('submit', (event) => {
    event.preventDefault();
    const bar = document.getElementById('city-search');
    fetchWeather(bar.value);
    fetchForecast(bar.value);
  });
});


function displayWeather(data) {
  console.log(data);
  const { name } = data.location;
  const { text, icon } = data.current.condition;
  const { temp_c, temp_f, humidity, feelslike_c, feelslike_f } = data.current;
  const { wind_kph } = data.current;
  
  //displaying the weather to the DOM
  cityName.textContent = name;
  desc.textContent = text;
  tempC.innerHTML = "<h2><span class='material-symbols-outlined'>thermometer</span> " + temp_c + "&deg; c</h2>";
  tempF.innerHTML = "<h3><span class='material-symbols-outlined'>thermometer</span> " + temp_f + "&deg; f" + "</h3>";
  windSpeed.innerHTML = "<p>Wind speed</p><h3><span class='material-symbols-outlined'>air</span> " + wind_kph + "</h3>";
  iconIMG.setAttribute('src', 'http://' + icon);
  desc.appendChild(iconIMG);
  feelsLike.innerHTML = ("<p>Feels like </p><h3>" + feelslike_c + "&deg; c<br /> "  + feelslike_f + "&deg; f</h3>");
  humid.innerHTML = ("<p>Humidity </p><h3><span class='material-symbols-outlined'>humidity_percentage</span>" + humidity + "</h3>");
}

function displayForecast(data) {
  console.log(data);
  const { daily_chance_of_rain, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f } = data.forecast.forecastday[0].day;
  console.log('rain: ' + daily_chance_of_rain);
  rainCh.innerHTML = ("<p>Chance of rain </p><h3><span class='material-symbols-outlined'>rainy</span> " + daily_chance_of_rain + "</h3>");
  tempH.innerHTML = ("<h3><span class='material-symbols-outlined'>thermometer_gain</span> " + maxtemp_c + "&deg;c <span class='material-symbols-outlined'>thermometer_loss</span> " + mintemp_c + "&deg;c</h3>");
  tempL.innerHTML = ("<h3><span class='material-symbols-outlined'>thermometer_gain</span> " + maxtemp_f + "&deg;f, <span class='material-symbols-outlined'>thermometer_loss</span> " + mintemp_f + "&deg;f</h3>");
}
