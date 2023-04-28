/*const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

//Alaram tune linked...
let alarmTime, isAlarmSet,
ringtone = new Audio("./files/ringtone.mp3");

function options() {
    // option hour for alaram
    selectMenu[0].innerHTML = selectMenu[1].innerHTML = selectMenu[2].innerHTML = "";
    selectMenu[0].innerHTML = `<option value="Hour" selected disabled hidden>Hour</option>`;
    for (let i = 12; i > 0; i--) {
        i = i < 10 ? `0${i}` : i;
        let option = `<option value="${i}">${i}</option>`;
        selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
    }
    
    
    // option minut for alaram
    selectMenu[1].innerHTML = `<option value="Minute" selected disabled hidden>Minute</option>`;
    for (let i = 59; i >= 0; i--) {
        i = i < 10 ? `0${i}` : i;
        let option = `<option value="${i}">${i}</option>`;
        selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
    }
    
    // option AM/PM for alaram
    selectMenu[2].innerHTML = `<option value="AM/PM" selected disabled hidden>AM/PM</option>`;
    for (let i = 2; i > 0; i--) {
        let ampm = i == 1 ? "AM" : "PM";
        let option = `<option value="${ampm}">${ampm}</option>`;
        selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
    }*/
const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const selectMenu = document.getElementsByTagName("select");
const setAlarmBtn = document.querySelector("button");

// Alarm tune
let alarmTime;
let isAlarmSet;
let ringtone;

try {
  ringtone = new Audio("./files/ringtone.mp3");
} catch (err) {
  console.error("Failed to load ringtone:", err);
}

// Initialize the select menus with options
function initializeSelectMenus() {
  // Hour options
  selectMenu[0].innerHTML = `<option value="Hour" selected disabled hidden>Hour</option>`;
  for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  // Minute options
  selectMenu[1].innerHTML = `<option value="Minute" selected disabled hidden>Minute</option>`;
  for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  // AM/PM options
  selectMenu[2].innerHTML = `<option value="AM/PM" selected disabled hidden>AM/PM</option>`;
  let ampmOptions = ["AM", "PM"];
  for (let i = 0; i < ampmOptions.length; i++) {
    let option = `<option value="${ampmOptions[i]}">${ampmOptions[i]}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
  }
}

initializeSelectMenus();

// Update the current time every second
setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h === 0 ? 12 : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.textContent = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

// Set or clear the alarm
function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove

}
options();

// Input data from user
setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    // if hours min sec 10 se kam hai to peeche '0' lagega
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    // alamram time matched then tone will play
    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
});

// Alaram set fuction
function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        isAlarmSet = false;
        return options();
    }

    // if alaram time is not selected right then error occurs
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    // clear alaram function
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);
