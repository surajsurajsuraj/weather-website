const request = require('postman-request');
const chalk = require('chalk')
const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3VyYWpjaGF1ZGhhcnkiLCJhIjoiY2tjdWpxaG94MXp1cjJ3b2I3MGl1Ym55ciJ9.nZk-4f4dYR9fqyt86gd7DA'
    request({url:geocodeURL,json: true}, (error,response) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        }
        else if(response.body.features.length == 0){
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode