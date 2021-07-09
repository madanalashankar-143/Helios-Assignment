require('./config/config');
require('./models/db');
require('./config/passportConfig');
require('atob');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

const app = express();

app.use(express.urlencoded( {extended: false} ))
app.use(bodyParser.json());

app.use(cors());  //its use to communicate between the ports and its activate.

app.use(passport.initialize()); //

app.use('/api', rtsIndex);

//Global validation
app.use( (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(error.errors).forEach(key => valErrors.push(error.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started at a Port No : ${process.env.PORT}`);
})