// 아코디언 열기/닫기
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const toggle = question.querySelector('.faq-toggle');

        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            if (openItem !== item) {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-answer').style.maxHeight = null;
                openItem.querySelector('.faq-toggle').textContent = '▼';
            }
        });

        item.classList.toggle('open');
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            toggle.textContent = '▲';
        } else {
            answer.style.maxHeight = null;
            toggle.textContent = '▼';
        }
    });
});

// 카테고리 탭 필터
const tabs = document.querySelectorAll('.category-tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            const itemCategory = item.dataset.category;
            item.style.display = (category === 'all' || category === itemCategory) ? 'block' : 'none';
        });
    });
});

// 검색 필터링
const searchInput = document.getElementById('faqSearch');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
    });
});

// 스크롤 시 페이드인
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-scroll').forEach(el => observer.observe(el));
