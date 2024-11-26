// Typing Animation using a Similar Logic to Typed.js
const typingElement = document.querySelector('.typed');

if (typingElement) {
  // Get the words from the 'data-typed-items' attribute
  let typedStrings = typingElement.getAttribute('data-typed-items');
  const words = typedStrings.split(',').map(word => word.trim());
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 150;
  const backSpeed = 50;
  const backDelay = 2000;
  const cursor = '|';

  function type() {
    const currentWord = words[wordIndex];

    // Typing and Deleting Logic
    if (isDeleting) {
      typingElement.textContent = currentWord.slice(0, charIndex--) + cursor;
    } else {
      typingElement.textContent = currentWord.slice(0, charIndex++) + cursor;
    }

    // If the word is fully typed
    if (!isDeleting && charIndex === currentWord.length + 1) {
      isDeleting = true;
      setTimeout(type, backDelay);
      return;
    }

    // If the word is fully deleted
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    // Set typing speed based on deleting or typing state
    setTimeout(type, isDeleting ? backSpeed : typeSpeed);
  }

  // Start the typing animation
  document.addEventListener("DOMContentLoaded", type);
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thank you for reaching out! Your message has been sent.');
  contactForm.reset();
});



var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var colors = [
    // '0, 50, 133',
    // '42, 98, 154',
    // '255, 127, 62',
    // '255, 218, 120'
  '255, 107, 203',  // #ff6bcb - Accent (Pink)
  '31, 147, 255',   // #1f93ff - Accent (Light Blue) 
  '224, 107, 174',  // #e06bae - Hover Accent (Light Pink)
  '31, 147, 255'    // #1f93ff - Accent (Light Blue)
];

class Particle {
  constructor(x, y) {
    this.lifetime = 0;
    
    this.x = x; 
    this.y = y; 
    
    // Random velocity (between -4 and 4)
    this.dx = (Math.random() * 4) * Math.sign(Math.random() - 0.5);
    this.dy = (Math.random() * 4) * Math.sign(Math.random() - 0.5);
    
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = 1;
  }
  
  updateState() {
    this.lifetime += 1;
    
    this.x += this.dx;
    this.y += this.dy;
    
    // Logarithmically slow down
    this.dx = this.dx / 1.05;
    this.dy = this.dy / 1.05;
    
    // Fade out after 40 frame delay
    if (this.lifetime > 40) {
      this.opacity -= 0.05;
    }
  }
}

class Circle extends Particle {
  constructor(x, y) {
    super(x, y);
    
    // Random radius (between 2 and 7)
    this.radius = (Math.random() * 5) + 2;
  }
  
  updateState() {
    super.updateState();
    
    // Logarithmically shrink radius
    this.radius = this.radius / 1.01;
  }
  
  render() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    c.fill();
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function spawnParticle(x, y) {
  let key = (Math.random() + 1).toString(36).substring(2);
  
  particles[key] = new Circle(event.x, event.y);
  
  // Clean up dead particles
  setTimeout(() => {
    delete particles[key];
  }, 1000);
}

var particles = {};

window.addEventListener('resize', function() {
  resizeCanvas();
});

window.addEventListener('mousemove', function(event) {
  spawnParticle(event.x, event.y);
});

setTimeout(() => {
  resizeCanvas();
  animate();
}, 10);

function animate() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  
  Object.values(particles).map((particle) => {
    particle.updateState();
    particle.render();
  });
  
  requestAnimationFrame(animate);
}



// Hamburger Menu Toggle
const hamburgerMenu = document.createElement('div');
hamburgerMenu.classList.add('hamburger-menu');
hamburgerMenu.innerHTML = `<i class="fas fa-bars"></i>`;
document.body.appendChild(hamburgerMenu);

const nav = document.querySelector('nav');

hamburgerMenu.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburgerMenu.innerHTML = nav.classList.contains('open') ? `<i class="fas fa-times"></i>` : `<i class="fas fa-bars"></i>`;
});
