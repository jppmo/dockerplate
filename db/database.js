const mysql = require('mysql');
const dbconfig = require('./dbconfig');

let connection = null;

function createMySqlConnection() {
    connection = mysql.createConnection(dbconfig);
}

async function execute(query, params) {
    createMySqlConnection()
    connection.connect();
    let result = new Promise((resolve, reject) => {
        connection.query(query, params, (error, result, fields) => {
            if (error) reject(error);
            connection.end();
            resolve(createDataResponseObject(error, result));
        });
    });
    return await result;
}

function createDataResponseObject(error, result) {
    return {
        data: !result ? null : result,
        error: error
    }
}

module.exports = {
    execute: execute
};