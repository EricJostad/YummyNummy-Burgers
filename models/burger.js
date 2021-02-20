// Setting up required dependencies
const orm = require('../config/orm');

// Setting up the burger variable and related functions
const burger = {
    selectAll: function (cb) {
        orm.selectAll('burgers', (res) => {
            cb(res);
        })
    },

    insertOne: function (cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, (res) => {
            cb(res);
        })
    },

    updateOne: function (objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, (res) => {
            cb(res);
        })
    }
};

// This exports burger for use by model
module.exports = burger;