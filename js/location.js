// location.js - Scroll animation + Google Map init

// Scroll 등장 애니메이션
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in-scroll").forEach(el => observer.observe(el));

// Google Map API 로딩 후 실행될 콜백 함수
function initMap() {
    const office = { lat: 37.565803, lng: 126.938572 }; // 연세대학교 위치 (예시)
    const map = new google.maps.Map(document.getElementById("map"), {
        center: office,
        zoom: 15,
    });
    new google.maps.Marker({ position: office, map: map, title: "Neuronic" });
}

// 만약 API KEY가 설정되어 있고 자동 실행 안 될 경우 수동으로 콜백
if (typeof google !== "undefined" && google.maps) {
    initMap();
}