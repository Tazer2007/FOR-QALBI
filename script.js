  // ===== CURSOR =====
        const cursor = document.getElementById('customCursor');
        const cursorTrail = document.getElementById('cursorTrail');
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(cursorTrail, { x: e.clientX, y: e.clientY, duration: 0.3 });
        });

        // ===== SCROLL PROGRESS =====
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            document.getElementById('scrollProgressBar').style.width = `${progress}%`;
        });

        // ===== PARTICLES =====
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
            constructor() { this.reset(); }
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
            particles.forEach(p => { p.update();
                p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // ===== MUSIC =====
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

        // ===== BUTTON RIPPLE =====
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
                document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // ===== GSAP =====
        gsap.registerPlugin(ScrollTrigger);

        // Timeline
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.to(item, {
                scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.15
            });
        });

        // Floating Cards
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
        admireList.forEach(text => {
            const card = document.createElement('div');
            card.className = 'floating-card glass-card';
            card.textContent = text;
            cardContainer.appendChild(card);
        });

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
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(card, { x: x * 0.2, y: y * 0.2, rotation: x * 0.05, duration: 0.3 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { x: 0, y: 0, rotation: 0, duration: 0.5 });
            });
        });

        // ===== ENVELOPE - FIXED TYPEWRITER =====
        const envelope = document.getElementById('envelope');
        const envelopeFlap = document.getElementById('envelopeFlap');
        const letterPaper = document.getElementById('letterPaper');
        let isOpen = false;

        envelope.addEventListener('click', function() {
            if (isOpen) return;

            // Animate envelope flap
            envelopeFlap.classList.add('open');

            // Show letter with typewriter effect
            setTimeout(() => {
                letterPaper.classList.add('visible');

                // Get all typewriter lines
                const lines = document.querySelectorAll('.typewriter-line');

                lines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('visible');
                        // After animation completes, mark as done
                        setTimeout(() => {
                            line.classList.add('done');
                        }, 1500);
                    }, index * 400); // Stagger each line
                });
            }, 600);

            isOpen = true;
        });

        // ===== FINALE =====
        const heartPath = document.getElementById('heartPath');
        const finaleSection = document.getElementById('finale');

        gsap.fromTo(heartPath, { strokeDashoffset: 300 }, {
            strokeDashoffset: 0,
            duration: 2,
            scrollTrigger: { trigger: finaleSection, start: 'top 80%', toggleActions: 'play none none none' }
        });

        gsap.fromTo('.finale-line', { opacity: 0, y: 20 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.6,
            delay: 1,
            scrollTrigger: { trigger: finaleSection, start: 'top 80%' }
        });

        gsap.fromTo('.finale-closing', { opacity: 0, scale: 0.8 }, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            delay: 3,
            scrollTrigger: { trigger: finaleSection, start: 'top 80%' }
        });

        // ===== CONFETTI =====
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
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
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

        // ===== FINALE CANVAS PARTICLES =====
        (function() {
            const fCanvas = document.getElementById('finaleCanvas');
            const fCtx = fCanvas.getContext('2d');
            let fWidth, fHeight;
            let fParticles = [];

            function resizeFinaleCanvas() {
                const rect = fCanvas.parentElement.getBoundingClientRect();
                fCanvas.width = rect.width;
                fCanvas.height = rect.height;
                fWidth = fCanvas.width;
                fHeight = fCanvas.height;
            }
            resizeFinaleCanvas();
            window.addEventListener('resize', resizeFinaleCanvas);

            function createFParticle() {
                return {
                    x: Math.random() * fWidth,
                    y: Math.random() * fHeight * 1.2 - fHeight * 0.2,
                    size: 3 + Math.random() * 12,
                    speedX: (Math.random() - 0.5) * 0.8,
                    speedY: 0.4 + Math.random() * 1.6,
                    opacity: 0.3 + Math.random() * 0.6,
                    life: 200 + Math.random() * 400,
                    maxLife: 200 + Math.random() * 500,
                    isHeart: Math.random() > 0.4,
                    color: `hsl(${340 + Math.random() * 30}, 70%, ${60 + Math.random() * 30}%)`,
                    rotation: Math.random() * 6.28,
                    rotSpeed: (Math.random() - 0.5) * 0.03,
                };
            }

            for (let i = 0; i < 50; i++) {
                fParticles.push(createFParticle());
            }

            function drawFParticle(p) {
                fCtx.save();
                fCtx.translate(p.x, p.y);
                fCtx.rotate(p.rotation);
                fCtx.globalAlpha = Math.min(p.opacity, 0.9) * (p.life / p.maxLife);
                fCtx.fillStyle = p.color;
                fCtx.strokeStyle = p.color;
                fCtx.lineWidth = 1.2;

                if (p.isHeart) {
                    const s = p.size * 0.4;
                    fCtx.beginPath();
                    fCtx.moveTo(0, -s * 0.3);
                    fCtx.bezierCurveTo(-s * 0.8, -s * 0.8, -s * 0.8, s * 0.2, 0, s * 0.5);
                    fCtx.bezierCurveTo(s * 0.8, s * 0.2, s * 0.8, -s * 0.8, 0, -s * 0.3);
                    fCtx.closePath();
                    fCtx.fill();
                    fCtx.shadowColor = '#ffb0b0';
                    fCtx.shadowBlur = 8;
                } else {
                    const r = p.size * 0.4;
                    fCtx.beginPath();
                    fCtx.arc(0, 0, r, 0, Math.PI * 2);
                    fCtx.fill();
                    fCtx.shadowColor = '#ffb0b0';
                    fCtx.shadowBlur = 12;
                }
                fCtx.restore();
            }

            function updateFParticle(p) {
                p.x += p.speedX + Math.sin(p.y * 0.01) * 0.2;
                p.y += p.speedY;
                p.rotation += p.rotSpeed;
                p.life -= 0.8;

                if (p.y > fHeight + 30 || p.life <= 0 || p.x < -40 || p.x > fWidth + 40) {
                    Object.assign(p, createFParticle());
                    p.y = -10 - Math.random() * 30;
                    p.x = Math.random() * fWidth * 1.1 - fWidth * 0.05;
                    p.life = p.maxLife;
                }
            }

            function animateFParticles() {
                fCtx.clearRect(0, 0, fWidth, fHeight);
                for (let p of fParticles) {
                    updateFParticle(p);
                    drawFParticle(p);
                }
                requestAnimationFrame(animateFParticles);
            }
            animateFParticles();

            if (window.ResizeObserver) {
                const ro = new ResizeObserver(() => { resizeFinaleCanvas(); });
                ro.observe(fCanvas.parentElement);
            }
        })();

        // ===== REDUCED MOTION =====
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            gsap.globalTimeline.pause();
            document.querySelectorAll('.floating-card').forEach(c => gsap.killTweensOf(c));
        }