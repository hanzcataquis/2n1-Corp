const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/addProducts', (req, res) => {
    res.render('addProducts');
});

module.exports = router;
