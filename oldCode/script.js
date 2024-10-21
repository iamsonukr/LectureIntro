function showDateTime() {
    // Display only the current time
    const date = new Date();
    const timeString = date.toLocaleTimeString(); // Get the time part only
    document.getElementById("dateTime").innerText =  timeString;
}

// show weather
const api = {
    key: ENV.API_KEY,
    base: ENV.API_URL
};

function fetchWeather() {
    fetch(`${api.base}weather?q=Delhi,IN&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            updateWeatherUI(result);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            document.getElementById('temperature').textContent = 'Weather data unavailable';
            document.getElementById('weatherCondition').textContent = 'Please try again later';
        });
}

function updateWeatherUI(weather) {
    document.getElementById('temperature').textContent = `${Math.round(weather.main.temp)}°C`;
    document.getElementById('weatherCondition').textContent = weather.weather[0].main;

    if (weather.main.temp > 16) {
        document.querySelector('.app').classList.add('warm');
    } else {
        document.querySelector('.app').classList.remove('warm');
    }
}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

const setDay=()=>{
    let day=window.prompt("What is the day ?")
    document.getElementById('noOfDay').innerHTML=day

}

// GREETINGS
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = "Good morning!";
    else if (hour < 18) greeting = "Good afternoon!";
    else greeting = "Good evening!";
    document.getElementById('greeting').textContent = `${greeting}`;
}

function updateDateTime() {
    const now = new Date();
    document.getElementById('currentDate').textContent = dateBuilder(now);
}

// Initial calls
fetchWeather();
updateGreeting();
updateDateTime();
showDateTime()

// Update weather every 5 minutes
setInterval(fetchWeather, 300000);

// Update date and greeting every minute
setInterval(() => {
    updateDateTime();
    updateGreeting();
    showDateTime()
}, 1000);