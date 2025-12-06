function triggerTransformation() {
    const body = document.body;
    body.classList.add('glitching');

    // Start typing effect
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text') || './override.sh';
        typeText(typingElement, text, 50);
    }

    setTimeout(() => {
        body.classList.remove('glitching');
        body.classList.remove('state-a');
        body.classList.add('state-b');
        initMatrixRain();
        document.title = "Dava Ulus | Fullstack Developer & AI Enthusiast";

        // Reset typing for next time
        if (typingElement) typingElement.textContent = '';
    }, 2500);
}

function typeText(element, text, speed) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(draw, 30);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.classList.toggle('rainbow-mode');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px) scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

// Hacker Text Scramble Effect
class HackerScramble {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent; // Use textContent instead of innerText
        this.chars = '!<>-_/[]{}—=+*'; // Safer chars
        this.frameRequest = null;
        this.frame = 0;
        this.queue = [];
        this.resolve = null;
    }

    setText(newText) {
        const oldText = this.originalText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);

        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        // ... (update method remains same, but showing context for replace efficiency)
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.element.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update.bind(this));
            this.frame++;
        }
    }

    scramble() {
        // Lock dimensions to prevent layout shift
        const width = this.element.offsetWidth;
        const height = this.element.offsetHeight;

        this.element.style.display = 'inline-block'; // Ensure it respects dimensions
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;

        this.setText(this.originalText).then(() => {
            // Unlock dimensions
            this.element.style.width = '';
            this.element.style.height = '';
        });
    }
}

// Typewriter Effect - infinite loop
class Typewriter {
    constructor(element, texts, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            speed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }

    start() {
        this.type();
    }
}

// Initialize typewriter when page loads
document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = [
            'FULLSTACK DEVELOPER',
            'AI ENTHUSIAST',
            'WEB DEVELOPER',
            'TECH LEARNER'
        ];
        const typewriter = new Typewriter(typewriterElement, texts, 80, 40, 2000);
        typewriter.start();
    }

    // 2. Hacker Scramble Effect
    const scrambleElements = document.querySelectorAll('.cyber-header h1, .section-title, .project-title, .nav-link');
    scrambleElements.forEach(el => {
        const scrambler = new HackerScramble(el);
        el.addEventListener('mouseenter', () => {
            if (document.body.classList.contains('state-b')) {
                scrambler.scramble();
            }
        });
    });

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Desktop Only Features
    if (isDesktop) {
        // 3. Magnetic Button Effect
        const magnets = document.querySelectorAll('.contact-link');
        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', (e) => {
                if (!document.body.classList.contains('state-b')) return;
                const rect = magnet.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
                magnet.style.borderColor = 'var(--accent-neon)';
                magnet.style.boxShadow = '0 0 15px var(--accent-neon)';
            });

            magnet.addEventListener('mouseleave', () => {
                magnet.style.transform = 'translate(0, 0) scale(1)';
                magnet.style.borderColor = '#333';
                magnet.style.boxShadow = 'none';
            });
        });

        // 4. Custom Cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.display = 'none';
        document.body.appendChild(cursor);

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.display = 'none';
        document.body.appendChild(trail);

        function updateCursorVisibility() {
            const isStateB = document.body.classList.contains('state-b');
            cursor.style.display = isStateB ? 'block' : 'none';
            trail.style.display = isStateB ? 'block' : 'none';
        }

        setInterval(updateCursorVisibility, 100);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';

            setTimeout(() => {
                trail.style.left = e.clientX - 4 + 'px';
                trail.style.top = e.clientY - 4 + 'px';
            }, 50);
        });

        document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
        document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

        // Click Ripple (Desktop)
        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('state-b')) {
                createRipple(e.clientX, e.clientY);
            }
        });

        // 5. 3D Tilt Effect (Wrapper Method with Smoothing)
        const cards = document.querySelectorAll('.project-card, .skill-item');
        cards.forEach(card => {
            // Check if wrapper already exists (to prevent dupes if re-run)
            if (card.parentElement.classList.contains('tilt-wrapper')) return;

            const wrapper = document.createElement('div');
            wrapper.classList.add('tilt-wrapper');
            wrapper.style.display = 'inline-block';
            wrapper.style.width = '100%';
            wrapper.style.height = '100%';
            wrapper.style.perspective = '1000px';

            card.parentNode.insertBefore(wrapper, card);
            wrapper.appendChild(card);

            // Smooth values (current state)
            let currentX = 0, currentY = 0;
            let targetX = 0, targetY = 0;
            let isAnimating = false;
            let animationId = null;

            // GPU acceleration - NO CSS transition to avoid conflict with JS animation
            card.style.willChange = 'transform';
            card.style.backfaceVisibility = 'hidden';
            card.style.transformStyle = 'preserve-3d';

            // Ultra-smooth animation loop using lerp with lower factor
            function animate() {
                if (!isAnimating) {
                    animationId = null;
                    return;
                }

                // Lower lerp factor (0.06) for smoother, less jittery movement
                currentX += (targetX - currentX) * 0.06;
                currentY += (targetY - currentY) * 0.06;

                // Only update if difference is significant (anti-micro-jitter)
                const diffX = Math.abs(targetX - currentX);
                const diffY = Math.abs(targetY - currentY);

                if (diffX > 0.01 || diffY > 0.01) {
                    // Round to 1 decimal for even more stability
                    const rx = Math.round(currentX * 10) / 10;
                    const ry = Math.round(currentY * 10) / 10;

                    // Use translate3d(0,0,0) to force GPU layer
                    card.style.transform = `translate3d(0,0,0) rotateX(${rx}deg) rotateY(${ry}deg)`;
                }

                animationId = requestAnimationFrame(animate);
            }

            wrapper.addEventListener('mouseenter', () => {
                if (!document.body.classList.contains('state-b')) return;
                isAnimating = true;
                card.style.borderColor = 'var(--accent-neon)';
                card.style.boxShadow = '0 20px 50px rgba(0, 255, 204, 0.2)';
                if (!animationId) animate();
            });

            wrapper.addEventListener('mousemove', (e) => {
                if (!document.body.classList.contains('state-b') || !isAnimating) return;

                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Moderate sensitivity (10deg) - balanced between dramatic and stable
                targetX = ((y - centerY) / centerY) * -10;
                targetY = ((x - centerX) / centerX) * 10;
            });

            wrapper.addEventListener('mouseleave', () => {
                isAnimating = false;
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }

                // Smoothly return to zero
                targetX = 0;
                targetY = 0;
                currentX = 0;
                currentY = 0;

                if (!document.body.classList.contains('state-b')) {
                    card.style.transform = 'none';
                    return;
                }
                card.style.transform = 'translate3d(0,0,0) rotateX(0) rotateY(0)';
                card.style.borderColor = '#222';
                card.style.boxShadow = 'none';
            });
        });
    }

    // 6. Touch Ripple (Mobile)
    document.addEventListener('touchstart', (e) => {
        if (document.body.classList.contains('state-b')) {
            const touch = e.touches[0];
            createRipple(touch.clientX, touch.clientY);
        }
    }, { passive: true });

    // 7. Scroll Reveal & Auto Scramble (All Devices, especially Mobile)
    const revealElements = document.querySelectorAll('.project-card, .skill-item, .cert-card, .section-title');
    revealElements.forEach(el => el.classList.add('reveal-me'));

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && document.body.classList.contains('state-b')) {
                // Trigger Reveal Animation
                entry.target.classList.add('active');

                // Trigger Auto Scramble if element is a text element
                if (entry.target.tagName === 'H1' || entry.target.classList.contains('section-title') || entry.target.classList.contains('project-title')) {
                    const scrambler = new HackerScramble(entry.target);
                    // Check if already scrambled to avoid loops (optional logic)
                    if (!entry.target.dataset.scrambled) {
                        scrambler.scramble();
                        entry.target.dataset.scrambled = "true";
                    }
                }

                // Stop observing once revealed (optional, keep observing if you want re-trigger)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
    scrambleElements.forEach(el => observer.observe(el)); // Add scramble targets to observer

    // 8. Touch Highlight Effect (Mobile Only) - Simple glow, no 3D tilt
    if (!isDesktop) {
        const touchCards = document.querySelectorAll('.project-card, .skill-item');

        touchCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                if (!document.body.classList.contains('state-b')) return;
                card.style.transition = 'all 0.2s ease-out';
                card.style.borderColor = 'var(--accent-neon)';
                card.style.boxShadow = '0 0 20px rgba(0, 255, 204, 0.4), inset 0 0 10px rgba(0, 255, 204, 0.1)';
                card.style.transform = 'scale(0.98)'; // Subtle press effect
            }, { passive: true });

            card.addEventListener('touchend', () => {
                if (!document.body.classList.contains('state-b')) return;
                card.style.transition = 'all 0.3s ease-out';
                card.style.borderColor = '#222';
                card.style.boxShadow = 'none';
                card.style.transform = 'scale(1)';
            }, { passive: true });

            card.addEventListener('touchcancel', () => {
                card.style.borderColor = '#222';
                card.style.boxShadow = 'none';
                card.style.transform = 'scale(1)';
            }, { passive: true });
        });
    }

});

// Create ripple effect
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}
