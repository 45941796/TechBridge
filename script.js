document.addEventListener('DOMContentLoaded', () => {
    // Particle Animation
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: ['#1E3A8A', '#06B6D4', '#F97316'][Math.floor(Math.random() * 3)]
        };
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Testimonial Slider
    const stories = document.querySelectorAll('.story-slider .story');
    const dots = document.querySelectorAll('.slider-nav .dot');
    let currentStory = 0;
    function showStory(index) {
        stories.forEach((s, i) => {
            s.classList.remove('active');
            dots[i].classList.remove('active');
            if (i === index) {
                s.classList.add('active');
                dots[i].classList.add('active');
            }
        });
    }
    function showNextStory() {
        currentStory = (currentStory + 1) % stories.length;
        showStory(currentStory);
    }
    if (stories.length > 0) {
        showStory(0);
        let sliderInterval = setInterval(showNextStory, 5000);
        document.querySelector('.story-slider').addEventListener('mouseover', () => clearInterval(sliderInterval));
        document.querySelector('.story-slider').addEventListener('mouseout', () => {
            sliderInterval = setInterval(showNextStory, 5000);
        });
    }
    window.goToStory = (index) => {
        currentStory = index;
        showStory(index);
    };

    // Job Counter
    const jobCount = document.getElementById('job-count');
    if (jobCount) {
        let count = 200;
        const target = 250;
        const increment = 1;
        const speed = 50;
        function updateCount() {
            if (count < target) {
                count += increment;
                jobCount.textContent = count;
                setTimeout(updateCount, speed);
            } else {
                jobCount.textContent = target;
            }
        }
        updateCount();
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing to TechBridge EA updates!');
            newsletterForm.reset();
        });
    }

    // CTA Pop-Up
    const popup = document.getElementById('cta-popup');
    if (popup) {
        setTimeout(() => {
            popup.style.display = 'block';
            popup.classList.add('animate__animated', 'animate__fadeIn');
        }, 10000);
    }
    window.closePopup = () => {
        popup.style.display = 'none';
    };

    // Chatbot
    const chatbot = document.createElement('div');
    chatbot.id = 'chatbot';
    chatbot.innerText = 'Chat with Us!';
    document.body.appendChild(chatbot);

    const messages = document.createElement('div');
    messages.id = 'chatbot-messages';
    document.body.appendChild(messages);

    chatbot.addEventListener('click', () => {
        messages.style.display = messages.style.display === 'none' ? 'block' : 'none';
        messages.innerHTML = `
            <p><strong>TechBridge Bot:</strong> Hi! Ask me about our training or jobs.</p>
            <p><strong>You:</strong> <input type="text" id="chat-input" placeholder="Type here..."></p>
            <button onclick="sendMessage()">Send</button>
        `;
        messages.classList.add('animate__animated', 'animate__fadeInUp');
    });
});

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('chat-input').value.toLowerCase();
    const messages = document.getElementById('chatbot-messages');
    let response = 'Sorry, I didn’t get that. Try asking about courses or jobs!';
    if (input.includes('course') || input.includes('training')) {
        response = 'We offer free courses in coding, AI, data annotation, and agri-tech. Check the Training page!';
    } else if (input.includes('job')) {
        response = 'Explore remote and local tech jobs on our Jobs page. Apply today!';
    } else if (input.includes('walter')) {
        response = 'Contact Walter Koech, CEO, at +254714392009 or via the Contact page!';
    }
    messages.innerHTML += `<p><strong>TechBridge Bot:</strong> ${response}</p>`;
}