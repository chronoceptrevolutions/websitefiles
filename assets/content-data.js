/* ============================================================
   CONTENT DATA
   Add one makeItem({...}) entry per published video. Shape:
   id, title, youtubeVideoId, issue / howOthersDoIt / solution,
   iso (country, omit for global content), tags[], views, date,
   contributor (optional)
   ============================================================ */

const COUNTRY_META = {
  840: { name: "United States" },
  356: { name: "India" },
  710: { name: "South Africa" },
  76: { name: "Brazil" },
  276: { name: "Germany" },
  404: { name: "Kenya" },
};

function makeItem(o) {
  return {
    id: o.id,
    title: o.title,
    youtubeVideoId: o.youtubeVideoId || null,
    country: o.iso ? { iso: o.iso, name: COUNTRY_META[o.iso].name } : null,
    tags: o.tags,
    views: o.views,
    publishedAt: o.date,
    issue: o.issue,
    howOthersDoIt: o.howOthersDoIt,
    solution: o.solution,
    contributor: o.contributor || null,
  };
}

/* Add real videos here as they're published, e.g.:
   makeItem({
     id: "carbon-pricing-economies",
     title: "Why carbon pricing works differently in every economy",
     youtubeVideoId: "VIDEO_ID_HERE",
     iso: 752,
     tags: ["Climate Policy", "Public Finance"],
     views: 0,
     date: "2026-09-12",
     issue: "...",
     howOthersDoIt: "...",
     solution: "...",
   }),
*/
const CONTENT_ITEMS = [];

/* ---------- Query helpers ---------- */
function getContentById(id) {
  return CONTENT_ITEMS.find((c) => c.id === id) || null;
}
function getGlobalContent() {
  return CONTENT_ITEMS.filter((c) => !c.country);
}
function getContentByIso(iso) {
  return CONTENT_ITEMS.filter((c) => c.country && c.country.iso === +iso);
}
function sortByNewest(items) {
  return [...items].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}
function sortByViews(items) {
  return [...items].sort((a, b) => b.views - a.views);
}
function getRelatedContent(item, limit = 4) {
  return CONTENT_ITEMS.filter((c) => c.id !== item.id && c.tags.some((t) => item.tags.includes(t)))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}
