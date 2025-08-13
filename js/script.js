/**
 * CASA JAZZ FESTIVAL - JAVASCRIPT
 * ================================
 * Gestion des interactions et animations du site
 */

// Attendre le chargement complet du DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎷 Casa Jazz Festival - Site initialisé');
    
    // Initialiser tous les modules
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFormHandling();
    initTicketSystem();
    initArtistCards();
    initSmoothScrolling();
    initBackToTop();
    initMobileMenu();
    initPerformanceOptimizations();
});

/**
 * NAVIGATION
 * ==========
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Effet de scroll sur la navbar
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ajouter/retirer la classe 'scrolled'
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Masquer/afficher la navbar lors du scroll (optionnel)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });

    // Navigation active
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavigation, { passive: true });
}

/**
 * MENU MOBILE
 * ===========
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle du menu mobile
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animation des barres du hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        
        // Prévenir le scroll du body quand le menu est ouvert
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Fermer le menu quand on clique à l'extérieur
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * EFFETS DE SCROLL
 * ================
 */
function initScrollEffects() {
    // Parallax pour le hero
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }, { passive: true });
    }
    
    // Animation de révélation au scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation différée pour les éléments multiples
                if (entry.target.classList.contains('stagger')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 150;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    const animatedElements = document.querySelectorAll(
        '.fade-in, .artist-card, .ticket-card, .day-card, .attraction-card, .feature, .stat-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * ANIMATIONS
 * ==========
 */
function initAnimations() {
    // Animation du logo principal
    const heroLogo = document.querySelector('.hero-logo-img');
    if (heroLogo) {
        heroLogo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        heroLogo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Animation des cartes au survol
    const cards = document.querySelectorAll('.artist-card, .ticket-card, .attraction-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animation des boutons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Effet de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
}

/**
 * SMOOTH SCROLLING
 * ================
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Ajouter une classe temporaire pour le highlight
                targetElement.classList.add('highlighted');
                setTimeout(() => {
                    targetElement.classList.remove('highlighted');
                }, 2000);
            }
        });
    });
}

/**
 * BOUTON RETOUR EN HAUT
 * =====================
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, { passive: true });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * SYSTÈME DE BILLETTERIE
 * =======================
 */
function initTicketSystem() {
    const ticketButtons = document.querySelectorAll('.btn-ticket');
    
    ticketButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ticketCard = this.closest('.ticket-card');
            const ticketName = ticketCard.querySelector('.ticket-name').textContent;
            const ticketPrice = ticketCard.querySelector('.ticket-price').textContent;
            
            // Animation de confirmation
            this.style.background = '#28a745';
            this.textContent = '✓ Ajouté au panier';
            
            setTimeout(() => {
                this.style.background = '';
                this.textContent = 'Réserver maintenant';
            }, 2000);
            
            // Simulation d'ajout au panier
            showNotification(`🎫 ${ticketName} (${ticketPrice}) ajouté au panier!`, 'success');
            
            // Dans un vrai projet, ici on ferait l'appel API
            console.log('Ticket sélectionné:', { name: ticketName, price: ticketPrice });
        });
    });
}



/**
 * GESTION DES FORMULAIRES
 * =======================
 */
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (validateForm(data)) {
                // Animation de chargement
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Envoi en cours...';
                submitButton.disabled = true;
                
                // Simulation d'envoi
                setTimeout(() => {
                    showNotification('✅ Message envoyé avec succès!', 'success');
                    this.reset();
                    
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
                
                console.log('Données du formulaire:', data);
            }
        });
    }
}

/**
 * VALIDATION DE FORMULAIRE
 * ========================
 */
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Veuillez saisir un email valide');
    }
    
    if (!data.subject) {
        errors.push('Veuillez sélectionner un sujet');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

/**
 * VALIDATION EMAIL
 * ===============
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * SYSTÈME DE NOTIFICATIONS
 * ========================
 */
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles inline pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Gestionnaire de fermeture
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/**
 * MODAL ARTISTE
 * =============
 */
function showArtistModal(artistName, artistGenre) {
    const modal = document.createElement('div');
    modal.className = 'artist-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${artistName}</h2>
                <p class="modal-genre">${artistGenre}</p>
                <p>Plus d'informations sur ${artistName} seront disponibles prochainement!</p>
                <div class="modal-actions">
                    <button class="btn btn-primary">Suivre l'artiste</button>
                    <button class="btn btn-secondary modal-close-btn">Fermer</button>
                </div>
            </div>
        </div>
    `;
    
    // Styles pour la modal
    const style = document.createElement('style');
    style.textContent = `
        .artist-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }
        .modal-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            text-align: center;
            position: relative;
        }
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }
        .modal-genre {
            color: var(--morocco-red);
            font-weight: 600;
            margin-bottom: 1rem;
        }
        .modal-actions {
            margin-top: 2rem;
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Prévenir le scroll
    document.body.style.overflow = 'hidden';
    
    // Gestionnaires de fermeture
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(modal, style);
        });
    });
    
    // Fermer en cliquant sur l'overlay
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal(modal, style);
        }
    });
    
    // Fermer avec Escape
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal(modal, style);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function closeModal(modal, style) {
    document.body.style.overflow = '';
    modal.remove();
    style.remove();
}

/**
 * OPTIMISATIONS DE PERFORMANCE
 * ============================
 */
function initPerformanceOptimizations() {
    // Lazy loading pour les images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Préchargement des ressources critiques
    preloadCriticalResources();
    
    // Optimisation des événements de scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Code à exécuter après l'arrêt du scroll
        }, 150);
    }, { passive: true });
}

/**
 * PRÉCHARGEMENT DES RESSOURCES
 * ============================
 */
function preloadCriticalResources() {
    const criticalImages = [
        'img/1.png', // Logo
        'img/2.png'  // Pattern
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

/**
 * GESTION DES ERREURS
 * ===================
 */
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // Dans un environnement de production, envoyer l'erreur à un service de monitoring
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejetée:', e.reason);
    // Gestion des promesses rejetées
});

/**
 * ANALYTICS ET TRACKING
 * =====================
 */
function trackEvent(eventName, eventData = {}) {
    // Dans un vrai projet, intégrer Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', eventName, eventData);
    
    // Exemple avec Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Tracker les clics sur les boutons importants
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent,
            page_section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

/**
 * SERVICE WORKER (optionnel)
 * ==========================
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker enregistré avec succès');
            })
            .catch(function(error) {
                console.log('Échec de l\'enregistrement du ServiceWorker');
            });
    });
}

/**
 * UTILITAIRES
 * ===========
 */

// Fonction de debounce pour optimiser les performances
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Fonction throttle pour limiter la fréquence d'exécution
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Detection du device
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Utilitaire pour formater les prix
function formatPrice(price, currency = 'DH') {
    return `${price.toLocaleString()} ${currency}`;
}

// Utilitaire pour formater les dates
function formatDate(date, locale = 'fr-FR') {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Export pour utilisation dans d'autres fichiers (si nécessaire)
window.CasaJazz = {
    showNotification,
    trackEvent,
    isMobile,
    isTablet,
    isDesktop,
    formatPrice,
    formatDate
};

console.log('🎷 Casa Jazz Festival - JavaScript chargé avec succès!');