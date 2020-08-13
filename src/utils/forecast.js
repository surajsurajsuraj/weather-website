const request = require('postman-request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ed73eb7ed9bf9f4c3bc1ab5dad0148f2&query='+ longitude +','+ latitude+'&units=f';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + response.body.current.temperature + ' degress out.')
        }
    })
}

module.exports = forecast