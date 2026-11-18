const LABELS = {
  es: {
    experience: "Experiencia profesional",
    projects: "Proyectos",
    education: "Educación",
    certificates: "Certificaciones",
    extra: "Skills adicionales",
    technologies: "Tecnologías",
    languages: "Idiomas",
    interests: "Intereses",
    present: "Actual",
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  },
  en: {
    experience: "Professional experience",
    projects: "Projects",
    education: "Education",
    certificates: "Certifications",
    extra: "Additional skills",
    technologies: "Technologies",
    languages: "Languages",
    interests: "Interests",
    present: "Present",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
};

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const bareUrl = (url = "") => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const link = (url, text) => (url ? `<a href="${esc(url)}">${esc(text)}</a>` : esc(text));

function formatDate(value, L) {
  if (!value) return "";
  const [year, month] = String(value).split("-");
  return month ? `${L.months[Number(month) - 1]} ${year}` : year;
}

// "Octubre 2024–Actual". endDate null/ausente con startDate => en curso.
function formatRange(start, end, L) {
  if (!start) return formatDate(end, L);
  return `${formatDate(start, L)}–${end ? formatDate(end, L) : L.present}`;
}

const bullets = (items = []) =>
  items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "";

const section = (title, body) => (body ? `<section><h2>${esc(title)}</h2>${body}</section>` : "");

function header(b) {
  const loc = b.location ? [b.location.city, b.location.region].filter(Boolean).join(", ") : "";
  const contact = [
    esc(loc),
    ...(b.profiles || []).map((p) => link(p.url, bareUrl(p.url) || p.username)),
    b.phone && link(`tel:${b.phone.replace(/\s/g, "")}`, b.phone),
    b.email && link(`mailto:${b.email}`, b.email),
    b.url && link(b.url, bareUrl(b.url)),
  ].filter(Boolean);
  return `<header>
    <h1>${esc(b.name)}</h1>
    ${b.label ? `<div class="label">${esc(b.label)}</div>` : ""}
    <div class="contact">${contact.join(" · ")}</div>
  </header>
  ${b.summary ? `<p class="summary">${esc(b.summary)}</p>` : ""}`;
}

const work = (items, L) =>
  items
    .map(
      (w) => `<div class="entry">
    <div class="row"><span class="org">${link(w.url, w.name)}</span><span>${esc(w.location || "")}</span></div>
    <div class="row"><span>${esc(w.position)}</span><span class="date">${formatRange(w.startDate, w.endDate, L)}</span></div>
    ${w.summary ? `<p class="desc">${esc(w.summary)}</p>` : ""}
    ${bullets(w.highlights)}
  </div>`
    )
    .join("");

const projects = (items, L) =>
  items
    .map(
      (p) => `<div class="entry">
    <div class="row"><span class="org">${link(p.url, p.name)}</span><span class="date">${formatRange(p.startDate, p.endDate, L)}</span></div>
    ${p.description ? `<p class="desc">${esc(p.description)}</p>` : ""}
    ${bullets(p.highlights)}
  </div>`
    )
    .join("");

const education = (items, L) =>
  items
    .map((e) => {
      const title = e.area || e.studyType;
      // Sin institución, el título del estudio pasa a la línea en negrita.
      const [main, sub] = e.institution ? [e.institution, title] : [title, ""];
      return `<div class="entry">
    <div class="row"><span class="org">${link(e.url, main)}</span><span>${esc(e.location || "")}</span></div>
    <div class="row"><span>${esc(sub)}</span><span class="date">${formatRange(e.startDate, e.endDate, L)}</span></div>
    ${e.summary ? `<p class="desc">${esc(e.summary)}</p>` : ""}
    ${bullets(e.highlights)}
  </div>`;
    })
    .join("");

const certificates = (items, L) =>
  items
    .map(
      (c) => `<div class="entry">
    <div class="row"><span><span class="org">${link(c.url, c.name)}</span>${c.issuer ? ` — ${esc(c.issuer)}` : ""}</span><span class="date">${formatDate(c.date, L)}</span></div>
  </div>`
    )
    .join("");

// Skills con keywords => una línea por categoría. Skills sin keywords (formato del portfolio) => agrupadas por
// "group" (por defecto "Tecnologías").
function extraSkills(data, L) {
  const lines = [];
  const loose = new Map();
  for (const s of data.skills || []) {
    if (s.keywords?.length) lines.push([s.name, s.keywords.join(s.separator || ", ")]);
    else {
      const group = s.group || L.technologies;
      loose.set(group, [...(loose.get(group) || []), s.name]);
    }
  }
  lines.unshift(...[...loose].map(([group, names]) => [group, names.join(", ")]));
  if (data.languages?.length)
    lines.push([L.languages, data.languages.map((l) => [l.language, l.fluency].filter(Boolean).join(" - ")).join(" / ")]);
  if (data.interests?.length)
    lines.push([L.interests, data.interests.map((i) => [i.name, ...(i.keywords || [])].join(", ")).join(" - ")]);
  if (!lines.length) return "";
  return `<div class="skills"><ul>${lines.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("")}</ul></div>`;
}

// meta.print controla la versión impresa: orden/visibilidad de secciones y recortes,
// sin tocar los datos que usa la web. Cada item admite además "print": false.
const DEFAULT_PRINT = { summary: true, sections: { work: true, projects: true, education: true, certificates: true, skills: true } };

// opts: { highlights: n (máx. viñetas), summary: false (oculta summary/description) }; item.printHighlights lo sobrescribe
const printable = (items = [], opts) =>
  items
    .filter((i) => i.print !== false)
    .map((i) => ({
      ...i,
      summary: opts.summary === false ? "" : i.summary,
      description: opts.summary === false ? "" : i.description,
      highlights: (i.printHighlights ?? opts.highlights) == null ? i.highlights : (i.highlights || []).slice(0, i.printHighlights ?? opts.highlights),
    }));

const SECTIONS = {
  work: (d, L, o) => section(L.experience, work(printable(d.work, o), L)),
  projects: (d, L, o) => section(L.projects, projects(printable(d.projects, o), L)),
  education: (d, L, o) => section(L.education, education(printable(d.education, o), L)),
  certificates: (d, L, o) => section(L.certificates, certificates(printable(d.certificates, o), L)),
  skills: (d, L) => section(L.extra, extraSkills({ ...d, skills: (d.skills || []).filter((s) => s.print !== false) }, L)),
};

// Página HTML imprimible del CV; la imprime PrintButton desde un iframe oculto.
export function render(data, lang = "es") {
  const L = { ...(LABELS[lang] || LABELS.es), ...data.meta?.labels };
  const print = { ...DEFAULT_PRINT, ...data.meta?.print };
  const pageSize = data.meta?.pageSize || "A4";
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${esc(data.basics.name)} - CV</title>
<link rel="stylesheet" href="/cv/styles.css">
<style>
  @page { size: ${esc(pageSize)}; }
  @media screen { body { max-width: 21cm; margin: 1.5cm auto; padding: 0 1cm; } }
</style>
</head>
<body>
  ${header(print.summary === false ? { ...data.basics, summary: "" } : data.basics)}
  ${Object.entries(print.sections)
    .filter(([, opts]) => opts !== false)
    .map(([name, opts]) => SECTIONS[name]?.(data, L, opts === true ? {} : opts) ?? "")
    .join("")}
</body>
</html>`;
}
