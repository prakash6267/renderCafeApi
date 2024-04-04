require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const MONGO_URL = process.env.MONGO_URL 
const PORT = process.env.SERVER_PORT || 4000
const userRoute = require('./routes/userR')
const categoryRoute = require('./routes/categoryR')
const productRoute = require('./routes/productR')
const cafeRoute    = require('./routes/cafeR')
const bannerRoute  = require('./routes/bannerR')


app.use(bodyParser.json())
app.use(morgan('tiny')) 

app.use(cors())
app.options('*', cors())

app.use('/api/user', userRoute)
app.use('/api/category', categoryRoute)
app.use('/api/product', productRoute)
app.use('/api/cafe', cafeRoute)
app.use('/api/banner', bannerRoute)
// //------------------------

// app.use(fileUpload({
//     useTempFiles:true
// }))
// //-------------------------


mongoose.connect(MONGO_URL, {dbName: 'MyCafe',  retryWrites: true, w: 'majority' })

.then( () =>{console.log("Database Connecting is ready...") })
.catch(error => console.error('Connection failed', error))

app.listen(PORT||4000, () => {

    console.log("Server is listening on port 4000");
});