// const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const bodyParser = require('body-parser');
// const user = require('../API/models/API.model');

// const app = express();
// const port = 3003;

// // Configuring the database
// const dbConfig = require('../API/config/database.config');
// const db = mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {console.log('Successfully connected to the database')}).catch(err => {console.log('Could not connect to the database. Exiting now...', err); process.exit();});

// mongoose.Promise = global.Promise;

// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now.', err);
//     process.exit();
// });

// // JWT 
// app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  
// function(req, res) {
// 	console.log(req.user)
// 	res.redirect('/dashboard');
// }); 

// app.listen(port, () => {console.log(`Server is listening on port ${port}`)});

