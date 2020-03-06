const request = require('request')

const geocode = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1IjoibWhkLWhhc2FuIiwiYSI6ImNrNndwbTExdDBkdmgzbHF2bDd2ODBkdHkifQ.wWU089EpC76MhIg--EdbfQ&limit=1'

    request( { url, json: true } ,(error,{body}) => {
        if (error){
            callback('Unable to connect to location service',undefined)
        } else if (body.features.length === 0){
            callback('Unable to find Location. Try another search',undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            const data = {
                long:longitude,
                lat:latitude,
                location:location
            }
            callback(undefined,data)
        }
 
    })

}

module.exports = geocode