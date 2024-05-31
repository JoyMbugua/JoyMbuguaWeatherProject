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
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `Wind-speed: ${response.data.wind.speed}km/h`;
  currentTemperature.innerHTML = Math.round(temperature);
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

function seeForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
              <div class="weather-forecast-date">Mon</div>
        <div class="weather-forecast-icon">⛅</div>
              <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature"><strong>18&deg</strong></div>
                <div class="weather-forecast-temperature">12&deg</div>
              </div>
              </div>
              `;
  });
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Sydney");

seeForecast();
