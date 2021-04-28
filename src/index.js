import './style.css';

const { countryCodeEmoji } = require('country-code-emoji');

const locationName = document.getElementById('weatherName');
const locationWeather = document.getElementById('weatherTemp');
const locationFlag = document.getElementById('weatherFlag');
const locationdesc = document.querySelector('.description');
const myForm = document.querySelector('form');
const tempButton = document.getElementById('tempConversion');
var celsius = true;

const getWeather = async (location) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=8c2cf7df09a32e8715f1725a828b777b`, { mode: 'cors' });
  const responseData = await response.json();
  locationName.textContent = responseData.name;
  locationName.classList.add('name');
  locationWeather.textContent = `${Math.round(responseData.main.temp)}`;
  locationFlag.textContent = countryCodeEmoji(responseData.sys.country);
  locationdesc.textContent = responseData.weather[0].description;
  myForm.reset();
};

const fetchWeather = () => {
  const location = document.getElementById('citySearch').value;
  getWeather(location);
};

const handleSubmit = (e) => {
  e.preventDefault();
  fetchWeather();
};

const convertTempFah = () => {
  console.log(locationWeather.textContent);
  const fah = (locationWeather.textContent * 9/5) + 32;
  locationWeather.textContent = fah;
  celsius = false;
}

const convertTempCelsius = () => {
  console.log(locationWeather.textContent);
  const cel = (locationWeather.textContent - 32) * 5/9;
  locationWeather.textContent = cel;
  celsius = true;
}

const toggleTemp = () => {
  celsius ? convertTempFah() : convertTempCelsius();
}

myForm.addEventListener('submit', handleSubmit);
tempButton.addEventListener('click', toggleTemp);
