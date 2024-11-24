// Import any required modules or libraries

// Define a function for user registration
function registerUser(username, password) {
    const data = {
        username: username,
        password: password,
    };

    // Send the data to the server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success (e.g., redirect to login page)
        window.location.href = '/index.html'; // Redirect to login page
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error
    });
}