const express = require('express');
const router = express.Router();
const db = require('../config/db'); // MySQL2 connection

// Route to display products in the shop
router.get('/shop', (req, res) => {
    const query = 'SELECT name, description, price, size, quantity, image FROM shop_products'; // SQL query to fetch product details
    
    db.query(query, (err, results) => {
        if (err) {
            console.error(err); // Log error if any
            return res.status(500).send("Internal Server Error"); // Send 500 error response
        }
        res.render('shop', { products: results }); // Render the shop view with product data
    });
});

module.exports = router; // Export the router for use in app.js
