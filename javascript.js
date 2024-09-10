async function getWeather(address) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?key=A55MNK7S97VENY2ZUEWCWZSZR`
  );
  const weather = await response.json();
  console.log(weather);
  const today = todayWeather(weather);
  const forecast = fiveDayForecast(weather);

  return weather;
}

function todayWeather(weather) {
  const currentConditions = {
    conditions: weather.currentConditions.conditions,
    temp: weather.currentConditions.temp,
    feelsLike: weather.currentConditions.feelslike,
  };
  return currentConditions;
}

function fiveDayForecast(weather) {
  const forecast = [];
  for (let i = 0; i <= 5; i++) {
    const futureConditions = {
      date: weather.days[i].datetime,
      conditions: weather.days[i].conditions,
      lowTemp: weather.days[i].tempmin,
      highTemp: weather.days[i].tempmax,
      description: weather.days[i].conditions,
    };
    forecast.push(futureConditions);
  }
  return forecast;
}

const form = document.querySelector("form");
const locationInput = document.querySelector("input#location");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = locationInput.value;
  renderPage(location);
});

async function renderPage(location) {
  const weather = await getWeather(location);
  const today = todayWeather(weather);

  const todayTemp = document.querySelector(".todaytemp");
  todayTemp.textContent = today.temp + "°";
  const todayDesc = document.querySelector(".todaydesc");
  todayDesc.textContent = today.conditions;

  const forecast = fiveDayForecast(weather);

  const forecastDiv = document.querySelector(".forecast");
  for (days in forecast) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = forecast[days].date;

    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = forecast[days].description;
    day.appendChild(description);

    const temps = document.createElement("div");
    temps.classList.add("temps");

    const highTemp = document.createElement("div");
    highTemp.classList.add("hightemp");
    highTemp.textContent = forecast[days].highTemp;
    temps.appendChild(highTemp);

    const lowTemp = document.createElement("div");
    lowTemp.classList.add("hightemp");
    lowTemp.textContent = forecast[days].lowTemp;
    temps.appendChild(lowTemp);

    day.appendChild(temps);
    forecastDiv.appendChild(day);
  }
}

renderPage("01520");
