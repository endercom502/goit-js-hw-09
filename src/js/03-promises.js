import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delayInput: document.querySelector('.delay'),
  stepInput: document.querySelector('.step'),
  amount: document.querySelector('.amount'),
  submitBtn: document.querySelector('button'),
};

Notify.init({
  width: '280px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: false,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },

  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});

class PromiseCycle {
  constructor({ notify }) {
    this.notify = notify;
  }

  PromiseCycle(amount, firstStep, nexStep) {
    for (let i = i; i <= amount; i++) {
      const delay = Number(firstStep) + Number(nexStep * (i - 1));
      this.createPromise(i, delay)
        .then(result => {
          this.notify.success(result);
        })
        .catch(err => {
          this.notify.failure(err);
        });
    }
  }
  createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`Fulfilled promise ${position} in ${delay}ms`);
        } else {
          reject(`Rejected promise ${position} in ${delay}ms`);
        }
      }, delay);
    });
    return promise;
  }
}
function promiseArgsLauch() {
  newPromise.promiseCycle(
    refs.amount.value,
    refs.delayInput.value,
    refs.stepInput.value
  );
}
const newPromise = new PromiseCycle({
  notify: Notify,
});
refs.submitBtn.addEventListener('click', promiseArgsLauch);
