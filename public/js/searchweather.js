const weatherAddress = document.querySelector('form');
const address = document.querySelector('input');
const country = document.querySelector(".country");
const temperature = document.querySelector(".temperature");
const forecast = document.querySelector(".forecast");
const humidity = document.querySelector(".humidity");
const icon = document.querySelector(".app-icon");

weatherAddress.addEventListener('submit', (e) => {
    e.preventDefault();
    country.textContent = "Loading..";
    temperature.textContent = "-";
    forecast.textContent = "-";
    humidity.textContent = "-";
    fetch(`/weather?address=${address.value}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            country.textContent = data.error;
        }
        else{
            icon.innerHTML = `<img src="/img/icon/${data.icon}.png">`;
            country.textContent = data.location;
            temperature.innerHTML = `${data.temperature} <span>ºC</span>`;
            forecast.textContent = data.forecast;
            humidity.innerHTML = `<span>Humidity: </span>${data.humidity} <span>%</span>`;
        }
    })
})
})