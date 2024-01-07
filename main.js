const apiKey = "b2bf63e6bfc381466e50b234c9a82d76";
const form = document.getElementById("form");
const city = document.getElementById("city");
const img = document.querySelector("img");
const weatherDescription = document.querySelector("#weather-description");
const feeling = document.getElementById("feeling");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const degree = document.getElementById("degree");
const description = document.querySelector(".description");
const error = document.querySelector(".error");
const cityName = document.querySelector(".city-name");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = city.value;
  getWeather(cityValue);
});

async function getWeather(cityValue) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  console.log(data);

  if (data.message) {
    description.classList.add("d-none");
    error.textContent = data.message
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    error.classList.remove("d-none");
  } else {
    description.classList.remove("d-none");
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    cityName.innerHTML = data.name;
    weatherDescription.textContent = `Weather Description: ${data.weather[0].description
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ")}`;
    feeling.textContent = `Feels Like: ${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.innerHTML = `Wind Speed: ${data.wind.speed}m/s`;
    degree.innerHTML = `${Math.round(data.main.temp)}°C`;
    error.classList.add("d-none");
  }
}
