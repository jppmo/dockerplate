const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const oauthServer = require('./oauth/server.js');
const UserRoutes = require('./routes/user.route');
const OAuthRoutes = require('./routes/oauth.route');
const AuthRoutes = require('./routes/authentication.route');
const debug = require('debug')('app:init'); debug.enabled = true;
const app = express();

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/', (req, res) => res.redirect('/oauth/authorize'));

app.use('/oauth', OAuthRoutes);

app.use('/auth', AuthRoutes);

app.use('/users', (req, res, next) => {
    return next()
}, oauthServer.authenticate(), UserRoutes) // routes to access the protected stuff */

app.use(express.static('public'));

express.static(path.join(__dirname, '/public'));

// start the app
app.listen(4000, function () {
    debug('Express is running on port 4000');
});


