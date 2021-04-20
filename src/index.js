import './style.css';

const locationName = document.getElementById('weatherName');

const getWeather = async () => {
  const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Bida&APPID=8c2cf7df09a32e8715f1725a828b777b', {mode: 'cors'});
  const responseData = await response.json();
  locationName.textContent = responseData.name;
  locationName.classList.add('name');
  console.log(responseData);
};
getWeather();
