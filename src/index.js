import './style.css';

const { countryCodeEmoji } = require('country-code-emoji');
const locationName = document.getElementById('weatherName');
const locationWeather = document.getElementById('weatherTemp');
const locationFlag = document.getElementById('weatherFlag');

const getWeather = async () => {
  const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Bida&units=metric&APPID=8c2cf7df09a32e8715f1725a828b777b', {mode: 'cors'});
  const responseData = await response.json();
  locationName.textContent = responseData.name;
  locationName.classList.add('name');
  locationWeather.textContent = Math.round(responseData.main.temp) + '°';
  locationFlag.textContent = countryCodeEmoji(responseData.sys.country);
  console.log(responseData);
};
getWeather();
