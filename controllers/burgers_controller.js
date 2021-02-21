// Setting up required dependencies
const express = require('express');
const burger = require('../models/burger');

// Create router function
const router = express.Router();

// This creates the route for the home page
router.get('/', (req, res) => {
    burger.selectAll(function (data) {
        const homeBurgersObj = {
            burgers: data
        };
        res.render('index', homeBurgersObj);
    })
});

router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => {
        res.json({ id: result.insertId })
    })
});

// This creates a route for the individual burgers, based on their id
router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    burger.updateOne(
        {
            devoured: req.body.devoured
        },
        condition,
        (result) => {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    )
});

// This sets the router up for exporting
module.exports = router;