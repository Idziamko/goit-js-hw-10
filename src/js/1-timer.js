/**
 * Timer Countdown Application
 * Module 10 - Homework Task 1
 */

// Import required libraries
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

/**
 * DOM References
 * Store references to HTML elements for easy access
 */
const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

/**
 * Application State
 * Store selected date and timer interval ID
 */
let userSelectedDate = null;
let timerInterval = null;

/**
 * Flatpickr Configuration
 * Set up date picker options
 */
const options = {
  enableTime: true, // Enable time selection
  time_24hr: true, // Use 24-hour format
  defaultDate: new Date(), // Set default to current date
  minuteIncrement: 1, // Increment minutes by 1
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    // Validate if selected date is in the future
    if (selectedDate <= now) {
      // Show error notification for past dates
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
    } else {
      // Store valid date and enable start button
      userSelectedDate = selectedDate;
      refs.startBtn.disabled = false;
    }
  },
};

// Initialize flatpickr on datetime picker input
flatpickr(refs.datetimePicker, options);

/**
 * Start Button Event Handler
 * Initialize countdown when button is clicked
 */
refs.startBtn.addEventListener('click', () => {
  // Disable button and input to prevent changes during countdown
  refs.startBtn.disabled = true;
  refs.datetimePicker.disabled = true;

  // Start countdown interval (updates every second)
  timerInterval = setInterval(() => {
    const now = new Date();
    const deltaTime = userSelectedDate - now;

    // Check if countdown reached zero
    if (deltaTime <= 0) {
      clearInterval(timerInterval);
      updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      refs.datetimePicker.disabled = false;
      return;
    }

    // Calculate remaining time and update display
    const time = convertMs(deltaTime);
    updateTimerInterface(time);
  }, 1000);
});

/**
 * Convert Milliseconds to Time Units
 * Calculate days, hours, minutes, and seconds from milliseconds
 *
 * @param {number} ms - Time difference in milliseconds
 * @returns {object} Object with days, hours, minutes, seconds properties
 */
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Calculate remaining days
  const days = Math.floor(ms / day);

  // Calculate remaining hours
  const hours = Math.floor((ms % day) / hour);

  // Calculate remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);

  // Calculate remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

/**
 * Update Timer Display
 * Update HTML elements with formatted time values
 *
 * @param {object} time - Object with days, hours, minutes, seconds
 */
function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

/**
 * Add Leading Zero
 * Format single-digit numbers with leading zero
 *
 * @param {number} value - Number to format
 * @returns {string} Formatted string (e.g., '5' -> '05')
 */
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
