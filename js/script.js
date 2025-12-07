function triggerTransformation() {
    const body = document.body;
    body.classList.add('glitching');

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

        window.scrollTo({ top: 0, behavior: 'smooth' });

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

    const chars = 'アァカサタナハマヤャラワガザダバパABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops = new Array(columns).fill(1);

    let lastTime = 0;
    const fps = 33;

    function draw(currentTime) {
        if (currentTime - lastTime >= fps) {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), i * fontSize, rainDrops[i] * fontSize);
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
                rainDrops[i]++;
            }
            lastTime = currentTime;
        }
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

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

class HackerScramble {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.chars = '!<>-_/[]{}—=+*';
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
        const width = this.element.offsetWidth;
        const height = this.element.offsetHeight;

        this.element.style.display = 'inline-block';
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;

        this.setText(this.originalText).then(() => {
            this.element.style.width = '';
            this.element.style.height = '';
        });
    }
}

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

document.addEventListener('DOMContentLoaded', () => {
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

    if (isDesktop) {
        const magnets = document.querySelectorAll('.contact-link');
        magnets.forEach(magnet => {
            magnet.style.transition = 'transform 0.2s ease-out, border-color 0.2s ease, box-shadow 0.2s ease';

            let originalRect = null;

            magnet.addEventListener('mouseenter', () => {
                if (!document.body.classList.contains('state-b')) return;
                originalRect = magnet.getBoundingClientRect();
            });

            magnet.addEventListener('mousemove', (e) => {
                if (!document.body.classList.contains('state-b') || !originalRect) return;

                const x = e.clientX - originalRect.left - originalRect.width / 2;
                const y = e.clientY - originalRect.top - originalRect.height / 2;

                const maxMove = 10;
                const moveX = Math.max(-maxMove, Math.min(maxMove, x * 0.15));
                const moveY = Math.max(-maxMove, Math.min(maxMove, y * 0.15));

                magnet.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                magnet.style.borderColor = 'var(--accent-neon)';
                magnet.style.boxShadow = '0 0 15px var(--accent-neon)';
            });

            magnet.addEventListener('mouseleave', () => {
                originalRect = null;
                magnet.style.transform = 'translate(0, 0) scale(1)';
                magnet.style.borderColor = '#333';
                magnet.style.boxShadow = 'none';
            });
        });

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

        new MutationObserver(updateCursorVisibility).observe(document.body, { attributes: true, attributeFilter: ['class'] });
        updateCursorVisibility();

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

        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('state-b')) {
                createRipple(e.clientX, e.clientY);
            }
        });

        const cards = document.querySelectorAll('.project-card, .skill-item');
        cards.forEach(card => {
            if (card.parentElement.classList.contains('tilt-wrapper')) return;

            const wrapper = document.createElement('div');
            wrapper.classList.add('tilt-wrapper');
            wrapper.style.display = 'inline-block';
            wrapper.style.width = '100%';
            wrapper.style.height = '100%';
            wrapper.style.perspective = '1000px';

            card.parentNode.insertBefore(wrapper, card);
            wrapper.appendChild(card);

            let currentX = 0, currentY = 0;
            let targetX = 0, targetY = 0;
            let animationId = null;
            let isHovering = false;

            card.style.willChange = 'transform';
            card.style.backfaceVisibility = 'hidden';
            card.style.transformStyle = 'preserve-3d';
            card.style.pointerEvents = 'none';

            function animate() {
                currentX += (targetX - currentX) * 0.08;
                currentY += (targetY - currentY) * 0.08;

                const rx = Math.round(currentX * 100) / 100;
                const ry = Math.round(currentY * 100) / 100;

                card.style.transform = `translate3d(0,0,0) rotateX(${rx}deg) rotateY(${ry}deg)`;

                const diffX = Math.abs(targetX - currentX);
                const diffY = Math.abs(targetY - currentY);

                if (diffX > 0.01 || diffY > 0.01 || isHovering) {
                    animationId = requestAnimationFrame(animate);
                } else {
                    animationId = null;
                    card.style.transform = 'translate3d(0,0,0) rotateX(0) rotateY(0)';
                }
            }

            function startAnimation() {
                if (!animationId) {
                    animationId = requestAnimationFrame(animate);
                }
            }

            wrapper.addEventListener('mouseenter', () => {
                if (!document.body.classList.contains('state-b')) return;
                isHovering = true;
                card.style.borderColor = 'var(--accent-neon)';
                card.style.boxShadow = '0 20px 50px rgba(0, 255, 204, 0.2)';
                startAnimation();
            });

            wrapper.addEventListener('mousemove', (e) => {
                if (!document.body.classList.contains('state-b') || !isHovering) return;

                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const percentX = (x - centerX) / centerX;
                const percentY = (y - centerY) / centerY;

                targetX = Math.max(-6, Math.min(6, percentY * -6));
                targetY = Math.max(-6, Math.min(6, percentX * 6));
            });

            wrapper.addEventListener('mouseleave', () => {
                isHovering = false;
                targetX = 0;
                targetY = 0;

                if (!document.body.classList.contains('state-b')) {
                    card.style.transform = 'none';
                    return;
                }

                card.style.borderColor = '#222';
                card.style.boxShadow = 'none';
                startAnimation();
            });
        });
    }

    document.addEventListener('touchstart', (e) => {
        if (document.body.classList.contains('state-b')) {
            const touch = e.touches[0];
            createRipple(touch.clientX, touch.clientY);
        }
    }, { passive: true });

    const revealElements = document.querySelectorAll('.project-card, .skill-item, .cert-card, .section-title');
    revealElements.forEach(el => el.classList.add('reveal-me'));

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && document.body.classList.contains('state-b')) {
                entry.target.classList.add('active');

                if (entry.target.tagName === 'H1' || entry.target.classList.contains('section-title') || entry.target.classList.contains('project-title')) {
                    const scrambler = new HackerScramble(entry.target);
                    if (!entry.target.dataset.scrambled) {
                        scrambler.scramble();
                        entry.target.dataset.scrambled = "true";
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
    scrambleElements.forEach(el => observer.observe(el));

    if (!isDesktop) {
        const touchCards = document.querySelectorAll('.project-card, .skill-item');

        touchCards.forEach(card => {
            let startX = 0, startY = 0;
            let isDragging = false;
            let hasMoved = false;
            const DRAG_THRESHOLD = 10;

            card.addEventListener('touchstart', (e) => {
                if (!document.body.classList.contains('state-b')) return;
                const touch = e.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;
                isDragging = true;
                hasMoved = false;

                card.style.transition = 'border-color 0.2s, box-shadow 0.2s';
                card.style.borderColor = 'var(--accent-neon)';
                card.style.boxShadow = '0 0 20px rgba(0, 255, 204, 0.4)';
            }, { passive: true });

            card.addEventListener('touchmove', (e) => {
                if (!isDragging || !document.body.classList.contains('state-b')) return;

                const touch = e.touches[0];
                const deltaX = touch.clientX - startX;
                const deltaY = touch.clientY - startY;

                if (!hasMoved && (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)) {
                    hasMoved = true;
                    card.style.transition = 'transform 0.1s ease-out';
                }

                if (hasMoved) {
                    const rect = card.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = Math.max(-5, Math.min(5, ((y - centerY) / centerY) * -5));
                    const rotateY = Math.max(-5, Math.min(5, ((x - centerX) / centerX) * 5));

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                }
            }, { passive: true });

            card.addEventListener('touchend', () => {
                isDragging = false;
                card.style.transition = 'all 0.3s ease-out';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                card.style.borderColor = '#222';
                card.style.boxShadow = 'none';
            }, { passive: true });

            card.addEventListener('touchcancel', () => {
                isDragging = false;
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                card.style.borderColor = '#222';
                card.style.boxShadow = 'none';
            }, { passive: true });
        });
    }
});

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}
