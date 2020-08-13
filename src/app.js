const path= require('path')
const express = require('express')
const hbs = require('hbs');
const geocode=require('./utils/geocode')
const forecast= require('./utils/forecast')

const { registerPartials } = require('hbs');
const app=express()

//setting up paths for express config
const publicDirectoryPath= path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set handlebars and view locations
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        createdBy: 'Suraj'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'How can I help you?',
        createdBy:'Suraj'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        createdBy: 'Suraj'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'no address provided'
        })
    }
    
    geocode(req.query.address,(error,geodata)=>{
        
        if(error){
            return res.send({
                error
            })
        }
        console.log(geodata)
        forecast(geodata.longitude,geodata.latitude,(error,forecastdata)=>{
            if(error){
                return res.send({
                    errorMessage : error
                })
            }
            res.send({
                forecast: forecastdata,
                location: geodata.location,
                address: req.query.address
            })

        })
    })
    
})



app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        errorMessage: 'help article not found',
        createdBy:'Suraj'
    })
}) 

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        errorMessage: 'Page not found',
        createdBy:'Suraj'
    })
})

app.listen('3000',()=>{
    console.log('app started')
})