// See https://oauth2-server.readthedocs.io/en/latest/model/spec.html for what you can do with this
const debug = require('debug')('app:oAuthModel'); debug.enabled = true;
const sql = require('../db/database');

const db = { // Here is a fast overview of what your db model should look like
    authorizationCode: {
        authorizationCode: '', // A string that contains the code
        expiresAt: new Date(), // A date when the code expires
        redirectUri: '', // A string of where to redirect to with this code
        client: null, // See the client section
        user: null, // Whatever you want... This is where you can be flexible with the protocol
    },
    client: { // Application wanting to authenticate with this server
        clientId: '', // Unique string representing the client
        clientSecret: '', // Secret of the client; Can be null
        grants: [], // Array of grants that the client can use (ie, `authorization_code`)
        redirectUris: [], // Array of urls the client is allowed to redirect to
    },
    token: {
        accessToken: '', // Access token that the server created
        accessTokenExpiresAt: new Date(), // Date the token expires
        client: null, // Client associated with this token
        user: null, // User associated with this token
    },
};

const getClient = async (clientId, clientSecret) => {
    /* debug({
        title: 'Get Client',
        parameters: [
            { name: 'clientId', value: clientId },
            { name: 'clientSecret', value: clientSecret },
        ]
    });
 */
    debug(`GETCLIENT 
    %O`, {
        clientId: clientId,
        clientSecret: clientSecret
    });

    /* const client = {
        clientId: clientId,
        clientSecret: clientSecret,
        grants: ['authorization_code', 'refresh_token'],
        redirectUris: ['http://localhost:4000/oauth/token']
    }; */

    const client = {
        clientId: clientId,
        clientSecret: clientSecret,
        grants: ['authorization_code', 'refresh_token'],
        redirectUris: ['http://localhost:4010']
    };

    return new Promise(resolve => {
        resolve(client)
    });
};

// const generateAccessToken = async (client, user, scope) => { // generates access tokens
//   log({
//     title: 'Generate Access Token',
//     parameters: [
//       {name: 'client', value: client},
//       {name: 'user', value: user},
//     ],
//   })
//
// };

const saveToken = async (token, client, user) => {
    /* This is where you insert the token into the database */
    /* debug({
        title: 'Save Token',
        parameters: [
            { name: 'token', value: token },
            { name: 'client', value: client },
            { name: 'user', value: user },
        ],
    }) */

    debug(`SAVETOKEN 
    %O`, {
        token: token,
        client: client,
        user: user
    });

    db.token = {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken, // NOTE this is only needed if you need refresh tokens down the line
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        client: client,
        user: user,
    }

    const params = [
        db.token.accessToken,
        db.token.accessTokenExpiresAt,
        client.clientId,
        user.id];

    const query = `insert into token (
                        access_token, 
                        access_token_expires_at, 
                        client_id, 
                        user_id
                    ) values (?,?,?,?)`;

    const insert = await sql.execute(query, params);

    return new Promise(resolve => resolve(db.token))

};

const getAccessToken = async token => {
    /* This is where you select the token from the database where the code matches */
    /* debug({
        title: 'Get Access Token',
        parameters: [
            { name: 'token', value: token },
        ]
    }) */

    debug(`GETACCESSTOKEN 
    %O`, {
        token: token
    });

    if (!token || token === 'undefined') return false;
    return new Promise(resolve => resolve(db.token));
};

const getRefreshToken = async token => {
    /* Retrieves the token from the database */
    /* debug({
        title: 'Get Refresh Token',
        parameters: [
            { name: 'token', value: token },
        ],
    }) */

    debug(`GETREFRESHTOKEN 
    %O`, {
        token: token
    });
    debug('saved token is : %O', { name: 'db.token', value: db.token });

    return new Promise(resolve => resolve(db.token))
};

const revokeToken = async token => {
    /* Delete the token from the database */
    /* debug({
        title: 'Revoke Token',
        parameters: [
            { name: 'token', value: token },
        ]
    }); */

    debug(`REVOKETOKEN 
    %O`, {
        token: token
    });

    const params = [token];

    const query = `delete from token where access_token = ?`;

    const result = await sql.execute(query, params);
    const codeWasFoundAndDeleted = result.data.constructor.name === 'OkPacket';

    if (!token || token === 'undefined') return false;
    return new Promise(resolve => resolve(codeWasFoundAndDeleted));
};

const saveAuthorizationCode = async (code, client, user) => {
    /* This is where you store the access code data into the database */

    /* debug({
        title: 'Save Authorization Code',
        parameters: [
            { name: 'code', value: code },
            { name: 'client', value: client },
            { name: 'user', value: user },
        ],
    }) */

    debug(`SAVEAUTHORIZATIONCODE 
    %O`, {
        code: code,
        client: client,
        user: user
    });

    db.authorizationCode = {
        authorizationCode: code.authorizationCode,
        expiresAt: new Date(code.expiresAt),
        client: client,
        user: user,
    };

    const params = [
        db.authorizationCode.authorizationCode, 
        db.authorizationCode.expiresAt, 
        code.redirectUri, 
        client.clientId,
        user.id];

    const query = `insert into authorizationCode (
                        authorization_code, 
                        expires_at, 
                        redirect_uri, 
                        client_id, 
                        user_id
                    ) values (?,?,?,?,?)`;

    const insert = await sql.execute(query, params);
    
    return new Promise(resolve => resolve(Object.assign({
        redirectUri: `${code.redirectUri}`,
    }, db.authorizationCode)))
};

const getAuthorizationCode = async authorizationCode => {
    /* this is where we fetch the stored data from the code */
    /* debug({
        title: 'Get Authorization code',
        parameters: [
            { name: 'authorizationCode', value: authorizationCode },
        ],
    }) */
    
    debug(`GETAUTHORIZATIONCODE 
    %O`, {
        authorizationCode: authorizationCode
    });

    const queryClientId = `select * from authorizationCode where authorization_code = ?;`;
    const paramsClientId = [authorizationCode];
    const resultClientId = await sql.execute(queryClientId, paramsClientId);
    const authObj = resultClientId.data[0];

    const authorizationCodeModel = {
        authorizationCode: authObj.authorization_code,
        expiresAt: new Date(authObj.expires_at),
        client: authObj.client_id,
        user: authObj.user_id,
    };

    return new Promise(resolve => {
        resolve(authorizationCodeModel);
    });
};

const revokeAuthorizationCode = async authorizationCode => {
    /* This is where we delete codes */
    /* debug({
        title: 'Revoke Authorization Code',
        parameters: [
            { name: 'authorizationCode', value: authorizationCode },
        ],
    }) */

    debug(`REVOKEAUTHORIZATIONCODE 
    %O`, {
        authorizationCode: authorizationCode
    });

    const params = [authorizationCode.authorizationCode];

    const query = `delete from authorizationCode where authorization_code = ?`;

    const result = await sql.execute(query, params);
    const codeWasFoundAndDeleted = result.data.constructor.name === 'OkPacket';
    return new Promise(resolve => resolve(codeWasFoundAndDeleted))
};

const verifyScope = async (token, scope) => {
    /* This is where we check to make sure the client has access to this scope */
    /* debug({
        title: 'Verify Scope',
        parameters: [
            { name: 'token', value: token },
            { name: 'scope', value: scope },
        ],
    }) */

    debug(`VERIFYSCOPE 
    %O`, {
        token: token,
        scope: scope
    });
    
    const userHasAccess = true  // return true if this user / client combo has access to this resource
    return new Promise(resolve => resolve(userHasAccess))
}

const oAuthMethods = {
    getClient: getClient,
    saveToken: saveToken,
    getAccessToken: getAccessToken,
    getRefreshToken: getRefreshToken,
    revokeToken: revokeToken,
    saveAuthorizationCode: saveAuthorizationCode,
    getAuthorizationCode: getAuthorizationCode,
    revokeAuthorizationCode: revokeAuthorizationCode,
    verifyScope: verifyScope
}

module.exports = oAuthMethods;