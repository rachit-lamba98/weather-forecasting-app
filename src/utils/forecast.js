const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/68918654bec2d4662f9b96a984ca0fc2/' + latitude +','+longitude +'?units=si'
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
        rainChance: body.currently.precipProbability
      })
    }
  })
}

module.exports = forecast
