
const cursor = document.getElementById('customCursor');
const cursorTrail = document.getElementById('cursorTrail');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(cursorTrail, { x: e.clientX, y: e.clientY, duration: 0.3 });
});

window.addEventListener('scroll', () => {

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgressBar').style.width = `${progress}%`;
});


const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,194,194,${this.opacity})`;
        ctx.fill();
    }
}
for (let i = 0; i < 80; i++) particles.push(new Particle());
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ==================== MUSIC PLAYER ====================
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const musicPlayer = document.getElementById('musicPlayer');
musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().then(() => musicPlayer.classList.add('playing')).catch(() => {});
    } else {
        bgMusic.pause();
        musicPlayer.classList.remove('playing');
    }
});

// ==================== BUTTON RIPPLE ====================
document.querySelectorAll('.btn-begin').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = this.querySelector('.btn-ripple');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        ripple.classList.remove('animation');
        void ripple.offsetWidth;
        ripple.style.animation = 'rippleEffect 0.6s linear';
        // Scroll to story section
        document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
    });
});

// ==================== TIMELINE SCROLL ANIMATION ====================
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15
    });
});

// ==================== FLOATING CARDS (Section 2) ====================
const cardContainer = document.getElementById('floatingCards');
const admireList = [
    "Your smile lights up my world",
    "The way you laugh so freely",
    "How you listen with your whole heart",
    "Your incredible strength",
    "Your comforting hugs",
    "The way you say my name",
    "Your beautiful mind",
    "Your unwavering support",
    "How you make ordinary days magical",
    "Your patience with me",
    "The way you love deeply",
    "Your creativity",
    "Your honesty",
    "Your gentle soul",
    "Your brilliant ideas",
    "Everything you are"
];
// 🔴 EDIT the array above with 20 things you admire about her
admireList.forEach(text => {
    const card = document.createElement('div');
    card.className = 'floating-card glass-card';
    card.textContent = text;
    cardContainer.appendChild(card);
});
// Float animation
gsap.utils.toArray('.floating-card').forEach(card => {
    gsap.to(card, {
        y: 'random(-15, 15)',
        x: 'random(-10, 10)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        gsap.to(card, { x: x*0.2, y: y*0.2, rotation: x*0.05, duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { x: 0, y: 0, rotation: 0, duration: 0.5 });
    });
});

// ==================== LOVE LETTER ENVELOPE ====================
const envelope = document.getElementById('envelope');
const letterPaper = document.getElementById('letterPaper');
let isOpen = false;
envelope.addEventListener('click', () => {
    if (!isOpen) {
        envelope.style.transform = 'scale(0.95)';
        gsap.to('.envelope-flap', { rotationX: 180, duration: 0.6, transformOrigin: 'top' });
        setTimeout(() => {
            letterPaper.classList.add('visible');
            // Typewriter effect
            const lines = document.querySelectorAll('.typewriter-line');
            lines.forEach((line, i) => {
                line.style.visibility = 'hidden';
                setTimeout(() => {
                    line.style.visibility = 'visible';
                    line.style.animation = 'typing 2s steps(30) forwards';
                }, i * 300);
            });
        }, 700);
        isOpen = true;
    }
});

// ==================== QUOTES ANIMATION ====================
const quotes = document.querySelectorAll('.floating-quote');
gsap.set(quotes, { opacity: 0, scale: 0.8 });
quotes.forEach((q, i) => {
    gsap.to(q, {
        scrollTrigger: {
            trigger: '#quotesStage',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0.2,
        scale: 1,
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 100,
        duration: 2,
        delay: i * 0.2,
        ease: 'power2.out'
    });
});

// ==================== STARRY NIGHT (Section 5) ====================
const starCanvas = document.getElementById('starryCanvas');
const starCtx = starCanvas.getContext('2d');
let stars = [];
function resizeStarCanvas() {
    starCanvas.width = starCanvas.offsetWidth;
    starCanvas.height = starCanvas.offsetHeight;
}
resizeStarCanvas();
window.addEventListener('resize', resizeStarCanvas);
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        r: Math.random() * 2,
        opacity: Math.random()
    });
}
function drawStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(s => {
        starCtx.beginPath();
        starCtx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        starCtx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        starCtx.fill();
    });
    // Shooting star occasionally
    if (Math.random() < 0.02) {
        const sx = Math.random() * starCanvas.width;
        starCtx.beginPath();
        starCtx.moveTo(sx, 0);
        starCtx.lineTo(sx - 80, 80);
        starCtx.strokeStyle = 'rgba(255,255,255,0.8)';
        starCtx.stroke();
    }
    requestAnimationFrame(drawStars);
}
drawStars();

// ==================== FINALE ANIMATION ====================
const finaleSection = document.getElementById('finale');
const heartPath = document.getElementById('heartPath');
const finaleText = document.getElementById('finaleText');
const finaleClosing = document.getElementById('finaleClosing');

gsap.fromTo(heartPath, { strokeDashoffset: 300 }, {
    strokeDashoffset: 0,
    duration: 2,
    scrollTrigger: {
        trigger: finaleSection,
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});
gsap.fromTo('.finale-line', { opacity: 0, y: 20 }, {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.6, delay: 1,
    scrollTrigger: { trigger: finaleSection, start: 'top 80%' }
});
gsap.fromTo(finaleClosing, { opacity: 0, scale: 0.8 }, {
    opacity: 1, scale: 1, duration: 1.5, delay: 3,
    scrollTrigger: { trigger: finaleSection, start: 'top 80%' }
});

// Confetti on finale
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.background = `hsl(${Math.random()*360}, 70%, 70%)`;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10%';
        container.appendChild(confetti);
        gsap.to(confetti, {
            y: window.innerHeight + 50,
            x: 'random(-100, 100)',
            rotation: 'random(360)',
            duration: 'random(2, 5)',
            ease: 'power1.in',
            onComplete: () => confetti.remove()
        });
    }
}
ScrollTrigger.create({
    trigger: finaleSection,
    start: 'top 90%',
    onEnter: createConfetti
});

// ==================== RESPECT REDUCED MOTION ====================
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
    gsap.globalTimeline.pause();
    document.querySelectorAll('.floating-card').forEach(c => gsap.killTweensOf(c));
}