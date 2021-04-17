const getWeather = async () => {
  const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=8c2cf7df09a32e8715f1725a828b777b');
  const responseData = await response.json();
  console.log(responseData);
};
getWeather();
