function DateFormat() {
  let DATE = document.querySelector(".date");
  let now = new Date();
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
  if (time < 10 && minute < 10) {
    DATE.innerHTML = `${day}  0${time} : 0${minute}`;
  } else if (time > 10 && minute < 10) {
    DATE.innerHTML = `${day}  ${time} : 0${minute}`;
  } else if (time < 10 && minute > 10) {
    DATE.innerHTML = `${day}  0${time} : ${minute}`;
  } else {
    DATE.innerHTML = `${day}  ${time} : ${minute}`;
  }
}
DateFormat();

//display city function

function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-box");
  let city = searchInput.value;
  if (city) {
    let apiKey = "c688de8b6b60cb97fb72684edb3693ab";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${url}&appid=${apiKey}`).then(DisplayTemperature);
  } else {
    alert("Enter the city name");
  }
}

function DisplayTemperature(response) {
  console.log(response);
  let searchInput = document.querySelector("#search-box");
  let city = searchInput.value;
  let h5 = document.querySelector("h5");
  let CITY = document.querySelector(".city");
  let temperature = Math.round(response.data.main.temp);
  if (city) {
    h5.innerHTML = `It is currently ${temperature}°C in ${city}`;
    CITY.innerHTML = city;
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
}

function currentLocation(position) {
  console.log(position);
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

let Button = document.querySelector("button");
Button.addEventListener("click", display);
