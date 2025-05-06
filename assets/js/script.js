



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
