import "./style.css";

const { countryCodeEmoji } = require("country-code-emoji");

const locationName = document.getElementById("weatherName");
const locationWeather = document.getElementById("weatherTemp");
const locationFlag = document.getElementById("weatherFlag");
const locationdesc = document.querySelector(".description");
const myForm = document.querySelector("form");
const tempButton = document.getElementById("tempConversion");

var celsius = true;

const getWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=8c2cf7df09a32e8715f1725a828b777b`,
      { mode: "cors" }
    );
    const responseData = await response.json();
    locationName.textContent = responseData.name;
    locationName.classList.add("name");
    locationWeather.textContent = `${Math.round(responseData.main.temp)}`;
    locationFlag.textContent = countryCodeEmoji(responseData.sys.country);
    locationdesc.textContent = responseData.weather[0].description;
    const imageResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=i2fk28gV21A2hFxjWROYXpSlxj1vncHx&s=${locationdesc.textContent}`, {mode: "cors"});
    const imageData = await imageResponse.json();
    document.body.style.backgroundImage = `url(${imageData.data.images.original.url})`;
    myForm.reset();
  } catch (e) {
    locationdesc.textContent = "Location not found";
  }
};

const fetchWeather = () => {
  const location = document.getElementById("citySearch").value;
  getWeather(location);
};

const handleSubmit = (e) => {
  e.preventDefault();
  fetchWeather();
};

const convertTempFah = () => {
  console.log(locationWeather.textContent);
  const fah = Math.round((locationWeather.textContent * 9) / 5 + 32);
  locationWeather.textContent = fah;
  celsius = false;
};

const convertTempCelsius = () => {
  console.log(locationWeather.textContent);
  const cel = Math.round(((locationWeather.textContent - 32) * 5) / 9);
  locationWeather.textContent = cel;
  celsius = true;
};

const toggleTemp = () => {
  celsius ? convertTempFah() : convertTempCelsius();
};

myForm.addEventListener("submit", handleSubmit);
tempButton.addEventListener("click", toggleTemp);
