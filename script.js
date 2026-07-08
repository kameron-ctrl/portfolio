// ============================================================
// PROJECTS DATA
// TODO: Replace these with your real projects!
// Each project needs: title, description, tags, and optional links.
// Ask Copilot: "Add a project card for a [project type] called [name]"
// ============================================================
// Each project supports:
//   title            — shown over the screenshot (required)
//   description      — short line shown on the resting card
//   longDescription  — fuller story revealed in the hovercard
//   highlights       — optional bullet points shown in the hovercard
//   image            — path to a screenshot or GIF (e.g. "previews/foo.png").
//                      Leave as null to show a lettered gradient placeholder.
//   tags, github, demo — as before
const projects = [
  {
    title: "Project One",
    description: "A short description of what this project does and why you built it.",
    longDescription:
      "The fuller story: what problem it solved, what you built, and the outcome you're proud of.",
    highlights: ["What you shipped", "A technical detail worth bragging about"],
    image: null,
    tags: ["Python", "Flask"],
    github: "https://github.com/yourusername/project-one",
    demo: null,
  },
  {
    title: "Project Two",
    description: "Another project you're proud of. What problem did it solve?",
    longDescription:
      "Describe the interesting part — an architecture decision, a hard bug you beat, or the impact it had.",
    highlights: ["Real-time something", "React + a fun library"],
    image: null,
    tags: ["JavaScript", "React"],
    github: "https://github.com/yourusername/project-two",
    demo: "https://yourproject.netlify.app",
  },
  {
    title: "Project Three",
    description: "Keep it brief — one or two sentences is plenty.",
    longDescription:
      "A couple of sentences about the approach and what you learned building it.",
    highlights: ["Algorithm or data-structure highlight"],
    image: null,
    tags: ["Java", "Algorithms"],
    github: "https://github.com/yourusername/project-three",
    demo: null,
  },
];

// ============================================================
// SKILLS DATA
// TODO: Replace with your actual skills.
// Ask Copilot to help format this list based on your resume.
// ============================================================
const skills = [
  "Python", "JavaScript", "Java", "C",
  "HTML & CSS", "Git & GitHub",
  "React", "Node.js",
  "SQL", "Linux",
];

// ============================================================
// RENDER PROJECTS
// ============================================================
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project) => `
      <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="project-links">
          ${project.github ? `<a href="${project.github}" target="_blank">GitHub →</a>` : ""}
          ${project.demo ? `<a href="${project.demo}" target="_blank">Live Demo →</a>` : ""}
        </div>
      </div>
    `
    )
    .join("");
}

// ============================================================
// RENDER SKILLS
// ============================================================
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  container.innerHTML = skills
    .map((skill) => `<span class="skill-badge">${skill}</span>`)
    .join("");
}

// ============================================================
// DARK MODE TOGGLE
// TODO: Implement this! Here's a stub to get you started.
// Ask Copilot (inline chat on this function): "Implement dark mode
// toggle that saves preference to localStorage"
// ============================================================
const themeStorageKey = "theme";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const themeToggle = document.getElementById("dark-mode");
  if (themeToggle) {
    themeToggle.checked = theme === "dark";
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
}

function initTheme() {
  applyTheme(getPreferredTheme());
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  localStorage.setItem(themeStorageKey, nextTheme);
}

// ============================================================
// UPDATE FOOTER YEAR
// ============================================================
function updateYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  initTheme();
  updateYear();

  const themeToggle = document.getElementById("dark-mode");
  if (themeToggle) {
    themeToggle.addEventListener("change", toggleTheme);
  }

});
