const call = require('request');

const forecastDetails = (address,callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=4172b96b51e0dea32a62f7855a323a84&units=metric`;
    call({uri: url, json: true}, (error,response) => {
        if(error) {
            callback('Internet is not working', undefined);
        }else if(response.body.error) {
            callback(response.body.error, undefined);
        }else{
            callback(undefined, {
                temperature: response.body.main.temp,
                humidity: response.body.main.humidity,
                forecast: response.body.weather[0].main,
                country: response.body.sys.country,
                icon: response.body.weather[0].icon
            })
        }
    })
}
module.exports = forecastDetails;