const display = document.getElementById('display')
const forecasts = []

function Forecast(city, currentTemp, conditions, max, min, date, icon){
    this.city = city;
    this.currentTemp = currentTemp;
    this.conditions = conditions
    this.max = max;
    this.min = min;
    this.date = date;
    this.icon = icon;
}

async function stageForecast(){
    const location = document.getElementById('location').value
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=5fca86161e294414a6b221028240306&q=${location}&days=3&aqi=no&alerts=no`, {mode: 'cors'})
    const weatherData = await response.json();
    console.log(weatherData)
    let city = weatherData.location.name; 
    let currentTemp = weatherData.current.temp_f;
    let conditions = weatherData.current.condition.text;
    let max = weatherData.forecast.forecastday[0].day.maxtemp_f;
    let min = weatherData.forecast.forecastday[0].day.mintemp_f;
    let date = weatherData.forecast.forecastday[0].date;
    let icon = removeDomain(weatherData.current.condition.icon);
    return new Forecast(city, currentTemp, conditions, max, min, date, icon)
}

function removeDomain(str) {
    return str.replace(/^.{20}/, '.');
}

async function addToArray(){
    clearForecasts()
    const newForecast =  await stageForecast()
    forecasts.push(newForecast)
    console.log(forecasts[0])
    displayForecasts()
}

function displayForecasts(){
    for(i=0; i < forecasts.length ; i++){
        createForecastCard(forecasts[i])
    }
}

function clearForecasts(){
    forecasts.splice(0, 1)
    display.textContent = ''
}

function createForecastCard(forecast){
    console.log(forecast)
    const content = document.getElementById('display')
    const forecastCard = document.createElement('div')
    const forecastCity = document.createElement('div')
    const forecastImg = document.createElement('img')
    const forecastCondition = document.createElement('div') // temp and condition
    const forecastHigh = document.createElement('div')
    const forecastLow = document.createElement('div')

    forecastCity.textContent =  `${forecast.city}`
    forecastImg.src = `${forecast.icon}`
    forecastCondition.textContent =  `${forecast.currentTemp} F, ${forecast.conditions}`
    forecastHigh.textContent =  `High: ${forecast.max} F`
    forecastLow.textContent = `Low: ${forecast.min} F`

    forecastCard.classList.add('card')
    forecastCard.appendChild(forecastCity)
    forecastCard.appendChild(forecastImg)
    forecastCard.appendChild(forecastCondition)
    forecastCard.appendChild(forecastHigh)
    forecastCard.appendChild(forecastLow)

    content.appendChild(forecastCard)
}

const btn = document.getElementById('btn')
btn.addEventListener('click', addToArray)
