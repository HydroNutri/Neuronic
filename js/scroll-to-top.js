document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '&#8679;'; // Up arrow
  scrollToTopBtn.id = 'scrollToTopBtn';
  document.body.appendChild(scrollToTopBtn);

  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  };

  scrollToTopBtn.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
});
