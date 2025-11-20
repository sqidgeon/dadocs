// ===============================
// Burger Menu
// ===============================
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

menuBtn?.addEventListener("click", () => {
  menu.classList.add("open");
  overlay.classList.add("active");
});

closeBtn?.addEventListener("click", () => {
  menu.classList.remove("open");
  overlay.classList.remove("active");
});

overlay?.addEventListener("click", () => {
  menu.classList.remove("open");
  overlay.classList.remove("active");
});

// ===============================
// Theme Toggle
// ===============================
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

themeToggle?.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// ===============================
// Markdown Loader for Docs
// ===============================
const docLinks = document.querySelectorAll(".docs-sidebar a");
const docsContent = document.getElementById("docs-content");

async function loadMarkdown(file) {
  try {
    const response = await fetch(`./docs/${file}`);
    if (!response.ok) throw new Error("File not found");
    const markdown = await response.text();
    docsContent.innerHTML = marked.parse(markdown);
  } catch (error) {
    docsContent.innerHTML = `<p style="color:var(--muted)">⚠️ Unable to load ${file}</p>`;
  }
}

docLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    docLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    const file = link.getAttribute("data-doc");
    loadMarkdown(file);
    history.replaceState(null, "", link.getAttribute("href"));
  });
});

// Load default doc (intro.md)
loadMarkdown("intro.md");
