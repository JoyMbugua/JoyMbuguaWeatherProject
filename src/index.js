import axios from "axios";
function showCurrentWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img 
              src="${response.data.condition.icon_url}"
              class="temperature-icon"/>`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = currentDate(date);
  humidityElement.innerHTML = `Humidity: <span class="humidity">${response.data.temperature.humidity}%</span>`;
  windSpeedElement.innerHTML = `Wind-speed: <span class="wind-speed">${response.data.wind.speed}km/h</span>`;
  currentTemperature.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function currentDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apikey = "0de40f3ac6t7b9b23817fc4oa7443d4f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(seeForecast);
}

function seeForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
              <span class="weather-forecast-date">${formatDay(day.time)}</span>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
              <span class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"><strong>${Math.round(
                  day.temperature.maximum
                )}&deg</strong>
                </span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}&deg</span>
              </span>
              </div>
              `;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
searchCity("Sydney");

seeForecast();
