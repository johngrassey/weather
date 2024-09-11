import { parse, format } from "date-fns";
import "./styles.css";
//import "./icons/clear-day.svg";

async function getWeather(address) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?key=A55MNK7S97VENY2ZUEWCWZSZR`,
    { mode: "cors" }
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
    icon: `icons/${weather.currentConditions.icon}.svg`,
  };
  return currentConditions;
}

function fiveDayForecast(weather) {
  const forecast = [];
  for (let i = 0; i <= 5; i++) {
    const futureConditions = {
      date: parse(weather.days[i].datetime, "yyyy-MM-dd", new Date()),
      conditions: weather.days[i].conditions,
      lowTemp: weather.days[i].tempmin,
      highTemp: weather.days[i].tempmax,
      description: weather.days[i].conditions,
      icon: `/icons/${weather.days[i].icon}.svg`,
    };
    forecast.push(futureConditions);
  }
  return forecast;
}

// FORM CODE //
const form = document.querySelector("form");
const locationInput = document.querySelector("input#location");
let location = "Holden, MA";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = locationInput.value;
  renderPage(location);
});

// TEMP BUTTON CODE //

const farenheitBtn = document.querySelector(".farenheit");
const celsiusBtn = document.querySelector(".celsius");
let tempScale = "farenheit";

function tempConversion(temp, scale) {
  if (scale === "celsius") {
    return ((temp - 32) * (5 / 9)).toFixed(1);
  } else {
    return temp;
  }
}

farenheitBtn.addEventListener("click", () => {
  tempScale = "farenheit";
  renderPage(location);
});
celsiusBtn.addEventListener("click", () => {
  tempScale = "celsius";
  renderPage(location);
});

// RENDER PAGE //

async function renderPage(location) {
  const weather = await getWeather(location);
  const today = todayWeather(weather);

  // RENDER HEADER //
  const locationHeader = document.querySelector("h3");
  locationHeader.textContent = `Weather for ${weather.resolvedAddress}`;

  const todayIcon = document.querySelector("img.todayicon");
  todayIcon.setAttribute("src", today.icon);
  const todayTemp = document.querySelector(".todaytemp");
  todayTemp.textContent = tempConversion(today.temp, tempScale) + "°";
  const todayDesc = document.querySelector(".todaydesc");
  todayDesc.textContent = today.conditions;

  const forecast = fiveDayForecast(weather);

  const forecastDiv = document.querySelector(".forecast");
  forecastDiv.innerHTML = "";
  for (const days of forecast) {
    const day = document.createElement("div");
    day.classList.add("day");

    const weekday = document.createElement("div");
    weekday.classList.add("weekday");
    weekday.textContent = format(days.date, "eeee");
    day.appendChild(weekday);

    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = format(days.date, "MMM dd");
    day.appendChild(date);

    const icon = document.createElement("img");
    icon.classList.add("forecastimg");
    icon.setAttribute("src", days.icon);
    day.appendChild(icon);

    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = days.description;
    day.appendChild(description);

    const temps = document.createElement("div");
    temps.classList.add("temps");

    const highTemp = document.createElement("div");
    highTemp.classList.add("hightemp");
    highTemp.textContent = tempConversion(days.highTemp, tempScale) + "°";
    temps.appendChild(highTemp);

    const lowTemp = document.createElement("div");
    lowTemp.classList.add("lowtemp");
    lowTemp.textContent = tempConversion(days.lowTemp, tempScale) + "°";
    temps.appendChild(lowTemp);

    day.appendChild(temps);
    forecastDiv.appendChild(day);
  }
}

renderPage(location);
