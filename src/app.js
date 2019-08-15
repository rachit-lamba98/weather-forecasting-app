const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

filepath = path.join(__dirname, '../public')

app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')
app.use(express.static(filepath))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Rachit'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    name: 'Rachit',
    message: 'Applying my knowledge of Nodejs with this simple app.'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Rachit',
    message: 'Simply search your location in the search box to receive the weather forecast of your area.'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'You must give an address.'
    })
  }
  geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
    if(error){
      return res.send({
        error: error
      })
    }
    forecast(latitude, longitude, (error, {temperature, rainChance} = {}) => {
      if(error){
        return res.send({
          error: error
        })
      }
      res.send({
        location: location,
        forecast: 'It is currently ' + temperature + ' degrees celcius with ' + rainChance + '% chance of rainfall.'
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404-page', {
    title: 'Error 404',
    name: 'Rachit',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404-page', {
    title: 'Error 404',
    name: 'Rachit',
    errorMessage: 'The page was not found.'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
