async function getWeather(address) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?key=A55MNK7S97VENY2ZUEWCWZSZR`
  );
  const weather = await response.json();
  console.log(weather);
  todayWeather(weather);
  fiveDayForecast(weather);
}

function todayWeather(weather) {
  const currentConditions = {
    conditions: weather.currentConditions.conditions,
    temp: weather.currentConditions.temp,
    feelsLike: weather.currentConditions.feelslike,
  };
  console.log(currentConditions);
}

function fiveDayForecast(weather) {
  const forecast = [];
  for (let i = 0; i <= 5; i++) {
    const futureConditions = {
      date: weather.days[i].datetime,
      conditions: weather.days[i].conditions,
      lowTemp: weather.days[i].tempmin,
      highTemp: weather.days[i].tempmax,
      feelsLike: weather.days[i].feelslike,
      description: weather.days[i].description,
    };
    forecast.push(futureConditions);
  }
  console.log(forecast);
}

getWeather("01520");
