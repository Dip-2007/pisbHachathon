document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle-btn");
  const currentTheme = localStorage.getItem("theme");

  // Apply the saved theme on page load
  if (currentTheme) {
    document.body.classList.add(currentTheme);
    // If dark mode is active, reflect it in the button text
    if (currentTheme === "dark-mode") {
      themeToggleButton.textContent = "☀️";
    }
  }

  themeToggleButton.addEventListener("click", () => {
    // Toggle the .dark-mode class on the body
    document.body.classList.toggle("dark-mode");

    // Update the button text and save the theme to localStorage
    let theme = "light-mode"; // Default to light
    if (document.body.classList.contains("dark-mode")) {
      theme = "dark-mode";
      themeToggleButton.textContent = "☀️";
    } else {///
      themeToggleButton.textContent = "🌙";
    }
    localStorage.setItem("theme", theme);
  });
});
