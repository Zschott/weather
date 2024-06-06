// http://api.weatherapi.com/v1/forecast.json?key=5fca86161e294414a6b221028240306&q=London&days=3&aqi=no&alerts=no
// `http://api.weatherapi.com/v1/forecast.json?key=5fca86161e294414a6b221028240306&q=${location)&days=3&aqi=no&alerts=no`

/*  console.log(`city: ${city}`)
    console.log(`current condition: ${conditionText}`)
    console.log(`current temp: ${current}`)
    console.log(`max temp: ${max}`)
    console.log(`min temp: ${min}`) */

const forecasts = []

function Forecast(city, currentTemp, conditions, max, min, date, icon){
    this.city = city;
    this.currentTemp = currentTemp;
    this.conditions = conditions
    this.max = max;
    this.min = min;
    this.condition = condition;
    this.date = date;
    this.icon = icon;
}

async function stageForecast(){
    const location = document.getElementById('location').value
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=5fca86161e294414a6b221028240306&q=${location}&days=3&aqi=no&alerts=no`, {mode: 'cors'})
    const weatherData = await response.json();
    console.log(weatherData)
    let city = weatherData.location.name; 
    let current = weatherData.current.temp_f;
    let conditionText = weatherData.current.condition.text;
    let max = weatherData.forecast.forecastday[0].day.maxtemp_f;
    let min = weatherData.forecast.forecastday[0].day.mintemp_f;
    let date = weatherData.forecast.forecastday[0].date;
    let icon = weatherData.current.condition.icon;
    return new Forecast(city, current, conditionText, max, min, date, icon)
}

function addToArray(){
    const newForecast = stageForecast()
    forecasts.push(newForecast)
    displayForecasts()
}

function displayForecasts(){
    for(i=0; i < forecasts.length ; i++)
        createForecastCard(forecasts[i])
        console.log(forecasts[i])
}

function createForecastCard(){
    const content = document.getElementById('display')
    const forecastCard = document.createElement('div')
    const forecastCity = document.createElement('div')
    const forecastCondition = document.createElement('div') // temp and condition
    const forecastTemps = document.createElement('div')

    forecastCity.textContent = `${forecast.city}`
    forecastCondition.textContent = `${forecast.current}, ${forecast.condition}`
    forecastTemps.textContent = `Hi: ${forecast.max}F
                                Low: ${forecast.min}F`

    forecastCard.classList.add('card')
    forecastCard.appendChild(forecastCity)
    forecastCard.appendChild(forecastCondition)
    forecastCard.appendChild(forecastTemps)

    content.appendChild(forecastCard)
}

const btn = document.getElementById('btn')
btn.addEventListener('click', addToArray)
