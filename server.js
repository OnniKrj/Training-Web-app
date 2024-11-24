const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle user registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log(`Received registration data: Username: ${username}, Password: ${password}`);

    // Simulate successful registration
    res.json({ message: 'Registration successful' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});