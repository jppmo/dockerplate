const sql = require('../db/database');

class User {
    constructor(userData) {
        this._name = userData.name;
        this._password = userData.password;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }

    get password() {
        return this._password;
    }

    set password(newPassword) {
        this._password = newPassword;
    }
}

const createUser = async (userData) => {
    const user = new User(userData);
    const createDate = new Date();
    const params = [user.name, user.password, createDate, createDate];
    const query = `insert into users (name, password, createdAt, updatedAt) values (?,?,?,?)`;
    const insert = await sql.execute(query, params);;
    const queryInsertId = 'select LAST_INSERT_ID();';  
    return await sql.execute(queryInsertId, params);
};


const getAllUsers = async () => {
    const query = `SELECT * FROM users;`;
    const params = [];
    return await sql.execute(query, params);
};

const getUserById = async (id) => {
    const query = `SELECT * FROM users where id = ?;`;
    const params = [id];
    return await sql.execute(query, params);
};

const getUserIdByClientId = async (clientId) => {
    const query = `SELECT id FROM users where client_id = ?;`;
    const params = [clientId];
    return await sql.execute(query, params);
};


const UserModel = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    getUserIdByClientId: getUserIdByClientId
}

module.exports = UserModel;