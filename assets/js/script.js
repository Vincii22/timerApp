

document.addEventListener("DOMContentLoaded", () => {
// Current Date and Time Function
function updateDateTime() {
    const dateNow = new Date();

    const year = dateNow.getFullYear();
    const month = dateNow.getMonth();
    const days = dateNow.getDate();

    const date = `${days}/${month}/${year}`;

    const hours = dateNow.getHours();
    const minutes = dateNow.getMinutes();
    const seconds = dateNow.getSeconds();

    const time = `${hours}:${minutes}:${seconds}`;

    document.getElementById("currentDate").textContent = date.toLocaleString();
    document.getElementById("currentTime").textContent = time.toLocaleString();

}

setInterval(updateDateTime, 1000);
updateDateTime();


});


// === Timer Logic ===

let countdownInterval;
let userMessage = "";

function saveMessage(){
    const input = document.getElementById("messageInput").value.trim();
    if (input){
        userMessage = input;
        alert("Message Saved!");
    } else {
        alert("Please Enter a Message before Submitting.")
    }
}
function updateDisplay(totalSeconds) {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');

  document.querySelector(".timerDisplay").textContent = `${hrs}:${mins}:${secs}`;
}

function setTimer() {

    if(!userMessage){
        alert("Please enter and submit a message before starting the timer.")
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
      alert(userMessage);
    } else {
      updateDisplay(totalSeconds);
    }
  }, 1000);
}


//Message Function
