async function getWeather(address) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?key=A55MNK7S97VENY2ZUEWCWZSZR`
  );
  const weather = await response.json();
  console.log(weather);
  const today = todayWeather(weather);
  const forecast = fiveDayForecast(weather);

  return { today, forecast };
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
      description: weather.days[i].description,
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
  const todayTemp = document.querySelector(".todaytemp");
  todayTemp.textContent = weather.today.temp + "°";

  const todayDesc = document.querySelector(".todaydesc");
  todayDesc.textContent = weather.today.conditions;
}
