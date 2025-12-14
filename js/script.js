// Remove initial animations from CSS, handle with JS instead
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(80px)';
    section.style.transition = 'all 1s ease-out';
});

// Smooth scroll-triggered animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Typing animation for hero text
const heroText = "AI-Native Developer";
const heroElement = document.querySelector('#hero h1');
let index = 0;

heroElement.textContent = '';

function typeWriter() {
    if (index < heroText.length) {
        heroElement.textContent += heroText.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

setTimeout(typeWriter, 500);

// Interactive expandable project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('expanded');
        
        if (this.classList.contains('expanded')) {
            this.style.gridColumn = 'span 2';
            this.querySelector('p').style.maxHeight = '500px';
        } else {
            this.style.gridColumn = 'span 1';
            this.querySelector('p').style.maxHeight = '100px';
        }
    });
});

// Contact form validation
const contactSection = document.querySelector('#contact');
contactSection.innerHTML = `
    <h2>Get In Touch</h2>
    <form id="contactForm">
        <input type="text" id="name" placeholder="Your Name" required>
        <input type="email" id="email" placeholder="Your Email" required>
        <textarea id="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
        <p id="formMessage"></p>
    </form>
`;

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');
    
    if (name && email && message) {
        formMessage.textContent = 'Thank you! Message sent successfully.';
        formMessage.style.color = '#3d8b5c';
        this.reset();
    } else {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.color = '#d32f2f';
    }
});

// Improved navigation - works same in both directions
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        // Get all sections
        const allSections = Array.from(document.querySelectorAll('section'));
        const targetIndex = allSections.indexOf(targetElement);
        
        // Calculate total height of all sections before target
        let scrollPosition = 0;
        for (let i = 0; i < targetIndex; i++) {
            scrollPosition += allSections[i].offsetHeight;
        }
        
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    });
});

// Logo click to top
document.querySelector('.logo a').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});