const UserModel = require("../models/user.js");

const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        UserModel.createUser(userData).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
};

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        UserModel.getAllUsers().then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    });
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        UserModel.getUserById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
};

const getUserIdByClientId = (clientId) => {
    return new Promise((resolve, reject) => {
        UserModel.getUserIdByClientId(clientId).then((result) => {
            const id = result.data[0].id;
            resolve(id);
        }).catch((err) => {
            reject(err);
        })
    });
};

const UserService = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    getUserIdByClientId: getUserIdByClientId
};

module.exports = UserService;