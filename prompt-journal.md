# Prompt Journal

Log your Copilot prompts here as you work. This is your record of the prompting process — not just what worked, but what didn't, and how you iterated.

**There are no wrong answers here.** The goal is to practice prompt writing and reflect on it honestly.

---

## How to fill this in

For each entry, note:

- **Where** you used Copilot (inline chat, Ask mode, Edit mode, Agent mode, inline completion)
- **What you asked** (copy/paste the prompt if you can)
- **What you got** (brief summary — did it work? was it close? way off?)
- **What you changed** (did you refine the prompt? edit the output manually?)

---

## Phase 1 — Setup & Orientation

### Entry 1

- **Feature/task:** Repo setup, first deploy, and hero title/tagline polish
- **Copilot feature used:** inline chat / Chat
- **Prompt:**
  > Update the page title and hero text so the portfolio feels like mine.
  > Help me write a short tagline for the hero that sounds like a real CS student portfolio.
- **Result:** The page identity was updated to YES YOU KAM, and the hero now has a stronger personal headline and subtitle.
- **What I changed or did next:** Pushed the change so GitHub Pages could redeploy, then kept refining the intro copy in the hero section.

---

## Phase 2 — Guided Tasks

### Entry 2 — About section

- **Copilot feature used:** agent mode / edit mode
- **Prompt:**
  > Write a short professional bio for a CS student interested in AI, full-stack development, and 3D visuals. Keep it warm and approachable, 2–3 sentences.
- **Result:** Copilot helped shape a real About section instead of placeholder copy, and the section now reads like an actual personal bio.
- **What I changed or did next:** I replaced the placeholder with my own background, added a real photo, and tuned the layout so it feels more personal.

---

### Entry 3 — Projects

- **Copilot feature used:** Copilot Chat
- **Prompt:**
  > Add a project entry for one of my real projects. Include a title, a 1-sentence description, and relevant tech tags.
- **Result:** The projects section is wired to render from script.js, so it can show real project cards instead of static placeholder markup.
- **What I changed or did next:** I used the starter data shape to plug in project cards and left the section ready for real repos, demos, and better descriptions.

---

### Entry 4 — Dark mode

- **Copilot feature used:** inline chat
- **Prompt:**
  > Implement this dark mode toggle. It should switch a data-theme='dark' attribute on the body and save the preference to localStorage so it persists on reload. (provided code to a toggle button i found online)
- **Result:** Dark mode is implemented with a switch in the nav, theme persistence in localStorage, and a theme check on load.
- **What I changed or did next:** I verified the toggle stayed in sync with the active theme and then used CSS custom properties to support both modes.

---

### Entry 5 — Responsive layout

- **Copilot feature used:** Copilot Chat / edit mode
- **Prompt:**
  > Improve the responsive styles in this CSS file for screens under 600px. The nav links should stack or hide, the hero text should be smaller, and the projects grid should be single-column.
- **Result:** The site already has the beginning of mobile-specific styling, and the layout is moving in the right direction for smaller screens.
- **What I changed or did next:** I kept tightening the responsive CSS and checked the page in a narrow viewport to catch anything that still overflowed.

---

## Phase 3 — Independent Feature

**Feature I chose:**

### Entry 6

- **Copilot feature used:**
- **Prompt:**
  >
- **Result:**
- **What I changed or did next:**

### Entry 7

- **Copilot feature used:**
- **Prompt:**
  >
- **Result:**
- **What I changed or did next:**

### Entry 8 — A prompt that didn't work well

- **Copilot feature used:**
- **What I asked:**
  >
- **What went wrong:**
- **How I fixed it (revised prompt or manual edit):**

---

## Reflection

**1. What feature are you most proud of?**

The dark mode toggle is the clearest finished feature because it feels useful, polished, and actually changes the way the site looks and behaves. The About section is a close second because it makes the site feel like a real portfolio instead of a template.

---

**2. Describe a time Copilot gave you something wrong or unhelpful. What did you do?**

At first, some of the generated copy and starter placeholders were too generic. I fixed that by rewriting the prompts with more context, then manually replacing anything that still sounded flat or vague.

---

**3. What did you learn about writing better prompts?**

Specific prompts worked better than broad ones. When I named the section, the tone, and the exact behavior I wanted, Copilot gave me something much closer to what I could actually use.

---

**4. What's one part of the codebase you now understand better than at the start?**

I understand the relationship between index.html, script.js, and style.css much better now, especially how the project cards and theme state are wired together.

**5. What would you build or improve next?**

I would finish the responsive nav, replace any remaining placeholder project data, and keep polishing the personal details so the site feels fully complete.
