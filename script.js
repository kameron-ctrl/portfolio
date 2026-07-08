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
    title: "CubeCoach",
    description: "AI-powered Rubik's Cube learning platform with 3D visualization and adaptive coaching.",
    longDescription:
      "A full-stack platform that teaches you to solve the Rubik's Cube step by step. It pairs an interactive Three.js 3D cube with Claude-powered coaching that adapts to your skill level, plus SM-2 spaced-repetition drills across all 57 OLL and 21 PLL cases. Cube move logic is verified against the kociemba solver (200/200 end-to-end tests).",
    highlights: [
      "Interactive Three.js 3D cube with click-to-color input",
      "Claude-powered step-by-step coaching adapted to skill level",
      "SM-2 spaced repetition for every OLL & PLL algorithm",
    ],
    image: "previews/cubecoach-card.jpg",
    tags: ["Next.js", "TypeScript", "Three.js", "FastAPI", "Claude AI"],
    github: "https://github.com/kameron-ctrl/CubeCoach",
    demo: null,
  },
  {
    title: "Green Guardian",
    description: "AI-powered plant disease detection from a single leaf photo.",
    longDescription:
      "A full-stack web app that diagnoses plant diseases from leaf photographs using a custom-trained PyTorch (ResNet) model on the PlantVillage dataset. It classifies 15 conditions across tomato, potato, and bell pepper, returning real-time predictions with confidence scores and treatment recommendations. Deployed serverlessly on AWS Lambda + S3 + CloudFront with GitHub Actions CI/CD.",
    highlights: [
      "Custom ResNet classifier across 15 disease classes",
      "Confidence scoring plus treatment recommendations",
      "Serverless AWS deploy (Lambda, S3, CloudFront) with CI/CD",
    ],
    image: "previews/greenguardian.jpg",
    tags: ["Next.js", "TypeScript", "PyTorch", "FastAPI", "AWS"],
    github: "https://github.com/kameron-ctrl/GreenGuardian",
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
// Escape any text that ends up in markup so a stray < or & in your
// project data can't break the layout.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderProjectMedia(project) {
  if (project.image) {
    return `<img class="project-media-img" src="${escapeHtml(project.image)}"
              alt="Screenshot of ${escapeHtml(project.title)}" loading="lazy" />`;
  }

  // No screenshot yet — show a lettered gradient placeholder.
  const initial = escapeHtml(project.title.trim().charAt(0) || "•");
  return `<div class="project-media-placeholder" aria-hidden="true">${initial}</div>`;
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projects
    .map((project) => {
      const tags = project.tags
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join("");

      const highlights = (project.highlights || [])
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");

      const links = [
        project.github
          ? `<a href="${escapeHtml(project.github)}" target="_blank" rel="noopener">GitHub →</a>`
          : "",
        project.demo
          ? `<a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener">Live Demo →</a>`
          : "",
      ].join("");

      // tabindex="0" lets keyboard users focus the card to reveal the hovercard.
      return `
      <article class="project-card" tabindex="0" aria-label="${escapeHtml(project.title)}">
        <div class="project-media">
          ${renderProjectMedia(project)}
          <div class="project-media-scrim"></div>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
        </div>
        <div class="project-preview">
          <h3 class="project-preview-title">${escapeHtml(project.title)}</h3>
          <p class="project-preview-desc">${escapeHtml(
            project.longDescription || project.description
          )}</p>
          ${highlights ? `<ul class="project-highlights">${highlights}</ul>` : ""}
          <div class="project-tags">${tags}</div>
          ${links ? `<div class="project-links">${links}</div>` : ""}
        </div>
      </article>
    `;
    })
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
// NOW PLAYING WIDGET
// ============================================================
function updateMusicProfile(isDark) {
  const img = document.getElementById("music-profile");
  if (!img) return;

  const theme = isDark ? "dark" : "light";
  const uid = "000138.88831148bc504efebe1bed0b883cbd0b.2109";
  img.src = `https://music-profile.rayriffy.com/theme/${theme}.svg?uid=${uid}&t=${Date.now()}`;
}

function hideMusicProfileSection() {
  const section = document.getElementById("now-playing");
  if (section) {
    section.style.display = "none";
  }
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

  updateMusicProfile(theme === "dark");
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

  const musicProfile = document.getElementById("music-profile");
  if (musicProfile) {
    musicProfile.addEventListener("error", hideMusicProfileSection, { once: true });
  }

  const themeToggle = document.getElementById("dark-mode");
  if (themeToggle) {
    themeToggle.addEventListener("change", toggleTheme);
  }

});
