const OAuthModel = require("../oauth/oauth");

const getClient = (clientId, clientSecret) => {
    return new Promise((resolve, reject) => {
        OAuthModel.getClient(clientId, clientSecret).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};

const saveToken = (token, client, user) => {
    return new Promise((resolve, reject) => {
        OAuthModel.saveToken(token, client, user).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        OAuthModel.getAccessToken(token).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        OAuthModel.getRefreshToken(token).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const revokeToken = (token) => {
    return new Promise((resolve, reject) => {
        OAuthModel.revokeToken(token).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};

const saveAuthorizationCode = (code, client, user) => {
    return new Promise((resolve, reject) => {
        OAuthModel.saveAuthorizationCode(code, client, user).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getAuthorizationCode = (authorizationCode) => {
    return new Promise((resolve, reject) => {
        OAuthModel.getAuthorizationCode(authorizationCode).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};


const revokeAuthorizationCode = (authorizationCode) => {
    return new Promise((resolve, reject) => {
        OAuthModel.revokeAuthorizationCode(authorizationCode).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};



const verifyScope = (token, scope) => {
    return new Promise((resolve, reject) => {
        OAuthModel.verifyScope(token, scope).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};



const OAuthService = {
    getClient: getClient,
    saveToken: saveToken,
    getAccessToken: getAccessToken,
    getRefreshToken: getRefreshToken,
    revokeToken: revokeToken,
    saveAuthorizationCode: saveAuthorizationCode,
    getAuthorizationCode: getAuthorizationCode,
    revokeAuthorizationCode: revokeAuthorizationCode,
    verifyScope: verifyScope
};

module.exports = OAuthService;