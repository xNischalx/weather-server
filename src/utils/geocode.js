var call = require('request');

const geoCoordinates = (address, callback) => {
    const geo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?limit=1&access_token=pk.eyJ1IjoieG5pc2NoYWx4IiwiYSI6ImNrM3d3emp4MzB1NWczbHRkN3FuYTd4cG4ifQ.DlNAvyzH_XzZgDUmNyWFmg`;
    call({uri: geo, json: true}, (error, response) => {
        if(error) {
            callback('Internet is not working', undefined);
        } else if(response.body.features.length == 0 ) {
            callback('Incorrect Location. Please Try Again', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })    
}


module.exports = geoCoordinates;