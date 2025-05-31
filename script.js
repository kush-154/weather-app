const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector("#city");
const container = document.querySelector("#container");
const apikey = "7657c0648de544796d267f52a43ce5dd";


weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            container.innerHTML = "<p>Loading...</p>"; // Add loading state
            const weatherdata = await getWeatherData(city);
            displayWeatherInfo(weatherdata);
        }
        catch (error) {
            displayError(error.message);
        }
    }
});

// Add this new function for error handling
function displayError(message) {
    container.innerHTML = "";
    container.classList.remove('visible');
    
    const errorDisplay = document.createElement("div");
    errorDisplay.className = "error-message";
    errorDisplay.textContent = `Error: ${message}`;
    
    container.appendChild(errorDisplay);
    container.classList.add('visible');
}

async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("City not found or API error");
    }
    const data = await response.json();
    return data;
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    
    container.innerHTML = "";
    container.classList.remove('visible');
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherIcon = document.createElement("img");
    
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.classList.add('weather-icon');
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.round(temp)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    
    // Add staggered animation delay
    [tempDisplay, humidityDisplay, descDisplay].forEach((el, i) => {
        el.style.animationDelay = `${(i + 1) * 0.2}s`;
    });
    
    container.append(cityDisplay, weatherIcon, tempDisplay, humidityDisplay, descDisplay);
    
    // Trigger container animation
    setTimeout(() => container.classList.add('visible'), 100);
}
