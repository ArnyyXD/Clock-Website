let intervalId; // Variable to store the interval ID

function displayTime() {
    const selectedTimezone = document.getElementById('timezone').value;

    // Include seconds in the format
    const options = {
        timeZone: selectedTimezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    // Clear the existing interval
    clearInterval(intervalId);

    // Update the clock immediately without the interval
    const formatter = new Intl.DateTimeFormat('en-US', options);
    let currentTime = formatter.format(new Date());
    document.getElementById('clock').textContent = currentTime;

    // Set the new interval to update the clock every second
    intervalId = setInterval(function () {
        let currentTime = formatter.format(new Date());
        document.getElementById('clock').textContent = currentTime;
    }, 1000);

    updateDate(); // Add this line to update the date when the timezone changes
}

function updateDate() {
    const selectedTimezone = document.getElementById('timezone').value;
    const options = { timeZone: selectedTimezone, weekday: 'long', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const currentDate = formatter.format(new Date());

    document.getElementById('date').textContent = currentDate;
}

// Add the following lines to include additional timezones
var timezones = [
    "UTC",
    "Europe/London",
    "America/Los_Angeles",
    "Australia/Sydney",
    "Asia/Tokyo",
    "Europe/Paris",
    "America/Chicago",
    "Australia/Melbourne",
    "Asia/Shanghai",
    "Europe/Berlin",
];

var select = document.getElementById("timezone");
timezones.forEach(function (timezone) {
    var option = document.createElement("option");
    option.value = timezone;
    option.text = timezone.split("/").pop().replace("_", " ");
    select.add(option);
});

// Initial display on page load
displayTime();
const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '')));

// Other routes or middleware if needed

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
document.body.addEventListener("pointermove", (e) => {
    const { currentTarget: el, clientX: x, clientY: y } = e;
    const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
    el.style.setProperty('--posX', x - l - w / 2);
    el.style.setProperty('--posY', y - t - h / 2);
})