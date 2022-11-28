// logic
function currentDate() {
    const yearEl = document.getElementById('year');
    let date = new Date().getFullYear();

    yearEl.innerText = date;
};

// calls
currentDate();