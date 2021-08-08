const  express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser")
const path= require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT|| 8080

//request log
app.use(morgan('tiny'));

//momgodbconnect
connectDB();

//parse request to bosy-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname, "views/data"))

app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(3000, ()=>{console.log('Server Berjalan pada http://localhost:3000')});