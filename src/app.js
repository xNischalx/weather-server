//core modules
const path = require('path');
const geoCode= require('../src/utils/geocode');
const forecast = require('../src/utils/forecastCode');

//npm modules
const hbs = require('hbs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//set paths
const staticPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set handle bars engie
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//index page
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        desc: 'Please enter a location',
        created: 'copyright@Nischal Newar'
    });
});

//about page
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        desc: 'Demo Weather Application to get the Weather Information',
        created: 'copyright@Nischal Newar'
    });
})

//help page
app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help Page',
        desc: 'You could go to the homepage and check the weather of a location',
        created: 'copyright@Nischal Newar'
    });
})
//help page error
app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMessage: 'Help Content Not Found'
    });
})

//setup weather page
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide a valid address"
        });
    }
    geoCode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error: error});
        }
        forecast(latitude,longitude,(error,{temperature,rain,forecast} = {}) => {
            if(error){
                return res.send({error: error});
            }
            res.send({
                location: location,
                forecast: `Daily forecast - ${forecast} Current Temperature - ${temperature} with ${rain} chance to rain.`
            });
        })
    })
});

//set 404 page Not found
app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: '404 Not Found'
    })
});

//start the server
app.listen(port,() => {
    console.log("Application is running on port 3000");
})