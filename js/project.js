// Project Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initProjectPage();
});

function initProjectPage() {
    console.log('🚀 Project Page Initialized');

    // 페이지 전용 기능들 초기화
    initScrollAnimations();
    initCounterAnimations();
    initDiagramAnimations();
    initTechStackHover();
    initScrollIndicator();
}

// 스크롤 애니메이션 초기화
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 애니메이션할 요소들 관찰
    const animateElements = document.querySelectorAll(
        '.component-card, .feature-item, .tech-category, .goal-phase, .highlight-item'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });

    // CSS 클래스 추가
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// 카운터 애니메이션
function initCounterAnimations() {
    const stats = document.querySelectorAll('.stat-number, .metric-value');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasX = text.includes('x');
    const hasDays = text.includes('일');
    const has247 = text.includes('/');

    let finalNumber;
    let suffix = '';

    if (hasPercent) {
        finalNumber = parseInt(text);
        suffix = '%';
    } else if (hasX) {
        finalNumber = parseInt(text);
        suffix = 'x';
    } else if (hasDays) {
        finalNumber = parseInt(text);
        suffix = '일';
    } else if (has247) {
        element.textContent = '24/7';
        return; // 24/7은 애니메이션 하지 않음
    } else {
        finalNumber = parseInt(text) || 0;
    }

    if (isNaN(finalNumber)) return;

    const duration = 2000; // 2초
    const steps = 60;
    const stepValue = finalNumber / steps;
    const stepTime = duration / steps;

    let currentNumber = 0;

    const timer = setInterval(() => {
        currentNumber += stepValue;

        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }

        element.textContent = Math.floor(currentNumber) + suffix;
    }, stepTime);
}

// 시스템 다이어그램 애니메이션
function initDiagramAnimations() {
    const diagram = document.querySelector('.diagram-content');
    if (!diagram) return;

    const layers = diagram.querySelectorAll('.diagram-layer');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateDiagramLayers(layers);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(diagram);
}

function animateDiagramLayers(layers) {
    layers.forEach((layer, index) => {
        setTimeout(() => {
            layer.style.transform = 'scale(1.05)';
            layer.style.background = 'rgba(44, 122, 44, 0.1)';

            setTimeout(() => {
                layer.style.transform = 'scale(1)';
                layer.style.background = '';
            }, 300);
        }, index * 200);
    });
}

// 기술 스택 호버 효과
function initTechStackHover() {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // 같은 카테고리의 다른 아이템들 흐리게
            const category = item.closest('.tech-category');
            const siblings = category.querySelectorAll('.tech-item');

            siblings.forEach(sibling => {
                if (sibling !== item) {
                    sibling.style.opacity = '0.5';
                }
            });

            // 현재 아이템 강조
            item.style.transform = 'translateX(10px) scale(1.05)';
            item.style.background = 'rgba(44, 122, 44, 0.1)';
        });

        item.addEventListener('mouseleave', () => {
            const category = item.closest('.tech-category');
            const siblings = category.querySelectorAll('.tech-item');

            siblings.forEach(sibling => {
                sibling.style.opacity = '1';
                sibling.style.transform = '';
                sibling.style.background = '';
            });
        });
    });
}

// 스크롤 인디케이터
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('.project-overview');
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // 스크롤 시 숨기기
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// 컴포넌트 카드 3D 효과
function init3DCardEffect() {
    const cards = document.querySelectorAll('.component-card, .feature-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// 진행 상태 애니메이션
function initProgressAnimations() {
    const phaseStatuses = document.querySelectorAll('.phase-status');

    phaseStatuses.forEach(status => {
        if (status.classList.contains('current')) {
            // 현재 진행 중인 항목에 펄스 효과
            status.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });

    // CSS 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { 
                box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 0 10px 5px rgba(34, 197, 94, 0.2);
                transform: scale(1.05);
            }
            100% { 
                box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// 기술 태그 클릭 이벤트
function initTechTagInteractions() {
    const techTags = document.querySelectorAll('.tech-tag');

    techTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // 클릭 효과
            tag.style.transform = 'scale(0.95)';
            tag.style.background = 'var(--primary-green)';
            tag.style.color = 'white';

            setTimeout(() => {
                tag.style.transform = '';
                tag.style.background = '';
                tag.style.color = '';
            }, 200);

            // 관련 정보 표시 (예: 툴팁 또는 모달)
            showTechInfo(tag.textContent);
        });
    });
}

function showTechInfo(techName) {
    // 기술 정보 객체
    const techInfo = {
        'TensorFlow': '구글이 개발한 오픈소스 머신러닝 프레임워크로, 딥러닝 모델 개발에 사용됩니다.',
        'PyTorch': '페이스북이 개발한 딥러닝 프레임워크로, 연구와 프로덕션에 모두 사용됩니다.',
        'Python': '데이터 과학과 AI 개발에 가장 널리 사용되는 프로그래밍 언어입니다.',
        'YOLOv8': '🚀 최신 실시간 객체 탐지 모델로, 식물과 어류의 성장을 정확하게 모니터링하고 최적의 수확/채집 시기를 자동 판단합니다.',
        'OpenCV': '컴퓨터 비전 라이브러리로, 이미지 처리와 영상 분석에 사용됩니다.',
        'Computer Vision': '컴퓨터가 이미지와 비디오를 이해하고 분석할 수 있게 하는 AI 기술입니다.',
        'Object Detection': '이미지나 비디오에서 특정 객체를 찾아내고 위치를 파악하는 기술입니다.',
        'Raspberry Pi': '소형 단일 보드 컴퓨터로, IoT 프로젝트에 널리 사용됩니다.',
        'Arduino': '오픈소스 마이크로컨트롤러 플랫폼으로, 센서와 액추에이터 제어에 사용됩니다.',
        'MQTT': '경량 메시징 프로토콜로, IoT 디바이스 간 통신에 최적화되어 있습니다.'
    };

    const info = techInfo[techName];
    if (info) {
        // 간단한 툴팁 표시
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = info;
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-dark);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            max-width: 300px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: fadeInScale 0.3s ease;
        `;

        document.body.appendChild(tooltip);

        // 3초 후 제거
        setTimeout(() => {
            tooltip.style.animation = 'fadeOutScale 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(tooltip);
            }, 300);
        }, 3000);

        // 애니메이션 CSS 추가
        if (!document.querySelector('#tooltip-animations')) {
            const style = document.createElement('style');
            style.id = 'tooltip-animations';
            style.textContent = `
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                @keyframes fadeOutScale {
                    from {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// 성능 최적화를 위한 디바운스 함수
function debounce(func, wait) {
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

// 스크롤 성능 최적화
function optimizeScrollPerformance() {
    const scrollElements = document.querySelectorAll('[data-scroll]');

    const handleScroll = debounce(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        scrollElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;

            if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
                element.classList.add('in-viewport');
            }
        });
    }, 10);

    window.addEventListener('scroll', handleScroll);
}

// 페이지 로드 완료 후 추가 초기화
window.addEventListener('load', () => {
    init3DCardEffect();
    initProgressAnimations();
    initTechTagInteractions();
    optimizeScrollPerformance();

    console.log('✅ Project Page Fully Loaded');
});

// 이스터 에그: 개발자 콘솔 메시지
console.log(`
%c🌱 Jiwell Farm Project Page 🤖
%cWhere Living Systems meet Thinking Systems

개발자님, 안녕하세요! 
저희 프로젝트에 관심을 가져주셔서 감사합니다.

기술 스택을 클릭해보세요! 숨겨진 정보가 있어요 😉
`,
    'color: #2c7a2c; font-size: 20px; font-weight: bold;',
    'color: #666; font-size: 14px;'
);

// 에러 핸들링
window.addEventListener('error', (e) => {
    console.error('Project Page Error:', e.error);
});

// 모듈 내보내기 (필요시)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initProjectPage,
        animateCounter,
        showTechInfo
    };
}