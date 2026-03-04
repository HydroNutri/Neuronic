// Scroll 애니메이션
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-scroll').forEach(el => observer.observe(el));

// Chart.js 그래프 초기화
const ctx = document.getElementById('investmentChart').getContext('2d');
const investmentChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['시드 투자', '정부지원금', '자체 자본', '파트너십'],
        datasets: [{
            label: '투자 비율',
            data: [40, 25, 20, 15],
            backgroundColor: ['#2c7a2c', '#3b82f6', '#f59e0b', '#8b5cf6'],
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#333',
                    font: { size: 14 }
                }
            }
        }
    }
});
