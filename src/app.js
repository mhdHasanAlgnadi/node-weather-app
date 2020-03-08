const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define paths for Express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebaes engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Steup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Hasan'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About US',
        name: 'Hasan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Message',
        name:'Hasan al janady'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'address is needed'
        })
    }
    geocode(req.query.address,(error,{long,lat,location}={}) => {
        if (error) {
            return res.send({
                error:error
            })
        }
    
        forecast(lat, long, (error, forecastData) => {
            if (error){
                return res.send({
                    error:error
                })
            }
    
            res.send({
                location,
                forecast:forecastData
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title:'404 help article not found',
        name:'Hasan al janady'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title:'404 page not found',
        name:'Hasan al janady'
    })
})

app.listen(port,() => {
    console.log('server is up on port'+port+'.')
})