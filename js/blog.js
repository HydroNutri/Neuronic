// blog.js

const BLOG_HOME_URL = "https://neuronic.blog.example.com/feed.json"; // JSON 피드 주소 예시

// Scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in-scroll").forEach((el) => observer.observe(el));

// 블로그 글 로딩
async function fetchBlogPosts() {
    try {
        const res = await fetch(BLOG_HOME_URL);
        const posts = await res.json();

        const blogList = document.getElementById("blogList");
        blogList.innerHTML = "";

        posts.slice(0, 12).forEach(post => {
            const card = document.createElement("div");
            card.className = "blog-card";
            card.innerHTML = `
        <img class="blog-thumbnail" src="${post.image || '../assets/blog-default.jpg'}" alt="썸네일">
        <div class="blog-content">
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-meta">작성자: ${post.author || '관리자'}</p>
          <a href="${post.url}" class="blog-button" target="_blank">자세히 보기</a>
        </div>
      `;
            blogList.appendChild(card);
        });
    } catch (error) {
        console.error("블로그 데이터를 불러오는 중 오류 발생:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchBlogPosts);
