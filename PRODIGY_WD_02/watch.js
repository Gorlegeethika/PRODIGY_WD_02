let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        paused = false;
        running = true;
    }
}

function pauseTimer() {
    if (!paused && running) {
        clearInterval(tInterval);
        paused = true;
        timeDisplay.style.color = "red";
    } else if (paused && running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        paused = false;
        timeDisplay.style.color = "black";
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    timeDisplay.innerHTML = "00 hrs:00 min:00 sec";
    timeDisplay.style.color = "black";
    lapsList.innerHTML = "";
}

function lapTimer() {
    if (running) {
        const lapTime = timeDisplay.innerHTML;
        const li = document.createElement('li');
        li.innerText = lapTime;
        lapsList.appendChild(li);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.innerHTML = hours + " hrs:" + minutes + " min:" + seconds + " sec";
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);
lapBtn.addEventListener('click', lapTimer);
