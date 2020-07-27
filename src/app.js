//core modules
const path = require('path');
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
        desc: 'Demo Weather Application',
        created: 'copyright@Nischal Newar'
    });
});

//about page
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        desc: 'Demo Weather Application',
        created: 'copyright@Nischal Newar'
    });
})

//help page error
app.get('about/*',(req,res) => {
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
    forecast(req.query.address,(error,{temperature,humidity,forecast,country,icon} = {}) => {
            if(error){
                return res.send({error: error});
            }
            res.send({
                location: `${req.query.address}, ${country}`,
                temperature: `${temperature}`,
                forecast: `${forecast}`,
                humidity: `${humidity}`,
                icon: `${icon}`
            });
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
})