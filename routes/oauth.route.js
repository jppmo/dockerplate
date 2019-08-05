const path = require('path');
const oauthServer = require('../oauth/server.js');
const userService = require('../services/user.service');
const debugAuthorization = require('debug')('app:flow:authorization'); debugAuthorization.enabled = true;
const debugAuthentication = require('debug')('app:flow:authentication'); debugAuthentication.enabled = true;
const debugToken = require('debug')('app:flow:token'); debugToken.enabled = true;
const express = require('express');
const router = express.Router();


router.get('/token', (req, res) => {
    //DebugControl.log.parameters(Object.keys(req.body).map(k => ({ name: k, value: req.body[k] })))
    res.sendFile(path.join(__dirname, '../public/form2.html'))
})

    // Post token.
router.post('/token', (req, res, next) => {
    debugToken('BEGIN FLOW: Token');
    next()
}, oauthServer.token({
    requireClientAuthentication: { // whether client needs to provide client_secret
        // 'authorization_code': false,
    },
}));  // Sends back token

// Get authorization.
router.get('/authorize', function (req, res) {
    // Redirect anonymous users to login page.
    if (!req.app.locals.user) {
        //return res.redirect(util.format('/login?redirect=%s&client_id=%s&redirect_uri=%s', req.path, req.query.client_id, req.query.redirect_uri));
        res.sendFile(path.join(__dirname, '../public/form.html'));
    }

});

router.post('/authorize', (req, res, next) => { // sends us to our redirect with an authorization code in our url
    debugAuthorization('Begin');
    return next()
}, oauthServer.authorize({
    authenticateHandler: {
        handle: async (req, res) => {
            debugAuthentication('Authenticate Handler')
            const clientId = req.body.client_id;
            const id = await userService.getUserIdByClientId(clientId);
            debugAuthentication('CLIENT %O AUTHENTICATED. ID is %d', req.body, id);
            return { id: id };
        }
    }
}));


module.exports = router;