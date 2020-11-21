const request = require('request')

// const location = {
//     latitude: undefined,
//     longitude: undefined,
// }

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=ba636a00d7ed1858e18f73ed5aca8266&query=" +
        encodeURIComponent(latitude) +
        "," +
        encodeURIComponent(longitude)

    request({ url, json: true }, (error, { body }) => {
        //    const data = JSON.parse(response.body)
        if (error) {
            callback('Unable to connect to the weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            const description = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike

            callback(undefined,
                `${description}: it is currently ${temperature} degrees (C) out. It feels like ${feelsLike} degrees (C)`)
        }
    })
}

module.exports = forecast