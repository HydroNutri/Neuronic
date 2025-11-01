// Technology Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initTechnologyPage();
});

function initTechnologyPage() {
    console.log('🔬 Technology Page Initialized');

    // 기술 페이지 전용 기능들 초기화
    initTechAnimations();
    initCodeHighlighting();
    initTechMetrics();
    initArchitectureDiagram();
    initSensorStatus();
    initRoadmapTimeline();
    initTechComparison();
    initPerformanceMonitoring();
}

// 기술 애니메이션 초기화
function initTechAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('tech-animate-in');

                // 특별한 애니메이션이 필요한 요소들
                if (entry.target.classList.contains('ai-feature')) {
                    animateAIFeature(entry.target);
                }
                if (entry.target.classList.contains('arch-layer')) {
                    animateArchLayer(entry.target);
                }
                if (entry.target.classList.contains('roadmap-item')) {
                    animateRoadmapItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // 애니메이션할 요소들 관찰
    const animateElements = document.querySelectorAll(
        '.ai-feature, .arch-layer, .tech-box, .sensor-item, .computing-item, .protocol-item, .platform-card, .roadmap-item'
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
        .tech-animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// AI 기능 애니메이션
function animateAIFeature(element) {
    if (element.classList.contains('featured')) {
        // YOLOv8 featured 카드 특별 애니메이션
        setTimeout(() => {
            element.style.background = 'linear-gradient(135deg, rgba(44, 122, 44, 0.15), rgba(59, 130, 246, 0.15))';
            element.style.transform = 'scale(1.02)';

            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 500);
        }, 300);
    }
}

// 아키텍처 레이어 애니메이션
function animateArchLayer(element) {
    const techBoxes = element.querySelectorAll('.tech-box');
    techBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.transform = 'scale(1.1)';
            box.style.background = 'rgba(44, 122, 44, 0.1)';

            setTimeout(() => {
                box.style.transform = 'scale(1)';
                box.style.background = '';
            }, 200);
        }, index * 100);
    });
}

// 로드맵 아이템 애니메이션
function animateRoadmapItem(element) {
    const techTags = element.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.transform = 'scale(1.1)';
            tag.style.opacity = '1';

            setTimeout(() => {
                tag.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// 코드 복사 기능
function copyCode(button) {
    const codeBlock = button.closest('.code-snippet').querySelector('code');
    const text = codeBlock.textContent;

    navigator.clipboard.writeText(text).then(() => {
        // 성공 피드백
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copied!';
        button.style.background = '#238636';

        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '#21262d';
        }, 2000);
    }).catch(err => {
        console.error('코드 복사 실패:', err);
        // 폴백: 텍스트 선택
        const range = document.createRange();
        range.selectNode(codeBlock);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    });
}

// 글로벌 함수로 등록
window.copyCode = copyCode;

// 기술 메트릭 애니메이션
function initTechMetrics() {
    const metricCards = document.querySelectorAll('.metric-card, .metric-card-large');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateMetricCard(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    metricCards.forEach(card => observer.observe(card));
}

function animateMetricCard(card) {
    const valueElement = card.querySelector('.metric-value');
    if (!valueElement) return;

    const originalText = valueElement.textContent;
    const hasPercent = originalText.includes('%');
    const hasMs = originalText.includes('ms');
    const hasK = originalText.includes('K');

    let finalNumber;
    let suffix = '';

    if (hasPercent) {
        finalNumber = parseFloat(originalText);
        suffix = '%';
    } else if (hasMs) {
        finalNumber = parseInt(originalText);
        suffix = 'ms';
    } else if (hasK) {
        finalNumber = parseInt(originalText.replace('K', ''));
        suffix = 'K+';
    } else {
        return; // 숫자가 아닌 경우 애니메이션 하지 않음
    }

    if (isNaN(finalNumber)) return;

    const duration = 2000;
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

        if (hasPercent || hasMs) {
            valueElement.textContent = Math.floor(currentNumber) + suffix;
        } else {
            valueElement.textContent = Math.floor(currentNumber) + suffix;
        }
    }, stepTime);
}

// 센서 상태 시뮬레이션
function initSensorStatus() {
    const sensorStatuses = document.querySelectorAll('.sensor-status');

    // 실시간 센서 상태 시뮬레이션
    setInterval(() => {
        sensorStatuses.forEach(status => {
            if (Math.random() > 0.95) { // 5% 확률로 상태 변경
                const isOnline = status.classList.contains('online');

                if (isOnline) {
                    status.classList.remove('online');
                    status.classList.add('warning');
                    status.textContent = 'WARNING';
                    status.style.background = 'rgba(245, 158, 11, 0.1)';
                    status.style.color = '#d97706';

                    // 3초 후 다시 온라인으로
                    setTimeout(() => {
                        status.classList.remove('warning');
                        status.classList.add('online');
                        status.textContent = 'ONLINE';
                        status.style.background = 'rgba(34, 197, 94, 0.1)';
                        status.style.color = '#16a34a';
                    }, 3000);
                }
            }
        });
    }, 5000);
}

// 아키텍처 다이어그램 인터랙션
function initArchitectureDiagram() {
    const archLayers = document.querySelectorAll('.arch-layer');

    archLayers.forEach(layer => {
        layer.addEventListener('mouseenter', () => {
            // 다른 레이어들 흐리게
            archLayers.forEach(otherLayer => {
                if (otherLayer !== layer) {
                    otherLayer.style.opacity = '0.5';
                }
            });

            // 현재 레이어 강조
            layer.style.transform = 'scale(1.02)';
            layer.style.zIndex = '10';
        });

        layer.addEventListener('mouseleave', () => {
            // 모든 레이어 원상복구
            archLayers.forEach(otherLayer => {
                otherLayer.style.opacity = '1';
                otherLayer.style.transform = 'scale(1)';
                otherLayer.style.zIndex = '';
            });
        });
    });
}

// 로드맵 타임라인 인터랙션
function initRoadmapTimeline() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');

    roadmapItems.forEach(item => {
        item.addEventListener('click', () => {
            // 모든 아이템 축소
            roadmapItems.forEach(otherItem => {
                otherItem.style.transform = 'scale(0.98)';
                otherItem.style.opacity = '0.7';
            });

            // 클릭된 아이템 확대
            item.style.transform = 'scale(1.05)';
            item.style.opacity = '1';
            item.style.zIndex = '10';

            // 2초 후 원상복구
            setTimeout(() => {
                roadmapItems.forEach(otherItem => {
                    otherItem.style.transform = '';
                    otherItem.style.opacity = '';
                    otherItem.style.zIndex = '';
                });
            }, 2000);
        });
    });
}

// 기술 비교 기능
function initTechComparison() {
    const techItems = document.querySelectorAll('.tech-box, .ui-tech-item, .tech-box-infra');

    techItems.forEach(item => {
        item.addEventListener('click', () => {
            const techName = item.querySelector('.tech-name')?.textContent ||
                item.textContent.trim();

            showTechDetail(techName, item);
        });
    });
}

function showTechDetail(techName, element) {
    // 기술별 상세 정보
    const techDetails = {
        'YOLOv8': {
            description: '최신 실시간 객체 탐지 모델',
            features: ['실시간 처리 (60fps)', '96.7% 정확도', '다중 클래스 분류', 'GPU 가속 지원'],
            useCase: '식물/어류 성장 모니터링, 질병 탐지, 수확 시기 판단'
        },
        'TensorFlow': {
            description: '구글의 오픈소스 머신러닝 프레임워크',
            features: ['분산 학습', '모바일 배포', '고성능 연산', '풍부한 생태계'],
            useCase: '예측 모델링, 딥러닝, 데이터 분석'
        },
        'React': {
            description: '페이스북의 사용자 인터페이스 라이브러리',
            features: ['컴포넌트 기반', '가상 DOM', '단방향 데이터 흐름', '풍부한 생태계'],
            useCase: '웹 대시보드, 실시간 모니터링 UI'
        },
        'Docker': {
            description: '컨테이너 기반 가상화 플랫폼',
            features: ['경량화', '이식성', '확장성', '버전 관리'],
            useCase: '애플리케이션 배포, 개발 환경 통합'
        }
        // 필요에 따라 더 추가 가능
    };

    const detail = techDetails[techName];
    if (!detail) return;

    // 상세 정보 모달 생성
    const modal = document.createElement('div');
    modal.className = 'tech-detail-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${techName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="tech-description">${detail.description}</p>
                <h4>주요 특징:</h4>
                <ul class="tech-features">
                    ${detail.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <h4>활용 분야:</h4>
                <p class="tech-usecase">${detail.useCase}</p>
            </div>
        </div>
    `;

    // 모달 스타일 추가
    if (!document.querySelector('#tech-modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'tech-modal-styles';
        modalStyles.textContent = `
            .tech-detail-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: modalFadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                animation: modalSlideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .modal-header h3 {
                color: var(--primary-green);
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: #f3f4f6;
                color: #374151;
            }
            
            .tech-description {
                font-size: 1.1rem;
                color: #4b5563;
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            
            .modal-body h4 {
                color: var(--primary-green);
                font-weight: 600;
                margin: 1.5rem 0 0.5rem 0;
            }
            
            .tech-features {
                list-style: none;
                padding: 0;
                margin-bottom: 1.5rem;
            }
            
            .tech-features li {
                padding: 0.5rem 0;
                padding-left: 1.5rem;
                position: relative;
                color: #6b7280;
            }
            
            .tech-features li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--primary-green);
                font-weight: bold;
            }
            
            .tech-usecase {
                color: #6b7280;
                line-height: 1.6;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes modalSlideIn {
                from { transform: translateY(-50px) scale(0.9); }
                to { transform: translateY(0) scale(1); }
            }
        `;
        document.head.appendChild(modalStyles);
    }

    document.body.appendChild(modal);

    // 모달 닫기 이벤트
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'modalFadeIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });

    // 배경 클릭으로 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });

    // ESC 키로 닫기
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeBtn.click();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// 성능 모니터링 시뮬레이션
function initPerformanceMonitoring() {
    const performanceElements = {
        latency: document.querySelector('.metric-card-large .metric-value'),
        throughput: document.querySelectorAll('.metric-card-large .metric-value')[1],
        aiSpeed: document.querySelectorAll('.metric-card-large .metric-value')[2],
        uptime: document.querySelectorAll('.metric-card-large .metric-value')[3]
    };

    // 실시간 성능 데이터 시뮬레이션
    setInterval(() => {
        updatePerformanceMetrics(performanceElements);
    }, 3000);
}

function updatePerformanceMetrics(elements) {
    // 지연시간 (45-55ms)
    if (elements.latency) {
        const latency = Math.floor(Math.random() * 10) + 45;
        elements.latency.textContent = `< ${latency}ms`;
    }

    // 처리량 (9K-12K)
    if (elements.throughput) {
        const throughput = Math.floor(Math.random() * 3) + 9;
        elements.throughput.textContent = `${throughput}K+`;
    }

    // AI 추론 속도 (14-18ms)
    if (elements.aiSpeed) {
        const aiSpeed = Math.floor(Math.random() * 4) + 14;
        elements.aiSpeed.textContent = `${aiSpeed}ms`;
    }

    // 가용성 (99.90-99.99%)
    if (elements.uptime) {
        const uptime = (99.90 + Math.random() * 0.09).toFixed(2);
        elements.uptime.textContent = `${uptime}%`;
    }
}

// 키보드 단축키
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl + T: 기술 스택 하이라이트
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            highlightTechStack();
        }

        // Ctrl + M: 메트릭 애니메이션 재실행
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            restartMetricAnimations();
        }

        // Ctrl + R: 로드맵 애니메이션
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            animateRoadmap();
        }
    });
}

function highlightTechStack() {
    const techItems = document.querySelectorAll('.tech-box, .ui-tech-item, .tech-box-infra');

    techItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1.1)';
            item.style.background = 'rgba(44, 122, 44, 0.2)';
            item.style.zIndex = '10';

            setTimeout(() => {
                item.style.transform = '';
                item.style.background = '';
                item.style.zIndex = '';
            }, 500);
        }, index * 50);
    });
}

function restartMetricAnimations() {
    const metricCards = document.querySelectorAll('.metric-card, .metric-card-large');

    metricCards.forEach(card => {
        card.classList.remove('animated');
        animateMetricCard(card);
        card.classList.add('animated');
    });
}

function animateRoadmap() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');

    roadmapItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(20px) scale(1.02)';
            item.style.boxShadow = '0 10px 30px rgba(44, 122, 44, 0.3)';

            setTimeout(() => {
                item.style.transform = '';
                item.style.boxShadow = '';
            }, 800);
        }, index * 200);
    });
}

// 스크롤 진행률 표시
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-green), var(--secondary-green));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
}

// 기술 검색 기능
function initTechSearch() {
    // 검색 입력 필드 생성
    const searchContainer = document.createElement('div');
    searchContainer.className = 'tech-search-container';
    searchContainer.innerHTML = `
        <input type="text" id="techSearch" placeholder="기술 검색... (예: YOLOv8, React)" />
        <div id="searchResults" class="search-results"></div>
    `;

    // 검색 스타일 추가
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .tech-search-container {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .tech-search-container.visible {
            opacity: 1;
        }
        
        #techSearch {
            padding: 10px 15px;
            border: 2px solid var(--primary-green);
            border-radius: 25px;
            font-size: 14px;
            width: 250px;
            outline: none;
        }
        
        .search-results {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-top: 5px;
            max-height: 200px;
            overflow-y: auto;
            display: none;
        }
        
        .search-result {
            padding: 10px 15px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .search-result:hover {
            background: var(--bg-light);
        }
    `;
    document.head.appendChild(searchStyles);

    // Ctrl + F로 검색창 토글
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const container = document.querySelector('.tech-search-container');
            if (container) {
                container.classList.toggle('visible');
                if (container.classList.contains('visible')) {
                    document.getElementById('techSearch').focus();
                }
            } else {
                document.body.appendChild(searchContainer);
                searchContainer.classList.add('visible');
                setupSearch();
                document.getElementById('techSearch').focus();
            }
        }
    });
}

function setupSearch() {
    const searchInput = document.getElementById('techSearch');
    const searchResults = document.getElementById('searchResults');

    // 모든 기술 요소 수집
    const allTechElements = Array.from(document.querySelectorAll('.tech-box, .ui-tech-item, .tech-box-infra')).map(el => ({
        name: el.querySelector('.tech-name')?.textContent || el.textContent.trim(),
        element: el
    }));

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = allTechElements.filter(tech =>
            tech.name.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            searchResults.innerHTML = matches.map(match =>
                `<div class="search-result" data-tech="${match.name}">${match.name}</div>`
            ).join('');
            searchResults.style.display = 'block';

            // 검색 결과 클릭 이벤트
            searchResults.querySelectorAll('.search-result').forEach(result => {
                result.addEventListener('click', () => {
                    const techName = result.dataset.tech;
                    const techElement = matches.find(m => m.name === techName)?.element;

                    if (techElement) {
                        techElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        techElement.style.transform = 'scale(1.1)';
                        techElement.style.background = 'rgba(44, 122, 44, 0.2)';

                        setTimeout(() => {
                            techElement.style.transform = '';
                            techElement.style.background = '';
                        }, 2000);
                    }

                    searchResults.style.display = 'none';
                    searchInput.value = '';
                });
            });
        } else {
            searchResults.style.display = 'none';
        }
    });
}

// 페이지 로드 완료 후 추가 초기화
window.addEventListener('load', () => {
    initKeyboardShortcuts();
    initScrollProgress();
    initTechSearch();

    console.log('✅ Technology Page Fully Loaded');

    // 개발자 콘솔 메시지
    console.log(`
%c🔬 Neuronic Technology Stack 🚀
%c
키보드 단축키:
• Ctrl + T: 기술 스택 하이라이트
• Ctrl + M: 메트릭 애니메이션 재실행  
• Ctrl + R: 로드맵 애니메이션
• Ctrl + F: 기술 검색

기술 요소를 클릭하면 상세 정보를 볼 수 있습니다!
`,
        'color: #2c7a2c; font-size: 18px; font-weight: bold;',
        'color: #666; font-size: 12px;'
    );
});

// 에러 핸들링
window.addEventListener('error', (e) => {
    console.error('Technology Page Error:', e.error);
});

// 성능 모니터링
const TechPerformance = {
    marks: {},

    mark(name) {
        this.marks[name] = performance.now();
    },

    measure(name, startMark) {
        const endTime = performance.now();
        const startTime = this.marks[startMark] || 0;
        const duration = endTime - startTime;

        console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
        return duration;
    }
};

// 모듈 내보내기 (필요시)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initTechnologyPage,
        animateMetricCard,
        showTechDetail,
        TechPerformance
    };
}