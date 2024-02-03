// alarm.js

// Function to open the modal
function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

// Function to set the timer
function setTimer() {
    // Get the user input for hours, minutes, and seconds
    let hours = parseInt(document.getElementById('HOURS').value) || 0;
    let minutes = parseInt(document.getElementById('MINUTES').value) || 0;
    let seconds = parseInt(document.getElementById('SECONDS').value) || 0;

    // Validate the input (you can add more validation if needed)
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert("Invalid input. Please enter valid numbers for hours, minutes, and seconds.");
        return;
    }

    // Calculate the total seconds
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Start the countdown
    countdown(totalSeconds);

    // Close the modal
    closeModal();
}

// Variable to hold the countdown timeout ID
let countdownTimeout;
// Function to clear the timer and stop the countdown
function clearTimer() {
    // Reset the clock to 00:00:00
    document.getElementById('timer').innerText = '00:00:00';

    // Stop the countdown by clearing the timeout
    clearTimeout(countdownTimeout);

    // Clear the input fields for hours, minutes, and seconds
    document.getElementById('HOURS').value = '';
    document.getElementById('MINUTES').value = '';
    document.getElementById('SECONDS').value = '';
    countdownTimeout = null;
}

// Function to handle the selected MP3 file
function handleMp3File() {
    let mp3Input = document.getElementById('mp3-input');

    // Check if the file input has files
    if (mp3Input.files.length > 0) {
        let selectedMp3 = mp3Input.files[0];

        // Display the selected MP3 file name
        document.getElementById('mp3-file-name').innerText = selectedMp3.name;
    }
}

// Function to start the countdown
function countdown(totalSeconds) {
    let timerDisplay = document.getElementById('timer');

    function updateClock() {
        if (totalSeconds <= 0) {
            // Countdown reached 00:00:00
            timerDisplay.innerText = '00:00:00';

            // Show notification
            showNotification();

            // Play the selected MP3 file
            handleMp3File();

            // Clear the interval
            return;
        } else {
            // Check if countdownTimeout is null to prevent the countdown from starting again
            if (countdownTimeout === null) {
                return;
            }
            // Calculate hours, minutes, and seconds
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;

            // Format the time and update the clock
            timerDisplay.innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);

            // Decrement totalSeconds
            totalSeconds--;

            // Schedule the next update after 1 second
            countdownTimeout = setTimeout(updateClock, 1000);
        }
    }

    // Initial call to start the countdown
    updateClock();
}

// Function to show a notification
function showNotification() {
    if (Notification.permission === "granted") {
        new Notification("Countdown Complete", { body: "Your countdown has reached 00:00:00" });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification("Countdown Complete", { body: "Your countdown has reached 00:00:00" });
            }
        });
    }
}

// Function to handle the selected MP3 file
function handleMp3File() {
    let mp3Input = document.getElementById('mp3-input');

    if (mp3Input.files.length > 0) {
        let selectedMp3 = mp3Input.files[0];

        // Play the selected MP3 file
        playMp3(selectedMp3);
    }
}

// Function to play the selected MP3 file
function playMp3(mp3File) {
    // Set an ID for the audio element
    let audioElementId = 'audio-element';

    // Check if an audio element with the ID already exists
    let existingAudioElement = document.getElementById(audioElementId);
    if (existingAudioElement) {
        // If exists, remove the existing audio element
        existingAudioElement.parentNode.removeChild(existingAudioElement);
    }

    // Create a new audio element and set the source
    let audioElement = document.createElement('audio');
    audioElement.id = audioElementId;
    audioElement.src = URL.createObjectURL(mp3File);

    // Append the audio element to the document body
    document.body.appendChild(audioElement);

    // Play the audio file
    audioElement.play();
}


// Function to open the file input when the "Choose MP3 File" button is clicked
function chooseMp3File() {
    document.getElementById('mp3-input').click();
}
// Function to close the modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Function to stop the alarm (stop playing the MP3 file)
function stopAlarm() {
    // Check if there is an audio element playing
    let audioElement = document.getElementById('audio-element');
    if (audioElement) {
        // Pause and reset the audio element
        audioElement.pause();
        audioElement.currentTime = 0;
    } else {
        // Alert if there is no audio element found
        alert("No audio element found.");
    }
}

// Function to format time (add leading zero if needed)
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// Request permission for notifications on page load
document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
});
