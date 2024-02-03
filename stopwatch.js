let isRunning = false;
let isPaused = false;
let intervalId;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapTimes = [];

function updateStopwatch() {
    const stopwatchElement = document.getElementById('stopwatch');
    stopwatchElement.innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
    if (isRunning && !isPaused) {
        milliseconds++;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
        }
    }
}
function startStopwatch() {
    isRunning = true;
    intervalId = setInterval(updateStopwatch, 1); // Change the interval to 1 millisecond
}

function stopStopwatch() {
    isRunning = false;
    clearInterval(intervalId);
}

function resetStopwatch() {
    isRunning = false;
    isPaused = false;
    clearInterval(intervalId);
    seconds = 0;
    minutes = 0;
    hours = 0;
    milliseconds = 0;
    lapTimes = [];
    updateStopwatch();
    updateLapTimes();
}

function togglePauseResumeButtonImage() {
    const pauseResumeImage = document.getElementById('pauseResumeImage');

    // Toggle the isPaused variable
    isPaused = !isPaused;

    // Change the image source based on the isPaused variable
    if (isPaused) {
        pauseResumeImage.src = 'pause.png';
    } else {
        pauseResumeImage.src = 'resume.png';
    }

    // Call the original pauseResumeStopwatch function
    pauseResumeStopwatch();
}

function lapStopwatch() {
    lapTimes.push(`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`);
    updateLapTimes();
}

function updateLapTimes() {
    const lapTimesElement = document.getElementById('lapTimes');
    lapTimesElement.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}: ${lap}`;
        lapTimesElement.appendChild(li);
    });
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(time) {
    return time < 10 ? `00${time}` : time < 100 ? `0${time}` : time;
}

// Event listeners for buttons
document.getElementById('startButton').addEventListener('click', startStopwatch);
document.getElementById('stopButton').addEventListener('click', stopStopwatch);
document.getElementById('resetButton').addEventListener('click', resetStopwatch);
document.getElementById('pauseResumeButton').addEventListener('click', togglePauseResumeButtonImage);
document.getElementById('lapButton').addEventListener('click', lapStopwatch);
