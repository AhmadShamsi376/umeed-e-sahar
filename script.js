const REPO = "AhmadShamsi376/umeed-e-sahar";
const BRANCH = "main";
const articleRoot = "content/articles";
const poetryRoot = "content/poetry";

function parseFrontmatter(md) {
  const match = md.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: md };
  const data = {};
  match[1].split("\n").forEach(line => {
    const m = line.match(/^([^:]+):\s*(.*)$/);
    if (!m) return;
    let value = m[2].trim();
    value = value.replace(/^["']|["']$/g, "");
    data[m[1].trim()] = value;
  });
  return { data, body: match[2] };
}

async function getFiles(path) {
  const url = `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("Could not load magazine content.");
  return r.json();
}

async function getMarkdown(file) {
  const r = await fetch(`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${file}`);
  if (!r.ok) throw new Error("Could not load article.");
  return r.text();
}

async function loadCollection(path) {
  const files = await getFiles(path);
  const mdFiles = files.filter(f => f.name.endsWith(".md"));
  const entries = [];
  for (const file of mdFiles) {
    try {
      const raw = await getMarkdown(file.path);
      const parsed = parseFrontmatter(raw);
      entries.push({ ...parsed.data, body: parsed.body, path: file.path, filename: file.name });
    } catch (e) {}
  }
  return entries.sort((a,b) => (b.date || "").localeCompare(a.date || ""));
}

function articleCard(item) {
  const params = new URLSearchParams({ file: item.path });
  const image = item.image ? `<img src="${item.image}" alt="">` : `<div class="card-art">اُمید</div>`;
  return `<article class="story-card">
    ${image}
    <div class="story-card-body">
      <div class="eyebrow">${escapeHtml(item.section || "گوشہ")}</div>
      <h3>${escapeHtml(item.title || "")}</h3>
      ${item.urdu_title ? `<div class="urdu-small">${escapeHtml(item.urdu_title)}</div>` : ""}
      <p>${escapeHtml(item.excerpt || stripMarkdown(item.body || "").slice(0, 150))}</p>
      <div class="meta">${escapeHtml(item.author || "Umeed-e-Sahar")} · ${escapeHtml(item.date || "")}</div>
      <a class="text-link" href="article.html?${params}">Read →</a>
    </div>
  </article>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function stripMarkdown(s) {
  return String(s).replace(/[#*_>`~\-]/g, " ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g," ").trim();
}

async function renderHome() {
  const mount = document.querySelector("[data-latest]");
  if (!mount) return;
  try {
    const [articles, poems] = await Promise.all([loadCollection(articleRoot), loadCollection(poetryRoot)]);
    mount.innerHTML = articles.slice(0, 6).map(articleCard).join("");
    const poemMount = document.querySelector("[data-poetry]");
    if (poemMount) poemMount.innerHTML = poems.slice(0, 3).map(articleCard).join("");
  } catch (e) {
    mount.innerHTML = `<p class="notice">The editorial archive is loading. Please refresh in a moment.</p>`;
  }
}

async function renderArchive() {
  const mount = document.querySelector("[data-archive]");
  if (!mount) return;
  try {
    const [articles, poems] = await Promise.all([loadCollection(articleRoot), loadCollection(poetryRoot)]);
    const filter = document.querySelector("[data-filter]");
    const draw = (items) => mount.innerHTML = items.map(articleCard).join("") || `<p class="notice">Nothing published here yet.</p>`;
    draw(articles);
    if (filter) filter.addEventListener("change", () => {
      const value = filter.value;
      draw(value === "All" ? articles : articles.filter(x => x.section === value));
    });
  } catch (e) {
    mount.innerHTML = `<p class="notice">Could not load the archive.</p>`;
  }
}

async function renderArticle() {
  const mount = document.querySelector("[data-article]");
  if (!mount) return;
  const file = new URLSearchParams(location.search).get("file");
  if (!file) { mount.innerHTML = "<p>Article not found.</p>"; return; }
  try {
    const raw = await getMarkdown(file);
    const parsed = parseFrontmatter(raw);
    const d = parsed.data;
    document.title = `${d.title || "Article"} — Umeed-e-Sahar`;
    mount.innerHTML = `
      <div class="eyebrow">${escapeHtml(d.section || "گوشہ")}</div>
      <h1>${escapeHtml(d.title || "")}</h1>
      ${d.urdu_title ? `<div class="article-urdu-title">${escapeHtml(d.urdu_title)}</div>` : ""}
      <div class="meta">${escapeHtml(d.author || "")} · ${escapeHtml(d.date || "")}</div>
      ${d.image ? `<img class="article-cover" src="${d.image}" alt="">` : ""}
      <div class="article-body">${marked.parse(parsed.body)}</div>
    `;
  } catch (e) {
    mount.innerHTML = `<p class="notice">This article could not be loaded.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderArchive();
  renderArticle();
});
