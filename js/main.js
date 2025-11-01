// Main JavaScript File

// 전역 변수
const App = {
    isLoaded: false,
    isMobile: false,
    scrollPosition: 0
};

// DOM 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// 페이지 로드 완료 시 실행
window.addEventListener('load', () => {
    App.onPageLoad();
});

// 메인 앱 객체
App.init = function() {
    console.log('🚀 Neuronic Website Initialized');

    // 기본 설정
    this.detectDevice();
    this.initPreloader();
    this.bindGlobalEvents();
};

// 페이지 로드 완료 후 실행
App.onPageLoad = function() {
    this.isLoaded = true;
    this.hidePreloader();
    console.log('✅ Page Loaded Successfully');
};

// 디바이스 감지
App.detectDevice = function() {
    this.isMobile = window.innerWidth <= 768;

    // CSS 변수로 디바이스 정보 전달
    document.documentElement.style.setProperty('--is-mobile', this.isMobile ? '1' : '0');

    // 바디 클래스 추가
    if (this.isMobile) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.add('desktop');
    }
};

// 전역 이벤트 바인딩
App.bindGlobalEvents = function() {
    // 리사이즈 이벤트
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            this.detectDevice();
            this.handleResize();
        }, 250);
    });

    // 스크롤 이벤트
    let scrollTimer;
    window.addEventListener('scroll', () => {
        this.scrollPosition = window.pageYOffset;

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            this.handleScroll();
        }, 10);
    });

    // 키보드 이벤트
    document.addEventListener('keydown', (e) => {
        this.handleKeyboard(e);
    });
};

// 리사이즈 핸들러
App.handleResize = function() {
    // 모바일 뷰포트 높이 문제 해결
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    console.log('📱 Window Resized:', window.innerWidth, 'x', window.innerHeight);
};

// 스크롤 핸들러
App.handleScroll = function() {
    // 스크롤 진행률 계산
    const scrollPercent = (this.scrollPosition / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-percent', `${scrollPercent}%`);

    // 페이지 상단 여부 체크
    if (this.scrollPosition > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
};

// 키보드 핸들러
App.handleKeyboard = function(e) {
    // 개발자 도구 단축키 (Ctrl+Shift+I)
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyI') {
        console.log('🔧 Developer Mode');
        document.body.classList.toggle('debug');
    }

    // 접근성: Tab 키 사용 시 포커스 표시
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
};

// 프리로더 초기화
App.initPreloader = function() {
    // 프리로더가 있다면 처리
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        console.log('⏳ Preloader Active');
    }
};

// 프리로더 숨기기
App.hidePreloader = function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
};

// 유틸리티 함수들
const Utils = {
    // 디바운스 함수
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // 스로틀 함수
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 요소가 뷰포트에 있는지 확인
    isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        return (
            rect.top <= windowHeight * (1 - threshold) &&
            rect.bottom >= windowHeight * threshold
        );
    },

    // 부드러운 스크롤
    smoothScrollTo(target, duration = 800, offset = 80) {
        const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = Utils.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    },

    // 이징 함수
    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    },

    // 랜덤 숫자 생성
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // 요소 페이드인 애니메이션
    fadeIn(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = 'block';

        const start = performance.now();

        function fade(timestamp) {
            const elapsed = timestamp - start;
            const progress = elapsed / duration;

            element.style.opacity = Math.min(progress, 1);

            if (progress < 1) {
                requestAnimationFrame(fade);
            }
        }

        requestAnimationFrame(fade);
    },

    // 요소 페이드아웃 애니메이션
    fadeOut(element, duration = 300) {
        const start = performance.now();
        const startOpacity = parseFloat(window.getComputedStyle(element).opacity);

        function fade(timestamp) {
            const elapsed = timestamp - start;
            const progress = elapsed / duration;

            element.style.opacity = startOpacity * (1 - progress);

            if (progress < 1) {
                requestAnimationFrame(fade);
            } else {
                element.style.display = 'none';
            }
        }

        requestAnimationFrame(fade);
    }
};

// 성능 모니터링
const Performance = {
    marks: {},

    // 성능 마크 시작
    mark(name) {
        this.marks[name] = performance.now();
    },

    // 성능 측정 및 로그
    measure(name, startMark) {
        const endTime = performance.now();
        const startTime = this.marks[startMark] || 0;
        const duration = endTime - startTime;

        console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
        return duration;
    }
};

// 에러 핸들링
window.addEventListener('error', (e) => {
    console.error('❌ JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Unhandled Promise Rejection:', e.reason);
});

// 페이지 가시성 API
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👁️ Page Hidden');
    } else {
        console.log('👁️ Page Visible');
    }
});

// 전역 객체 내보내기
window.App = App;
window.Utils = Utils;
window.Performance = Performance;

// 개발 모드 체크
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Development Mode Active');
    window.DEBUG = true;
}