// Intersection Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    // Steps
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => observer.observe(card));
    
    // Features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animation du compteur pour les stats
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('fr-FR');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('fr-FR');
            }
        }, 30);
    };
    
    // Observer les stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const value = statNumber.textContent.replace(/[^0-9]/g, '');
                if (value && !statNumber.dataset.animated) {
                    statNumber.dataset.animated = 'true';
                    statNumber.textContent = '0';
                    
                    // Démarrer l'animation du compteur
                    setTimeout(() => {
                        if (statNumber.textContent.includes('%')) {
                            animateCounter(statNumber, parseInt(value));
                            statNumber.textContent += '%';
                        } else if (statNumber.textContent.includes('+')) {
                            animateCounter(statNumber, parseInt(value));
                            statNumber.textContent = statNumber.textContent + '+';
                        } else {
                            animateCounter(statNumber, parseInt(value));
                        }
                    }, 200);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
    
    // Animation parallaxe légère pour le hero
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroImage = document.querySelector('.hero-image');
                if (heroImage && scrolled < 800) {
                    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Effet de hover sur les mockup cards
    const mockupCard = document.querySelector('.mockup-card');
    if (mockupCard) {
        mockupCard.addEventListener('mousemove', (e) => {
            const rect = mockupCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = -(x - centerX) / 20;
            
            mockupCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        mockupCard.addEventListener('mouseleave', () => {
            mockupCard.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-5deg)';
        });
    }
});

// Animation de typing pour le titre (optionnel)
function typeWriter(element, text, speed = 100) {
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

// Effet de particules en arrière-plan (optionnel)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(37, 99, 235, ${Math.random() * 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Décommenter pour activer les particules
// createParticles();

console.log('✨ Animations StudyHub chargées');