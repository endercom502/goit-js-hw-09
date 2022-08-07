const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let intervalId = null;
let isActive = false;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  if (!isActive) {
    intervalId = setInterval(() => {
      document.body.style.background = getRandomHexColor();
      isActive = true;
    }, 1000);
  }
}
function onStopBtnClick() {
  clearInterval(intervalId);
  isActive = false;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
