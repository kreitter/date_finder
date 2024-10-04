const jsContent = `
document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const nameInput = document.getElementById('name-input');
    const addPersonButton = document.getElementById('add-person');
    const finalizeButton = document.getElementById('finalize-button');
    const bestDatesList = document.getElementById('best-dates');

    let people = [];
    let dates = {};

    // Initialize calendar with 30 days
    for (let i = 1; i <= 30; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = \`Day \${i}\`;
        dayDiv.dataset.day = i;
        calendar.appendChild(dayDiv);

        dayDiv.addEventListener('click', function () {
            const currentStatus = dayDiv.dataset.status;
            if (!currentStatus || currentStatus === 'bad') {
                dayDiv.dataset.status = 'good';
                dayDiv.className = 'day selected-good';
            } else if (currentStatus === 'good') {
                dayDiv.dataset.status = 'maybe';
                dayDiv.className = 'day selected-maybe';
            } else if (currentStatus === 'maybe') {
                dayDiv.dataset.status = 'bad';
                dayDiv.className = 'day selected-bad';
            }
        });
    }

    // Add person to the list
    addPersonButton.addEventListener('click', function () {
        const name = nameInput.value.trim();
        if (name) {
            people.push(name);
            alert(\`\${name} has been added. Please mark your availability on the calendar.\`);
            nameInput.value = '';
        } else {
            alert('Please enter a valid name.');
        }
    });

    // Find the best dates
    finalizeButton.addEventListener('click', function () {
        bestDatesList.innerHTML = '';
        const availability = {};

        // Count votes for each date
        document.querySelectorAll('.day').forEach(day => {
            const dayNumber = day.dataset.day;
            const status = day.dataset.status;
            if (status === 'good' || status === 'maybe') {
                if (!availability[dayNumber]) availability[dayNumber] = { good: 0, maybe: 0 };
                if (status === 'good') availability[dayNumber].good++;
                if (status === 'maybe') availability[dayNumber].maybe++;
            }
        });

        // Determine the best dates
        const bestDates = Object.keys(availability).sort((a, b) => {
            if (availability[b].good === availability[a].good) {
                return availability[b].maybe - availability[a].maybe;
            }
            return availability[b].good - availability[a].good;
        });

        // Display best dates
        bestDates.forEach(day => {
            const li = document.createElement('li');
            li.textContent = \`Day \${day} - Good: \${availability[day].good}, Maybe: \${availability[day].maybe}\`;
            bestDatesList.appendChild(li);
        });
    });
});