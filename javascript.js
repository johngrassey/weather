async function getWeather(address) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}?key=A55MNK7S97VENY2ZUEWCWZSZR`
  );
  const weather = await response.json();
  console.log(weather);
}

getWeather("01520");
