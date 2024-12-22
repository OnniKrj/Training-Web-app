const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON data
app.use(express.static('public'));

app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

const usersFilePath = path.join(__dirname, 'users.json');

// Helper functions to read and write users
const readUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log('Users written to file:', users);
};

// Handle registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('Received registration data:', { username, password });
    const users = readUsers();
    console.log('Current users:', users);

    if (users.find(user => user.username === username)) {
        console.log('User already exists:', username);
        return res.send('User already exists');
    }

    users.push({ username, password });
    writeUsers(users);
    console.log('User registered successfully:', { username, password });

    res.redirect('/');
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login data:', { username, password });
    const users = readUsers();
    console.log('Current users:', users);

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        console.log('Login successful:', username);
        req.session.username = username; // Store username in session
        res.redirect('/main.html');
    } else {
        console.log('Invalid username or password:', { username, password });
        res.send('Invalid username or password');
    }
});

// Handle exercise data
app.post('/exercise', (req, res) => {
    const { exerciseData } = req.body;
    console.log('Received exercise data:', exerciseData);

    if (!req.session.username) {
        return res.status(401).send('Unauthorized');
    }

    const users = readUsers();
    const user = users.find(user => user.username === req.session.username);
    if (user) {
        user.exercises = user.exercises || [];
        if (exerciseData) {
            user.exercises.push(exerciseData);
            writeUsers(users);
            res.send('Exercise data received');
        } else {
            res.status(400).send('Invalid exercise data');
        }
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});