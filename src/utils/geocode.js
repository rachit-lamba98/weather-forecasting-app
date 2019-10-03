const request = require('request')

//Configure your accessToken here
const accessToken='pk.eyJ1IjoicmFjaGl0MzQ1IiwiYSI6ImNqejVqYW9qZTBwanUzb20yNmMyZ2FjZWcifQ.Oy3ydxGRyBE1tpBgTTqAWA'

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token='+ accessToken +'&limit=1'
  request({url: url, json: true}, (error, {body}) => {
    if(error){
      callback('Unable to connect to internet services.', undefined)
    }
    else if(body.features.length === 0){
      callback('Unable to find the location. Try another search query.', undefined)
    }
    else{
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      } )
    }
  })
}

module.exports = geocode
