// Navigation JavaScript

class Navigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navOverlay = document.getElementById('navOverlay');
        this.header = document.getElementById('header');
        this.navLinks = document.querySelectorAll('.nav-link a');
        this.closeBtn = document.querySelector('.nav-close-btn');

        this.isMenuOpen = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScrollEffect();
    }

    bindEvents() {
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.closeMenu();
            });
        }

        this.navOverlay.addEventListener('click', () => {
            this.closeMenu();
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (this.isMenuOpen) {
                this.closeMenu();
            }
        });

        window.addEventListener('scroll', () => {
            this.handleScrollEffect();
        });

        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isMenuOpen = true;
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        this.navOverlay.classList.add('active');

        document.body.style.overflow = 'hidden';

        this.hamburger.setAttribute('aria-label', '메뉴 닫기');
        this.hamburger.setAttribute('aria-expanded', 'true');

        setTimeout(() => {
            const firstLink = this.navMenu.querySelector('.nav-link a');
            if (firstLink) {
                firstLink.focus();
            }
        }, 300);
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.navOverlay.classList.remove('active');

        document.body.style.overflow = '';

        this.hamburger.setAttribute('aria-label', '메뉴 열기');
        this.hamburger.setAttribute('aria-expanded', 'false');
    }

    handleScrollEffect() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
