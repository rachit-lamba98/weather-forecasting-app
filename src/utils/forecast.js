const request = require('request')

//Configure your accessToken here
const accessToken = '68918654bec2d4662f9b96a984ca0fc2'

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/' + accessToken + '/' + latitude +','+longitude +'?units=si'
  request({url, json:true}, (error, {body}) => {
    if(error){
      callback('Could not connect to the service.', undefined)
    }
    else if(body.error){
      callback('Could not find the location, latitude or longitude incorrect.', undefined)
    }
    else{
      callback(undefined, {
        temperature: body.currently.temperature,
        rainChance: body.currently.precipProbability,
        summary: body.hourly.summary
      })
    }
  })
}

module.exports = forecast
