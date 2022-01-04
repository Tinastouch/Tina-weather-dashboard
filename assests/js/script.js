var userFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-input");
var cityTitleEl = document.querySelector("#show-location")
var cityTempEl = document.querySelector("#curr-temp")
var cityWindEl = document.querySelector("#curr-wind")
var cityHumEl = document.querySelector("#curr-hum")


var apiKey = "e346505cc59ffec019500e1a2835c0e4";

var getCurrentWeather = function (apiUrl) {
  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          cityTitleEl.textContent = data.name;
          console.log(data.name);
          getWeatherForecast(data);
        });
      } else {
        alert('Error: City Weather Not Found');
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to OpenWeather");
    });
};

var getWeatherForecast = function (jsonData) {
  var lon = jsonData.coord.lon;
  var lat = jsonData.coord.lat;

  var dailyForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + /*"&exclude={part}*/ "&units=metric&appid=" + apiKey;

  // make a request to the url
  fetch(dailyForecastUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var date = new Date((data.current.dt + data.timezone_offset) * 1000).toDateString();
          console.log(date);
          cityTempEl.textContent = "Temperature: " + Math.round(data.current.temp);
          console.log("Temperature: " + Math.round(data.current.temp));
          cityWindEl.textContent = "Wind Speed: " + data.current.wind_speed + " metres/second";
          console.log("Wind Speed: " + data.current.wind_speed + " metres/second");
          cityHumEl.textContent = "Humidity: " + data.current.humidity + "%";
          console.log("Humidity: " + data.current.humidity + "%");
          console.log("UV Index: " + data.current.uvi);
          console.log("http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");

          displayForecastData(data);
        });
      } else {
        alert('Error: City Weather Not Found');
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to OpenWeather");
    });
};

var displayForecastData = function (weatherdata) {
  for (var i = 0; i < 5; i++) {
    console.log(weatherdata);
    var date = new Date((weatherdata.daily[i].dt + weatherdata.timezone_offset) * 1000).toDateString();
    console.log(date);
    console.log("Temperature: " + Math.round(weatherdata.daily[i].temp.day));
    console.log("Wind Speed: " + weatherdata.daily[i].wind_speed + " metres/second");
    console.log("Humidity: " + weatherdata.daily[i].humidity + "%");
    console.log("http://openweathermap.org/img/wn/" + weatherdata.daily[i].weather[0].icon + ".png");
  }
}

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    var currentWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    getCurrentWeather(currentWeatherApiUrl);

    cityInputEl.value = "";
  } else {
    alert("Please enter a valid city");
  }
  console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);