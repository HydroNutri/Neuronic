// Fade-in on scroll
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            contactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-scroll').forEach(el => {
    contactObserver.observe(el);
});

// Form validation + confirmation
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    // 실제 전송은 백엔드 필요
    alert('문의가 성공적으로 제출되었습니다! 감사합니다 :)');

    this.reset();
});
