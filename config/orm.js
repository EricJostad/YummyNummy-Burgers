// Setting up required dependencies
const connection = require('./connection');

// This function sets up questionmarks for MySQL query statements
function questionMarks(num) {
    const questArr = [];

    for (let i = 0; i < num; i++) {
        questArr.push('?');
    }
    return questArr.toString();
}

// This function converts objects to key/value pairs
function objectSql(ob) {
    const objectArr = [];

    for (let key in ob) {
        const value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }
            objectArr.push(`${key} = ${value}`);
        }
    }
    return objectArr.toString();
}

// This sets up the orm variable
const orm = {
    selectAll: function (table, cb) {
        const query = `SELECT * FROM ${table};`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    },

    insertOne: function (table, cols, vals, cb) {
        let query= `INSERT INTO ${table}`;

        query += " (";
        query += cols.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(vals.length);
        query += ") ";

        connection.query(query, vals, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    },

    updateOne: function (table, objColVals, condition, cb) {
        let query = `UPDATE ${table}`;

        query += " SET ";
        query += objToSql(objColVals);
        query += " WHERE ";
        query += condition;

        connection.query(query, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    }
}

// This allows the orm object to be exported
module.exports = orm;