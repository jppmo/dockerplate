const OAuthServer = require('express-oauth-server');
const oAuthService = require('../services/oauth.service');

module.exports = new OAuthServer({
    model: oAuthService,
    grants: ['authorization_code', 'refresh_token'],
    accessTokenLifetime: 60 * 60 * 24 * 2, // 48 hours, or 2 day
    allowEmptyState: true,
    allowExtendedTokenAttributes: true,
});