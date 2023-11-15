const express = require("express");
const router = express.Router();
const db = require('./database/db');

router.get("/", (req, res) => {

    db.query('SELECT * FROM tarea', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('index', { results: results });
        }
    });
});

module.exports = router;