const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const db = mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {console.log('Successfully connected to the database')}).catch(err => {console.log('Could not connect to the database. Exiting now...', err); process.exit();});
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now.', err);
    process.exit();
});

// SIMPLE ROUTE
app.get('/', (req, res) => { res.json({"name": "Louis", "email": "louisloh100gmail.com"})});

// Listen for Requests
app.listen(3002, () => {console.log(`Server is listening on port ${port}`)})

require('./Routes/user.routes')(app);
