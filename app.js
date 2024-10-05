const express = require('express');
const path = require('path');
const app = express();
const productsRouter = require('./routes/products'); // Import the products router

// Middleware
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views directory

// Use the products route
app.use('/', productsRouter); // Mount the products router

// Home route (optional)
app.get('/', (req, res) => {
    res.render('index'); // Ensure you have an index.ejs file in your views
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
