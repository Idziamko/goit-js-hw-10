/**
 * Promise Generator Application
 * Module 10 - Homework Task 2
 */

// Import iziToast library for notifications
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

/**
 * DOM References
 * Get reference to form element
 */
const form = document.querySelector('.promise-form');

/**
 * Form Submit Event Handler
 * Create and handle promise based on user input
 */
form.addEventListener('submit', event => {
  // Prevent default form submission
  event.preventDefault();

  // Get delay value and selected state from form
  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  // Create promise with specified delay and state
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        // Resolve promise if fulfilled state selected
        resolve(delay);
      } else {
        // Reject promise if rejected state selected
        reject(delay);
      }
    }, delay);
  });

  // Handle promise resolution/rejection with notifications
  promise
    .then(delay => {
      // Show success notification for fulfilled promise
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      // Show error notification for rejected promise
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
