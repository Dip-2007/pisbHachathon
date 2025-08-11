const reels = document.querySelectorAll(".reel video");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
        entry.target.parentElement.classList.add("active");
      } else {
        entry.target.pause();
        entry.target.parentElement.classList.remove("active");
      }
    });
  },
  { threshold: 0.7 }
);

reels.forEach((video) => observer.observe(video));
