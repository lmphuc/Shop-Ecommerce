const express = require('express');
const app = express();

const cookieParser =require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

const errorMiddleware = require('./middlewares/error')

app.use(express.json({limit:'10000kb'})); 
app.use(express.urlencoded({ limit:'10000kb', extended: true }));
app.use(cookieParser());
app.use(fileUpload());



//import all route
const products= require('./routes/product');
const auth= require('./routes/auth');
const order = require('./routes/order');

//dotenv.config({ path: 'backend/config/config.env' })
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)

if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname,'../client/build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
    })
}

//Middleware to hand errors
app.use(errorMiddleware);


module.exports = app    