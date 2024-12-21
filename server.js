const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users from file
const readUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

// Helper function to write users to file
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log('Users written to file:', users); // Log users written to file
};

// Handle registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('Received registration data:', { username, password }); // Log received data
    const users = readUsers();
    console.log('Current users:', users); // Log current users

    if (users.find(user => user.username === username)) {
        console.log('User already exists:', username); // Log existing user
        return res.send('User already exists');
    }

    users.push({ username, password });
    writeUsers(users);
    console.log('User registered successfully:', { username, password }); // Log successful registration

    res.redirect('/');
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login data:', { username, password }); // Log received data
    const users = readUsers();
    console.log('Current users:', users); // Log current users

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        console.log('Login successful:', username); // Log successful login
        res.redirect('/main.html');
    } else {
        console.log('Invalid username or password:', { username, password }); // Log invalid login
        res.send('Invalid username or password');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});