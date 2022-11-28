// logic
function currentDate() {
    const yearEl = document.getElementById('year');
    let date = new Date().getFullYear();

    yearEl.innerText = `${date} Edwin m. escobar`;
};

// calls
currentDate();