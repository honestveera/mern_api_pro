//Import Libraries
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');

// Import External modules
let apiRoutes = require('./routes/route');


//Start App
let app = express();


//Use API routes in the App
app.use('/api', apiRoutes)

// Config CORS
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// Config BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//Connect to mongoose
mongoose.Promise = global.Promise;
const dbPath = 'mongodb://localhost/api_pro';
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('Connected Mongo DB: ' + dbPath);
}, error => {
    console.log(error, 'error');
})

//Assign port
var port = process.env.PORT || 8080;

// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));


// Launch app to the specified port
app.listen(port, function () {
    console.log("Running FirstRest on Port " + port);
})