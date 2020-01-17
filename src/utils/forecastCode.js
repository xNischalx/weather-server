const call = require('request');

const forecastDetails = (lat,long,callback) => {
    const url = `https://api.darksky.net/forecast/893fe35cd236183a22c0145c7912d720/${lat},${long}`;
    call({uri: url, json: true}, (error,response) => {
        if(response.body.error) {
            callback(response.body.error, undefined);
        } else if(error) {
            callback('Internet is not working', undefined);
        } else {
            callback(undefined, {
                temperature: response.body.currently.temperature,
                rain: response.body.currently.precipProbability,
                forecast: response.body.daily.summary
            })
        }
    })
}

module.exports = forecastDetails;