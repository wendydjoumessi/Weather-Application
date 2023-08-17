function DateFormat(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let time = now.getHours();
  let minute = now.getMinutes();
  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = day;
  if (time < 10 && minute < 10) {
    return `last update; ${day}  0${time} : 0${minute}`;
  } else if (time >= 10 && minute < 10) {
    return `last update; ${day}  ${time} : 0${minute}`;
  } else if (time < 10 && minute >= 10) {
    return `${day}  0${time} : ${minute}`;
  } else {
    return `last update ${day}  ${time} : ${minute}`;
  }
}

// display forecast data

function DisplayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img src="images/weather5.png" alt="day one" /><br />
                <div class="weather=forecast=temperature">
                  <span class="weather-forecast-temperature-max">29°</span>
                  <span class="weather-forecast-temperature-min">28°</span>
                </div>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//display city function

function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-box");
  let city = searchInput.value;
  if (city) {
    let apiKey = "c688de8b6b60cb97fb72684edb3693ab";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${url}&appid=${apiKey}`).then(DisplayWeatherInformations);
  } else {
    alert("Enter the city name");
  }
}

// get forecast

function getForecast(coordinates) {
  let apikey = "0970f66f3at4b384a3196af6003beeo0";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apikey}`;
  axios.get(url).then(DisplayForecast);
}

function DisplayWeatherInformations(response) {
  let searchInput = document.querySelector("#search-box");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let city = searchInput.value;
  let h5 = document.querySelector("h5");
  let temp = document.querySelector("#Temperature");
  let CITY = document.querySelector(".city");
  let description = document.querySelector("#description");
  let Date = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);

  if (city) {
    h5.innerHTML = `It is currently ${temperature}°C in ${city}`;
    CITY.innerHTML = city;
    temp.innerHTML = temperature;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = `humidity ${response.data.main.humidity}%`;
    wind.innerHTML = `wind ${Math.round(response.data.wind.speed)}Km\h`;
    Date.innerHTML = DateFormat(response.data.dt * 1000);
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", `${response.data.weather[0].description}`);
    CelsiusTemperature = Math.round(response.data.main.temp);
    getForecast(response.data.coord);
  } else {
    alert("Please enter a city name");
    h5.innerHTML = null;
  }
}

let Search = document.querySelector("#search-form");
Search.addEventListener("submit", getCity);

// display current location

function ShowLocation(response) {
  let h5 = document.querySelector("h5");
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  h5.innerHTML = `You are currently in ${city} and it is ${temperature}°C `;
  let CITY = document.querySelector(".city");
  CITY.innerHTML = city;
  let currentTemperature = document.querySelector("#Temperature");
  currentTemperature.innerHTML = temperature;
}

function currentLocation(position) {
  let apiKey = "c688de8b6b60cb97fb72684edb3693ab";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(ShowLocation);
}
function display() {
  alert("Hello 🖐️");
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function ShowFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#Temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let FahrenheitTemperature = (CelsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
}

function ShowcelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#Temperature");
  temperatureElement.innerHTML = CelsiusTemperature;
}

let CelsiusTemperature = null;

let Button = document.querySelector("button");
Button.addEventListener("click", display);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", ShowFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", ShowcelsiusTemperature);
