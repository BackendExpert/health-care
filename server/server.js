const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); 
const bodyParser = require('body-parser');


// database connections
const ConnectDB = require('./config/DB');

// routes
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const paitentRoute = require('./routes/patientRoute')
const doctorRoute = require('./routes/doctorRoute')
const appoinmentRoute = require('./routes/appoinmentRoute')

const app = express();
const PORT = process.env.PORT || 5000;

ConnectDB()
  
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/paitent', paitentRoute)
app.use('/doctor', doctorRoute)
app.use('/appoinments', appoinmentRoute)

app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});