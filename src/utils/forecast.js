const request = require('request')


const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/594377cdd61f53e51570198e6632868c/' + lat + ',' + long + '?units=si'

    request( { url, json: true } , (error,{body}) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error){
            callback('error code '+body.code+' : '+body.error,undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The low temprature in the day is '+ body.daily.data[0].temperatureLow +' and the height is '+body.daily.data[0].temperatureHigh+'. There is a ' + body.currently.precipProbability + '% chance of rane')
        }
    })
    
}

module.exports = forecast