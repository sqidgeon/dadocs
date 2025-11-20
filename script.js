// =============================================
// Theme Persistence & Toggle
// =============================================
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", savedTheme);

// Theme toggle button inside the nav
document.getElementById("main-theme-toggle")?.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent menu from closing

  const current = root.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// =============================================
// Top-Right Burger Menu
// =============================================
const burger = document.getElementById("main-burger");
const navItems = document.getElementById("nav-items");

burger.addEventListener("click", (e) => {
  e.stopPropagation();
  navItems.classList.toggle("open");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!burger.contains(e.target) && !navItems.contains(e.target)) {
    navItems.classList.remove("open");
  }
});

// Prevent closing when clicking inside the menu
navItems.addEventListener("click", (e) => {
  e.stopPropagation();
});

// =============================================
// Markdown Docs Loader
// =============================================
const sidebarLinks = document.querySelectorAll(".docs-sidebar a");
const docsContent = document.getElementById("docs-content");

async function loadDoc(file) {
  try {
    const res = await fetch(`./docs/${file}`);
    if (!res.ok) throw new Error();
    const markdown = await res.text();
    docsContent.innerHTML = marked.parse(markdown);

    // Syntax highlighting if you ever add it later
    document.querySelectorAll("pre code").forEach((block) => {
      hljs?.highlightElement(block);
    });
  } catch {
    docsContent.innerHTML = `<p style="color:var(--muted)">File not found: ${file}</p>`;
  }
}

// Sidebar click handling
sidebarLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    sidebarLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    loadDoc(link.dataset.doc);
  });
});

// Load the first doc on page load
loadDoc("intro.md");