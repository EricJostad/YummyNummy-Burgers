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