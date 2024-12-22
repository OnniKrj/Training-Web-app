document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('exerciseForm');
    const tableBody = document.getElementById('exerciseTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const exerciseData = {
            exerciseName: document.getElementById('exerciseName').value,
            sets: document.getElementById('sets').value,
            reps: document.getElementById('reps').value,
            weight: document.getElementById('weight').value
        };

        if (exerciseData.exerciseName && exerciseData.sets && exerciseData.reps && exerciseData.weight) {
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).textContent = exerciseData.exerciseName;
            newRow.insertCell(1).textContent = exerciseData.sets;
            newRow.insertCell(2).textContent = exerciseData.reps;
            newRow.insertCell(3).textContent = exerciseData.weight;

            fetch('/exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ exerciseData })
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
});