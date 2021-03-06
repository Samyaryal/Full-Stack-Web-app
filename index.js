const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./Services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]

    })
);



app.use(passport.initialize());

app.use(passport.session());

require('./Routes/authRoutes')(app);
require('./Routes/billingRoutes')(app);
require('./Routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    //Express will serve up oroduction assets 
    //like our main.js file of main.css file!
    //app.use(express.static('client/build'));
    
    app.use(express.static('client/build'));  
    const path = require('path');
    //app.use(express.static(path.join(__dirname, 'client/build')));

    //Express will serve up the index.html file
    //if it doesn't recognise the route
    
    app.get('*', (req, res) => { 
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000
app.listen(PORT)

