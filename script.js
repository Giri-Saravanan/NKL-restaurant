  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('header nav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });


function countUp(target, duration) {
const element = document.getElementById(target);
const endValue = parseInt(element.textContent, 10);
const increment = endValue / (duration / 16); // Approx. 60fps
let currentValue = 0;

      function updateCounter() {
        currentValue += increment;
        if (currentValue >= endValue) {
          element.textContent = endValue;
        } else {
          element.textContent = Math.floor(currentValue);
          requestAnimationFrame(updateCounter);
        }
      }

      updateCounter();
    }

    // Set the target number and duration (in milliseconds)
    document.getElementById('counter1').textContent = 4000; // Target number
    countUp('counter1', 2000); // 2000ms = 2 seconds
   
    // Set the target number and duration (in milliseconds)
    document.getElementById('counter2').textContent = 300; // Target number
    countUp('counter2', 2000); // 2000ms = 2 seconds

    // Set the target number and duration (in milliseconds)
    document.getElementById('counter3').textContent = 200; // Target number
    countUp('counter3', 2000); // 2000ms = 2 seconds

    // Set the target number and duration (in milliseconds)
    document.getElementById('counter4').textContent = 10; // Target number
    countUp('counter4', 2000); // 2000ms = 2 seconds

