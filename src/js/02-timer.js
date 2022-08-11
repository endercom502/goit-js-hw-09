import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import { Nofify } from 'notiflix/build/notiflix-Notify-aio';
const currentDate = Date.now();

const refs = {
  futureTimeInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timeMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

class Timer {
  constructor({ onTick, inputSelector, btnSelector }) {
    this.isActive = false;
    this.onTick = onTick;
    this.onTick = onTick;
    this.inputSelector = inputSelector;
    this.btnSelector = btnSelector;
    this.init();
  }
  init() {
    const time = this.convertMs(0);
    this.onTick(time);
  }
  start() {
    if (this.isActive || this.inputSelector.value === '') {
      return;
    }
    this.isActive = true;
    const plannedTime = this.takePlannedTime();
    setInterval(() => {
      const newCurrentDate = Date.now();
      const remadeTime = this.convertMs(plannedTime - newCurrentDate);
      if (remadeTime <= 0) {
        Nofify.failure('Please choose a date in the future');
        this.notifyBlockAdd(this.btnSelector);
        return;
      }
      postTimer(remadeTime);
    }, 1000);
  }

  takePlannedTime() {
    return Date.parse(this.inputSelector.value);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    let timerDays = null;
    if (days < 10) {
      timerDays = this.addLeadingZero(days);
    } else if (days > 9) {
      timerDays = String(days);
    }
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
    return { timerDays, hours, minutes, seconds };
  }

  notifyBlockAdd(btnSelector) {
    btnSelector.classList.add('notify-block');
  }

  notifyBlockRemove(btnSelector) {
    btnSelector.classList.remove('notify-block');
  }
}

const notifyOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  onClose(selctedDates) {
    if (Date.parse(selctedDates) < currentDate) {
      Nofify.failure('Please choose a date in the future');
      timer.notifyBlockAdd(refs.startBtn);
    } else if (Date.parse(selctedDates) > currentDate) {
      timer.notifyBlockRemove(refs.startBtn);
    } else if (isActive && Date.parse(selctedDates) > currentDate) {
      Nofify.failure('Please choose a date in the future');
      timer.notifyBlockAdd(refs.startBtn);
    }
  },
};

flatpickr(refs.futureTimeInput, notifyOptions);

const timer = new Timer({
  onTick: postTimer,
  inputSelector: refs.futureTimeInput,
  btnSelector: refs.startBtn,
});

refs.futureTimeInput.addEventListener(
  'change',
  timer.takePlannedTime.bind(timer)
);
refs.startBtn.addEventListener('click', timer.start.bind(timer));

function postTimer({ timerDays, hours, minutes, seconds }) {
  refs.timerDays.textContent = timerDays;
  refs.timerHours.textContent = hours;
  refs.timeMinutes.textContent = minutes;
  refs.timerSeconds.textContent = seconds;
}
