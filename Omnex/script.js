// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeNavbar();
    initializeAnimations();
    initializeScrollEffects();
});

// === SLIDESHOW FUNCTIONALITY ===

function initializeSlideshow() {
    // Démarrer le slideshow automatique
    startAutoSlide();
    
    // Event listeners pour les contrôles
    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
    
    // Event listeners pour les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Pause slideshow au hover
    const sliderContainer = document.querySelector('.hero-slider');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
}

function showSlide(index) {
    // Masquer toutes les slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Afficher la slide courante
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function startAutoSlide() {
    stopAutoSlide(); // S'assurer qu'il n'y a pas de conflit
    slideInterval = setInterval(nextSlide, 5000); // Change toutes les 5 secondes
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// === NAVBAR EFFECTS ===

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Effet de transparence basé sur le scroll
        if (currentScrollY > 100) {
            navbar.style.background = `linear-gradient(90deg, 
                rgba(26, 26, 26, 0.98) 0%, 
                rgba(45, 45, 45, 0.98) 50%, 
                rgba(26, 26, 26, 0.98) 100%)`;
        } else {
            navbar.style.background = `linear-gradient(90deg, 
                rgba(26, 26, 26, 0.95) 0%, 
                rgba(45, 45, 45, 0.95) 50%, 
                rgba(26, 26, 26, 0.95) 100%)`;
        }
        
        // Cacher/montrer navbar selon la direction du scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// === ANIMATIONS ET EFFETS ===

function initializeAnimations() {
    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animation en cascade pour les éléments de grille
                if (entry.target.classList.contains('model-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    document.querySelectorAll('.model-card, .tech-item, .main-article').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initializeScrollEffects() {
    // Parallax léger pour les sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.intro-section, .tech-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// === EFFETS INTERACTIFS ===

// Effet de particules sur les boutons CTA
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        createRippleEffect(e, this);
    });
});

function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// CSS pour l'animation ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// === SMOOTH SCROLLING ===

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Ajuster pour la navbar fixe
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === EFFETS DE BRILLANCE ===

// Effet de brillance sur les cartes modèles
document.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        createShineEffect(this);
    });
});

function createShineEffect(element) {
    const shine = document.createElement('div');
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 109, 0, 0.2), transparent);
        transition: left 0.8s ease;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(shine);
    
    // Déclencher l'animation
    setTimeout(() => {
        shine.style.left = '100%';
    }, 50);
    
    // Nettoyer après l'animation
    setTimeout(() => {
        shine.remove();
    }, 1000);
}

// === KEYBOARD NAVIGATION ===

// Navigation au clavier pour le slideshow
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'Escape') {
        stopAutoSlide();
    } else if (e.key === ' ') {
        e.preventDefault();
        if (slideInterval) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }
});

// === PERFORMANCE ET OPTIMISATION ===

// Throttle function pour optimiser les événements scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Appliquer throttle aux événements scroll
const throttledScrollHandler = throttle(() => {
    // Logique de scroll optimisée ici si nécessaire
}, 100);

// === DÉTECTION DE LA TAILLE D'ÉCRAN ===

function handleResponsiveFeatures() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Ajustements pour mobile
        stopAutoSlide();
        slideInterval = setInterval(nextSlide, 7000); // Plus lent sur mobile
    } else {
        // Réinitialiser pour desktop
        stopAutoSlide();
        startAutoSlide();
    }
}

// Écouter les changements de taille d'écran
window.addEventListener('resize', throttle(handleResponsiveFeatures, 250));

// === ACCESSIBILITY ===

// Améliorer l'accessibilité du slideshow
slides.forEach((slide, index) => {
    slide.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-label', `Slide ${index + 1} sur ${slides.length}`);
});

dots.forEach((dot, index) => {
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Aller à la slide ${index + 1}`);
    dot.setAttribute('tabindex', index === 0 ? '0' : '-1');
});

// === CHARGEMENT ET NETTOYAGE ===

// Nettoyage lors du déchargement de la page
window.addEventListener('beforeunload', () => {
    stopAutoSlide();
});

// Initialisation finale
console.log('🚗 Élite Électrique - Interface initialisée avec succès!');
