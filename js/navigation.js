// Navigation JavaScript

class Navigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navMenuContent = null; // 스크롤 컨테이너
        this.navOverlay = document.getElementById('navOverlay');
        this.header = document.getElementById('header');
        this.navLinks = document.querySelectorAll('.nav-link a');

        this.isMenuOpen = false;

        this.init();
    }

    init() {
        // 스크롤 컨테이너 찾기
        this.navMenuContent = this.navMenu.querySelector('.nav-menu-content');

        this.bindEvents();
        this.handleScrollEffect();
        this.initMenuScroll();
    }

    bindEvents() {
        // 햄버거 버튼 클릭
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // 오버레이 클릭
        this.navOverlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // 네비게이션 링크 클릭
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // ESC 키로 메뉴 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // 윈도우 리사이즈 시 메뉴 닫기
        window.addEventListener('resize', () => {
            if (this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // 스크롤 이벤트
        window.addEventListener('scroll', () => {
            this.handleScrollEffect();
        });

        // 페이지 클릭 시 메뉴 닫기
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

        // 바디 스크롤 방지
        document.body.style.overflow = 'hidden';

        // 접근성을 위한 aria 설정
        this.hamburger.setAttribute('aria-label', '메뉴 닫기');
        this.hamburger.setAttribute('aria-expanded', 'true');

        // 첫 번째 링크에 포커스
        setTimeout(() => {
            const firstLink = this.navMenu.querySelector('.nav-link a');
            if (firstLink) {
                firstLink.focus();
            }
            // 스크롤을 맨 위로 리셋
            if (this.navMenuContent) {
                this.navMenuContent.scrollTop = 0;
            }
        }, 300);
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.navOverlay.classList.remove('active');

        // 바디 스크롤 복원
        document.body.style.overflow = '';

        // 접근성을 위한 aria 설정
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

    // 네비게이션 메뉴 스크롤 기능 초기화
    initMenuScroll() {
        if (!this.navMenuContent) return;

        // 마우스 휠 이벤트 추가
        this.navMenuContent.addEventListener('wheel', (e) => {
            // 기본 스크롤 동작 허용 (세로 스크롤)
            // 가로 스크롤만 방지
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
            }
        });

        // 터치 스크롤 지원 (모바일)
        let touchStartY = 0;
        let touchEndY = 0;

        this.navMenuContent.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        });

        this.navMenuContent.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            this.handleTouchSwipe(touchStartY, touchEndY);
        });

        // 키보드 네비게이션 (화살표 키로 스크롤)
        this.navMenuContent.addEventListener('keydown', (e) => {
            const scrollStep = 50;

            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.navMenuContent.scrollTop -= scrollStep;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.navMenuContent.scrollTop += scrollStep;
                    break;
                case 'Home':
                    e.preventDefault();
                    this.navMenuContent.scrollTop = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    this.navMenuContent.scrollTop = this.navMenuContent.scrollHeight;
                    break;
            }
        });

        // 스크롤 인디케이터 (선택사항)
        this.addScrollIndicator();
    }

    // 터치 스와이프 처리
    handleTouchSwipe(startY, endY) {
        const swipeThreshold = 50;
        const diff = startY - endY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 위로 스와이프 (아래로 스크롤)
                this.smoothScrollMenu(this.navMenuContent.scrollTop + 100);
            } else {
                // 아래로 스와이프 (위로 스크롤)
                this.smoothScrollMenu(this.navMenuContent.scrollTop - 100);
            }
        }
    }

    // 부드러운 메뉴 스크롤
    smoothScrollMenu(targetScrollTop) {
        const startScrollTop = this.navMenuContent.scrollTop;
        const distance = targetScrollTop - startScrollTop;
        const duration = 300;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // 이징 함수 적용
            const easedProgress = this.easeInOutQuart(progress);
            this.navMenuContent.scrollTop = startScrollTop + (distance * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    // 이징 함수
    easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }

    // 스크롤 인디케이터 추가
    addScrollIndicator() {
        // 스크롤 인디케이터가 이미 있는지 확인
        if (this.navMenu.querySelector('.nav-scroll-indicator')) return;

        const indicator = document.createElement('div');
        indicator.className = 'nav-scroll-indicator';
        indicator.innerHTML = `
            <div class="scroll-track">
                <div class="scroll-thumb"></div>
            </div>
        `;

        this.navMenu.appendChild(indicator);

        const thumb = indicator.querySelector('.scroll-thumb');

        // 스크롤 이벤트 리스너
        this.navMenuContent.addEventListener('scroll', () => {
            const scrollPercent = (this.navMenuContent.scrollTop /
                (this.navMenuContent.scrollHeight - this.navMenuContent.clientHeight)) * 100;

            thumb.style.transform = `translateY(${scrollPercent}%)`;

            // 스크롤 가능 여부에 따라 인디케이터 표시/숨김
            if (this.navMenuContent.scrollHeight > this.navMenuContent.clientHeight) {
                indicator.style.opacity = '1';
            } else {
                indicator.style.opacity = '0';
            }
        });

        // 초기 상태 설정
        setTimeout(() => {
            this.navMenuContent.dispatchEvent(new Event('scroll'));
        }, 100);
    }
}

// 페이지 로드 시 네비게이션 초기화
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

// 추가 유틸리티 함수들

// 부드러운 스크롤 함수
function smoothScrollTo(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 80; // 헤더 높이 고려
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // 이징 함수 (easeInOutQuart)
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    requestAnimationFrame(animation);
}

// 현재 페이지에 맞는 네비게이션 하이라이트
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link a');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath) {
            link.classList.add('active');
            link.style.background = 'rgba(44, 122, 44, 0.1)';
            link.style.color = 'var(--primary-green)';
        }
    });
}

// 페이지 로드 완료 후 실행
window.addEventListener('load', () => {
    highlightCurrentPage();
});

// 네비게이션 관련 CSS 클래스 토글 헬퍼
const NavigationUtils = {
    // 메뉴 상태 확인
    isMenuOpen() {
        return document.querySelector('.nav-menu').classList.contains('active');
    },

    // 헤더 숨기기/보이기
    hideHeader() {
        document.getElementById('header').style.transform = 'translateY(-100%)';
    },

    showHeader() {
        document.getElementById('header').style.transform = 'translateY(0)';
    },

    // 스크롤 방향에 따른 헤더 제어
    initScrollDirection() {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // 아래로 스크롤
                this.hideHeader();
            } else {
                // 위로 스크롤
                this.showHeader();
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
};

// 내보내기 (모듈로 사용할 경우)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Navigation, NavigationUtils, smoothScrollTo };
}