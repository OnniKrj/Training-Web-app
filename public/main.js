document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('exerciseForm');
    const tableBody = document.getElementById('exerciseTable').getElementsByTagName('tbody')[0];
    const noDataMessage = document.getElementById('noDataMessage'); // Define the noDataMessage element

    // Load user's exercise data from the server
    fetch('/exercise')
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        if (data.length === 0) {
            console.log('No exercise data found');
            noDataMessage.style.display = 'block'; // Show the no data message
        } else {
            noDataMessage.style.display = 'none'; // Hide the no data message
            data.forEach(exerciseData => {
                const newRow = tableBody.insertRow();
                newRow.insertCell(0).textContent = exerciseData.exerciseName;
                newRow.insertCell(1).textContent = exerciseData.sets;
                newRow.insertCell(2).textContent = exerciseData.reps;
                newRow.insertCell(3).textContent = exerciseData.weight;
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const exerciseData = {
            exerciseName: document.getElementById('exerciseName').value,
            sets: document.getElementById('sets').value,
            reps: document.getElementById('reps').value,
            weight: document.getElementById('weight').value
        };

        console.log('Captured exercise data:', exerciseData); // Debugging line

        if (exerciseData.exerciseName && exerciseData.sets && exerciseData.reps && exerciseData.weight) {
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).textContent = exerciseData.exerciseName;
            newRow.insertCell(1).textContent = exerciseData.sets;
            newRow.insertCell(2).textContent = exerciseData.reps;
            newRow.insertCell(3).textContent = exerciseData.weight;
            noDataMessage.style.display = 'none';

            fetch('/exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exerciseData) // Corrected body format
            })
            .then(response => {
                if (response.ok) {
                    console.log('Success:', response);
                } else {
                    return response.text().then(text => { throw new Error(text) });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            form.reset();
        } else {
            console.error('Invalid exercise data');
        }
    });

    // Add event listener for logout button
    document.getElementById("logout").addEventListener("click", () => {
        fetch('/logout', {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Logout failed');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});