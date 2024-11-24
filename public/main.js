document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('exerciseForm');
    const tableBody = document.getElementById('exerciseTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const exerciseName = document.getElementById('exerciseName').value;
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value;
        const weight = document.getElementById('weight').value;

        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = exerciseName;
        newRow.insertCell(1).textContent = sets;
        newRow.insertCell(2).textContent = reps;
        newRow.insertCell(3).textContent = weight;

        form.reset();
    });
});