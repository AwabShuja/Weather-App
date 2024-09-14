const weather = document.querySelector(".weatherApp");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".cards");
const apiKey = "d690ccb3b2590c60b35881c11db9ffd7";

weather.addEventListener("submit",async event => {
    event.preventDefault();

    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeather(city);
            displayWeatherInfo(weatherData);
        }catch(error){
            displayError(error);
        }
    }else{
        displayError("Please enter a city!");
    }
})
async function getWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);
    if (!response){
        throw new Error("Cant find the city weather");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city,
        main: {temp,humidity},
        weather:[{description,id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humiDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("city");
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("temp");
    card.appendChild(tempDisplay);

    humiDisplay.textContent = `Humidity: ${humidity}%`;
    humiDisplay.classList.add("humi");
    card.appendChild(humiDisplay);

    descDisplay.textContent = `It's a ${description}!`;
    descDisplay.classList.add("desDisplay");
    card.appendChild(descDisplay);

    weatherEmojiDisplay.textContent = getEmoji(id);
    weatherEmojiDisplay.classList.add("emoji");
    card.appendChild(weatherEmojiDisplay);
}

function getEmoji(weatherID){
    switch(true){
        case (weatherID>=200 && weatherID<300):
            return "⛈";
        case (weatherID>=300 && weatherID<400):
            return "🌧";
        case (weatherID>=500 && weatherID<600):
            return "⛈";
        case (weatherID>=600 && weatherID<700):
            return "❄";
        case (weatherID>=700 && weatherID<800):
            return "🌫";
        case (weatherID === 800):
            return "☀";
        case (weatherID>=801 && weatherID<810):
            return "☁";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}