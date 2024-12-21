// Import any required modules or libraries

// Define a function for user registration
function registerUser(username, password) {
    const data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);

    // Send the data to the server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })
    .then(response => {
        if (response.ok) {
            console.log('Success:', response);
            // Handle success (e.g., redirect to login page)
            window.location.href = '/index.html'; // Redirect to login page
        } else {
            return response.text().then(text => { throw new Error(text) });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error
    });
}