let startStopBtn = document.getElementById('startStop');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
let lapsContainer = document.getElementById('laps-container');

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer;
let lapCount = 1;
let lastRecordedSecond = -1;

function toggleStartStop() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        startStopBtn.innerHTML = "Start";
    } else {
        timer = setInterval(stopWatch, 10);
        startStopBtn.innerHTML = "Stop";
    }
}

resetBtn.addEventListener('click', function () {
    clearInterval(timer);
    timer = null;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    lapCount = 1;
    lastRecordedSecond = -1;
    document.getElementById('display').innerHTML = "00:00:00";
    lapsContainer.innerHTML = ""; 
    startStopBtn.innerHTML = "Start";
});

lapBtn.addEventListener('click', function () {
    recordLap();
});

function recordLap() {
    if (timer) {
        let currentSecond = second;

        if (currentSecond !== lastRecordedSecond) {
            lastRecordedSecond = currentSecond;

            let lapTime = getFormattedTime();
            let lapItem = document.createElement('li');
            lapItem.classList.add('lap-item');
            lapItem.innerHTML = `<span>Lap ${lapCount++}: ${lapTime}</span>
            <button onclick="deleteLap(this)">Delete</button>`;
            lapsContainer.appendChild(lapItem);

            // Trigger reflow to apply transition
            void lapItem.offsetWidth;

            lapItem.classList.add('show');
        }
    }
}

function deleteLap(button) {
    let lapItem = button.parentNode;
    lapsContainer.removeChild(lapItem);
}

function stopWatch() {
    count++;

    if (count == 100) {
        second++;
        count = 0;
    }

    if (second == 60) {
        minute++;
        second = 0;
    }

    if (minute == 60) {
        hour++;
        minute = 0;
        second = 0;
    }

    document.getElementById('display').innerHTML = getFormattedTime();
}

function getFormattedTime() {
    let hrString = hour < 10 ? "0" + hour : hour;
    let minString = minute < 10 ? "0" + minute : minute;
    let secString = second < 10 ? "0" + second : second;
    let countString = count < 10 ? "0" + count : count;

    return `${hrString}:${minString}:${secString}.${countString}`;
}