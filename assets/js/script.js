document.addEventListener("DOMContentLoaded", () => {
    // Current Date and Time Function
    function updateDateTime() {
        const dateNow = new Date();

        const year = dateNow.getFullYear();
        const month = dateNow.getMonth();
        const days = dateNow.getDate();

        const date = `${days}/${month + 1}/${year}`; // Adjust month (starts from 0)

        const hours = dateNow.getHours();
        const minutes = dateNow.getMinutes();
        const seconds = dateNow.getSeconds();

        const time = `${hours}:${minutes}:${seconds}`;

        document.getElementById("currentDate").textContent = date;
        document.getElementById("currentTime").textContent = time;
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();
});

// === Timer Logic ===

let countdownInterval;
let userMessage = "";
let speaking = false; // To check if the message is currently being spoken

// Function to play beep sound
function playBeepSound() {
    const beepSound = document.getElementById("beepSound");
    beepSound.play();
}

// Function to speak the message with a chime sound
function speakMessage(message) {
    if (speaking) return; // Prevent overlapping speech

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US'; // Set language
    utterance.rate = 1; // Speed of speech (1 is normal, adjust as needed)
    utterance.volume = 1; // Volume of speech (0.0 to 1.0)

    // Loop the speech until stopped
    utterance.onend = function () {
        if (speaking) {
            synth.speak(utterance); // Repeat the speech
        }
    };

    synth.speak(utterance);
    speaking = true; // Indicate that speech is being played
}

// Function to stop the speech and sound
function stopSpeaking() {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any ongoing speech
    speaking = false; // Reset speaking flag

    const beepSound = document.getElementById("beepSound");
    beepSound.pause(); // Stop the beep sound if it is playing
    beepSound.currentTime = 0; // Reset the sound to the start
}

// Timer display logic
function updateDisplay(totalSeconds) {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');

    document.querySelector(".timerDisplay").textContent = `${hrs}:${mins}:${secs}`;
}

// Timer logic (same as before, but with added functionality)
function setTimer() {
    if (!userMessage) {
        alert("Please enter and submit a message before starting the timer.");
        return;
    }

    const hours = parseInt(document.getElementById("hoursInput").value) || 0;
    const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
    const seconds = parseInt(document.getElementById("secondsInput").value) || 0;

    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (totalSeconds <= 0) {
        alert("Please enter a valid time.");
        return;
    }

    clearInterval(countdownInterval);
    updateDisplay(totalSeconds);

    countdownInterval = setInterval(() => {
        totalSeconds--;

        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            updateDisplay(0);
            playBeepSound(); // Play the beep before the message
            speakMessage(userMessage); // Speak the message

        } else {
            updateDisplay(totalSeconds);
        }
    }, 1000);
}

// Save message logic (same as before)
function saveMessage() {
    const input = document.getElementById("messageInput").value.trim();
    if (input) {
        userMessage = input;
        alert("Message Saved!");
    } else {
        alert("Please Enter a Message before Submitting.");
    }
}
