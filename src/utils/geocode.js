const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoiY3Jpc3RpYW4teHRyYSIsImEiOiJja2hmOWtreW8wM3AyMnJ1czVoeXFqaDQxIn0.mQ-Pu2_RZGrGuAGdWM11Lw&limit=1"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode