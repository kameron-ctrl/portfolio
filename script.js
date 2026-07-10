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
// SKILLS DATA — a crate of records.
// Each record is a category: the sleeve is the album cover,
// the tracklist is the skills. `note` is optional liner-note
// flavor (where the skill shows up in real work).
// ============================================================
const skillRecords = [
  {
    side: "SIDE A",
    category: "Languages",
    title: "Mother Tongues",
    tracks: [
      { name: "Python", note: "heavy rotation" },
      { name: "JavaScript / TypeScript" },
      { name: "Java" },
      { name: "C++", note: "now teaching it" },
      { name: "SQL" },
      { name: "HTML & CSS" },
    ],
  },
  {
    side: "SIDE B",
    category: "Frontend",
    title: "Front of House",
    tracks: [
      { name: "React" },
      { name: "Next.js", note: "CubeCoach" },
      { name: "React Native / Expo", note: "Green Guardian" },
      { name: "Three.js", note: "CubeCoach" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    side: "SIDE C",
    category: "Backend & Cloud",
    title: "Boiler Room",
    tracks: [
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "Docker" },
      { name: "AWS", note: "Lambda · EC2 · CloudFront" },
      { name: "GitHub Actions", note: "CI/CD" },
    ],
  },
  {
    side: "SIDE D",
    category: "AI / ML",
    title: "Thinking Machines",
    tracks: [
      { name: "PyTorch", note: "Green Guardian" },
      { name: "Claude API", note: "CubeCoach" },
      { name: "LLM Pipelines", note: "Outamation" },
      { name: "Agentic AI" },
      { name: "Prompt Engineering" },
    ],
  },
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
// RENDER SKILLS — vinyl record crate carousel
// ============================================================
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  const records = skillRecords
    .map((record, index) => {
      const tracks = record.tracks
        .map(
          (track) => `
          <li class="sleeve-track">
            <span class="track-name">${escapeHtml(track.name)}</span>
            ${track.note ? `<span class="track-note">${escapeHtml(track.note)}</span>` : ""}
          </li>`
        )
        .join("");

      return `
      <figure class="record" data-index="${index}">
        <div class="record-vinyl" aria-hidden="true">
          <div class="vinyl-disc">
            <span class="vinyl-label">${escapeHtml(record.category)}</span>
          </div>
        </div>
        <div class="record-sleeve">
          <div class="sleeve-art">
            <span class="sleeve-side">${escapeHtml(record.side)}</span>
            <span class="sleeve-cat">${escapeHtml(record.category)}</span>
            <h3 class="sleeve-title">${escapeHtml(record.title)}</h3>
            <span class="sleeve-artist">Kameron Benjamin</span>
          </div>
          <ol class="sleeve-tracks">${tracks}</ol>
        </div>
      </figure>`;
    })
    .join("");

  const dots = skillRecords
    .map(
      (record, index) => `
      <button class="crate-dot" type="button" data-index="${index}"
        aria-label="Show ${escapeHtml(record.category)} record"></button>`
    )
    .join("");

  container.innerHTML = `
    <div class="record-crate" role="region" aria-roledescription="carousel"
         aria-label="Skills, presented as a crate of records">
      <button class="crate-arrow crate-prev" type="button" aria-label="Previous record">&#10094;</button>
      <div class="crate-stage" tabindex="0">${records}</div>
      <button class="crate-arrow crate-next" type="button" aria-label="Next record">&#10095;</button>
    </div>
    <div class="crate-dots">${dots}</div>`;

  initRecordCrate(container);
}

function initRecordCrate(container) {
  const recordEls = Array.from(container.querySelectorAll(".record"));
  const dotEls = Array.from(container.querySelectorAll(".crate-dot"));
  const stage = container.querySelector(".crate-stage");
  const total = recordEls.length;
  let active = 0;

  function update() {
    recordEls.forEach((el, i) => {
      // Wrap to the shortest signed distance so the crate feels circular.
      let offset = i - active;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const clamped = Math.max(-2, Math.min(2, offset));
      el.setAttribute("data-offset", String(clamped));
      el.classList.toggle("is-active", offset === 0);
      el.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
    });

    dotEls.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
  }

  function goTo(index) {
    active = (index + total) % total;
    update();
  }

  container.querySelector(".crate-prev").addEventListener("click", () => goTo(active - 1));
  container.querySelector(".crate-next").addEventListener("click", () => goTo(active + 1));
  dotEls.forEach((dot) =>
    dot.addEventListener("click", () => goTo(Number(dot.dataset.index)))
  );
  recordEls.forEach((el, i) =>
    el.addEventListener("click", () => {
      if (i !== active) goTo(i);
    })
  );

  stage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    }
  });

  const SWIPE_THRESHOLD = 40;
  let touchStartX = null;
  stage.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );
  stage.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      goTo(deltaX < 0 ? active + 1 : active - 1);
    }
    touchStartX = null;
  });

  update();
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
