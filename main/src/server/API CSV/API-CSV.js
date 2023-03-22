const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const { parse } = require("csv-parse");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.csv.config.js');
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
app.get('/', (req, res) => { res.json("CSV API")});

// Listen for Requests
app.listen(3001, () => {console.log(`Server is listening on port ${port}`)})

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({ storage: storage });

app.post('./import-csv', upload.single('import-csv', (req, res) => {
    console.log(req.file)
    uploadCsv(__dirname + '/uploads/' + req.file.filename);
    res.send('File uploaded successfully');
}));

function uploadCsv(filePath) {
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = parse({ delimiter: "," })
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // remove the first line: header
            csvData.shift();

            // create a new connection to the database
            const db = mongoose.createConnection(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });

            // get a UserModel and save csvData
            const UserModel = db.model("users", userSchema);
            UserModel.insertMany(csvData, (err, docs) => {
                if (err) {
                    return console.error(err);
                } else {
                    console.log("Multiple documents inserted to Collection");
                }
            });
        }
    );
    stream.pipe(csvStream);
}