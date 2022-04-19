var userInput = document.getElementById("city-input");
var searchButton = document.getElementById("search-button");
var searchKept = document.getElementById("search-kept");
var showLocation = document.getElementById("show-location")
var currSymb = document.getElementById("curr-symb");
var currTemp = document.getElementById("curr-temp");
var currHum = document.getElementById("curr-hum");
var currWind= document.getElementById("curr-wind");
var compShade = document.getElementById("comp-shade")
var currUv = document.getElementById("curr-uv");

var doneD = document.getElementById("done-d");
var doneSymb = document.getElementById("done-symb");
var doneTemp = document.getElementById("done-temp");
var doneHum = document.getElementById("done-hum");
var dtwoD = document.getElementById("dtwo-d");
var dtwoSymb = document.getElementById("dtwo-symb");
var dtwoTemp = document.getElementById("dtwo-temp");
var dtwoHum = document.getElementById("dtwo-hum");
var dthreeD = document.getElementById("dthree-d");
var dthreeSymb = document.getElementById("dthree-symb")
var dthreeTemp = document.getElementById("dthree-temp");
var dthreeHum = document.getElementById("dthree-hum");
var dfourD = document.getElementById("dfour-d");
var dfourSymb = document.getElementById("dfour-symb")
var dfourTemp = document.getElementById("dfour-temp");
var dfourHum = document.getElementById("dfour-hum");
var dfiveD = document.getElementById("dfive-d");
var dfiveSymb = document.getElementById("dfive-symb")
var dfiveTemp = document.getElementById("dfive-temp");
var dfiveHum = document.getElementById("dfive-hum");

var locations = [];


if (localStorage.getItem("selectLocation")) {
    locations = localStorage.getItem("selectLocation");
    var cityHistory = [];
    cityHistory = locations.split(",");
    locations = cityHistory

    for (var i = 0; i < cityHistory.length; i++) {
        var persistCity = document.createElement("button");
        persistCity.classList = "list-group-item";
        persistCity.innerHTML = cityHistory[i];
        searchKept.append(persistCity); 
    }
   
} 

function addToArray () {
    var selectLocation = userInput.value.trim()
    var addCityArray = locations
    addCityArray.push(selectLocation)
    console.log("add to citty array", addCityArray);
    console.log("locations array", locations);
    localStorage.setItem("selectLocation", addCityArray);
}



function currentWeather (event) {
    event.preventDefault();

    var selectLocation = userInput.value.trim();
    var savedCity = document.createElement("button");
    savedCity.className = "list-group-item";
    savedCity.innerHTML = userInput.value;
    searchKept.appendChild(savedCity);
    

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectLocation}&units=imperial&appid=97bb9481f4dbe83812bb1a83ed5636cb`
    console.log(apiUrl);
    fetch(apiUrl)
      .then(function (response) {
          if (response.ok) {
              console.log(response);
              response.json().then(function (data){
                  console.log(data);
                
                 var unixCode = data.dt
                 console.log(unixCode)
                 currentDate = new Date(unixCode * 1000).toLocaleDateString("en-US")
                 console.log(currentDate)
                 showLocation.innerHTML = selectLocation + " " + currentDate
                 var currSymbCode = data.weather[0].icon
                  var currSymbUrl = `http://openweathermap.org/img/w/${currSymbCode}.png`
                  currSymb.src = currSymbUrl
                  currTemp.innerHTML = "Temperature: " + data.main.temp + ' \u00B0 F';
                  currHum.innerHTML = "Humidity: " + data.main.humidity + "%"
                  currWind.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
                  currentLat = data.coord.lat
                  currentLon = data.coord.lon
                  var uVIndexUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${currentLat}&lon=${currentLon}&appid=97bb9481f4dbe83812bb1a83ed5636cb`
                  fetch(uVIndexUrl)
                    .then(function (response) {
                        if (response.ok) {
                            console.log(response);
                            response.json().then(function (data){
                                console.log(data);
                                currUv.innerHTML ="UV Index"+ data.value;
                                if (data.value >= 5.1) {
                                    compShade.className = "badge badge-danger"
                                } else if (data.value <= 2) {
                                    compShade.className = "badge badge-success"
                                } else if (data.value >= 2.1 && data.value <= 5) {
                                    compShade.className = "badge badge-warning"
                                }
                            })
                        }
                    })
                
              })
          }
      })
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectLocation}&units=imperial&appid=97bb9481f4dbe83812bb1a83ed5636cb`


    console.log(fiveDayUrl);
    fetch(fiveDayUrl)
      .then(function (response) {
          if (response.ok) {
              console.log(response);
              response.json().then(function (data){
                  console.log(data);
                 
                  var dayOneCode = data.list[3].dt
                  dayOneDate = new Date(dayOneCode * 1000).toLocaleDateString("en-US")
                  doneD.innerHTML = dayOneDate
                  console.log(data.list[3].weather[0].icon)
                  var doneSymbCode = data.list[3].weather[0].icon
                  var doneSymbUrl = `http://openweathermap.org/img/w/${doneSymbCode}.png`
                  doneSymb.src = doneSymbUrl
                  doneTemp.innerHTML = "Temp: " + data.list[3].main.temp + ' \u00B0 F';
                  doneHum.innerHTML = "Humidity: " + data.list[3].main.humidity + "%";
                  
                  var dayTwoCode = data.list[10].dt
                  dayTwoDate = new Date(dayTwoCode * 1000).toLocaleDateString("en-US")
                  dtwoD.innerHTML = dayTwoDate
                  var dtwoSymbCode = data.list[10].weather[0].icon
                  var dtwoSymbUrl = `http://openweathermap.org/img/w/${dtwoSymbCode}.png`
                  dtwoSymb.src = dtwoSymbUrl
                  dtwoTemp.innerHTML = "Temp: " + data.list[10].main.temp + ' \u00B0 F';
                  dtwoHum.innerHTML = "Humidity: " + data.list[10].main.humidity + "%";
                  
                  var dayThreeCode = data.list[19].dt
                  dayThreeDate = new Date(dayThreeCode * 1000).toLocaleDateString("en-US")
                  dthreeD.innerHTML = dayThreeDate
                  var dthreeSymbCode = data.list[19].weather[0].icon
                  var dthreeSymbUrl = `http://openweathermap.org/img/w/${dthreeSymbCode}.png`
                  dthreeSymb.src = dthreeSymbUrl
                  dthreeTemp.innerHTML = "Temp: " + data.list[19].main.temp + ' \u00B0 F';
                  dthreeHum.innerHTML = "Humidity: " + data.list[19].main.humidity + "%";
                
                  var dayFourCode = data.list[27].dt
                  dayFourDate = new Date(dayFourCode * 1000).toLocaleDateString("en-US")
                  dfourD.innerHTML = dayFourDate
                  var dfourSymbCode = data.list[27].weather[0].icon
                  var dfourSymbUrl = `http://openweathermap.org/img/w/${dfourSymbCode}.png`
                  dfourSymb.src = dfourSymbUrl
                  dfourTemp.innerHTML = "Temp: " + data.list[27].main.temp + ' \u00B0 F';
                  dfourHum.innerHTML = "Humidity: " + data.list[27].main.humidity + "%";
                  
                  var dayFiveCode = data.list[35].dt
                  dayFiveDate = new Date(dayFiveCode * 1000).toLocaleDateString("en-US")
                  dfiveD.innerHTML = dayFiveDate
                  var dfiveSymbCode = data.list[35].weather[0].icon
                  var dfiveSymbUrl = `http://openweathermap.org/img/w/${dfiveSymbCode}.png`
                  dfiveSymb.src = dfiveSymbUrl
                  dfiveTemp.innerHTML = "Temp: " + data.list[35].main.temp + ' \u00B0 F';
                  dfiveHum.innerHTML = "Humidity: " + data.list[35].main.temp + "%";



              })
          }
      })

    }

var cityButtons = document.querySelectorAll("button");
    for (var i = 0; i < cityButtons.length; i++) {
        var returnSearch = cityButtons[i];


        returnSearch.addEventListener('click', function(event) {
            event.preventDefault();
            var selectLocation = this.innerHTML
            console.log(selectLocation);

            var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectLocation}&units=imperial&appid=97bb9481f4dbe83812bb1a83ed5636cb`
            fetch(apiUrl)
              .then(function (response) {
                  if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        console.log(data);
                       
                        var unixCode = data.dt
                        console.log(unixCode)
                        currentDate = new Date(unixCode * 1000).toLocaleDateString("en-US")
                        console.log(currentDate)
                        showLocation.innerHTML = selectLocation + " " + currentDate
                        var currSymbCode = data.weather[0].icon
                        var currSymbUrl = `http://openweathermap.org/img/w/${currSymbCode}.png`
                        currSymb.src = currSymbUrl
                        currTemp.innerHTML = "Temperature: " + data.main.temp + ' \u00B0 F';
                        currHum.innerHTML = "Humidity: " + data.main.humidity + "%"
                        currWind.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
                        
                        currentLat = data.coord.lat
                        currentLon = data.coord.lon
                        var uVIndexUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${currentLat}&lon=${currentLon}&appid=97bb9481f4dbe83812bb1a83ed5636cb`
                        fetch(uVIndexUrl)
                          .then(function (response) {
                              console.log(response);
                              response.json().then(function (data) {
                                  console.log(data);
                                  currUv.innerHTML = data.value;
                                  if (data.value >= 5.1) {
                                      compShade.className = "badge badge-danger"
                                  } else if (data.value <= 2) {
                                      compShade.className = "badge badge-success"
                                  } else if (data.value >= 2.1 && data.value <= 5) {
                                      compShade.className = "badge badge-warning"
                                  }
                              })
                          })
                    })
                  }
              })
        var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectLocation}&units=imperial&appid=97bb9481f4dbe83812bb1a83ed5636cb`

        fetch(fiveDayUrl)
          .then(function (response) {
              if (response.ok) {
                  console.log(response);
                  response.json().then(function (data) {
                      console.log(data);
                  
                var dayOneCode = data.list[3].dt
                 console.log(dayOneCode)
                dayOneDate = new Date(dayOneCode * 1000).toLocaleDateString("en-US")
                console.log(dayOneDate)
                  doneD.innerHTML = dayOneDate
                  var doneSymbCode = data.list[3].weather[0].icon
                  var doneSymbUrl = `http://openweathermap.org/img/w/${doneSymbCode}.png`
                  doneSymb.src = doneSymbUrl
                  doneTemp.innerHTML = "Temp: " + data.list[3].main.temp + ' \u00B0 F';
                  doneHum.innerHTML = "Humidity: " + data.list[3].main.humidity + "%";
                  var dayTwoCode = data.list[10].dt
                  dayTwoDate = new Date(dayTwoCode * 1000).toLocaleDateString("en-US")
                  dtwoD.innerHTML = dayTwoDate
                  var dtwoSymbCode = data.list[10].weather[0].icon
                  var dtwoSymbUrl = `http://openweathermap.org/img/w/${dtwoSymbCode}.png`
                  dtwoSymb.src = dtwoSymbUrl
                  dtwoTemp.innerHTML = "Temp: " + data.list[10].main.temp + ' \u00B0 F';
                  dtwoHum.innerHTML = "Humidity: " + data.list[10].main.humidity + "%";
                  var dayThreeCode = data.list[19].dt
                  dayThreeDate = new Date(dayThreeCode * 1000).toLocaleDateString("en-US")
                  dthreeD.innerHTML = dayThreeDate
                  var dthreeSymbCode = data.list[19].weather[0].icon
                  var dthreeSymbUrl = `http://openweathermap.org/img/w/${dthreeSymbCode}.png`
                  dthreeSymb.src = dthreeSymbUrl
                  dthreeTemp.innerHTML = "Temp: " + data.list[19].main.temp + ' \u00B0 F';
                  dthreeHum.innerHTML = "Humidity: " + data.list[19].main.humidity + "%";
                  var dayFourCode = data.list[27].dt
                  dayFourDate = new Date(dayFourCode * 1000).toLocaleDateString("en-US")
                  dfourD.innerHTML = dayFourDate
                  var dfourSymbCode = data.list[27].weather[0].icon
                  var dfourSymbUrl = `http://openweathermap.org/img/w/${dfourSymbCode}.png`
                  dfourSymb.src = dfourSymbUrl
                  dfourTemp.innerHTML = "Temp: " + data.list[27].main.temp + ' \u00B0 F';
                  dfourHum.innerHTML = "Humidity: " + data.list[27].main.humidity + "%";
                  var dayFiveCode = data.list[35].dt
                  dayFiveDate = new Date(dayFiveCode * 1000).toLocaleDateString("en-US")
                  dfiveD.innerHTML = dayFiveDate
                  var dfiveSymbCode = data.list[35].weather[0].icon
                  var dfiveSymbUrl = `http://openweathermap.org/img/w/${dfiveSymbCode}.png`
                  dfiveSymb.src = dfiveSymbUrl
                  dfiveTemp.innerHTML = "Temp: " + data.list[35].main.temp + ' \u00B0 F';
                  dfiveHum.innerHTML = "Humidity: " + data.list[35].main.temp + "%";
                  })
              }
          })


        })}


searchButton.addEventListener("click", currentWeather)
searchButton.addEventListener("click", addToArray)