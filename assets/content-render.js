/* ============================================================
   SHARED CONTENT RENDERING (cards, pagination, related panel)
   Used by content.html, country.html, content-detail.html, index.html
   ============================================================ */

function playIconSvg() {
  return '<svg viewBox="0 0 24 24" fill="#243824"><path d="M8 5v14l11-7z"/></svg>';
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function formatViews(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k views" : n + " views";
}

/** Renders a grid (or ribbon) of content cards linking to content-detail.html */
function renderCardGrid(mountEl, items) {
  if (!mountEl) return;
  if (!items.length) {
    mountEl.innerHTML = '<p style="color:var(--ink-faint); font-size:14px;">Nothing here yet.</p>';
    return;
  }
  mountEl.innerHTML = items
    .map(
      (c) => `
    <a class="content-card" href="content-detail.html?id=${encodeURIComponent(c.id)}">
      <div class="content-thumb"${c.youtubeVideoId ? ` style="background-image:url('${youtubeThumbnailUrl(c.youtubeVideoId)}');background-size:cover;background-position:center;"` : ""}>
        <span class="content-tag">${c.country ? c.country.name : "Global"}</span>
        <div class="play">${playIconSvg()}</div>
      </div>
      <div class="content-body">
        <div class="content-title">${c.title}</div>
        <div class="content-meta"><span>${formatDate(c.publishedAt)}</span><span>&middot;</span><span>${formatViews(c.views)}</span></div>
      </div>
    </a>
  `
    )
    .join("");
}

/** Renders numbered pagination controls into mountEl; calls onChange(page) on click. */
function renderPagination(mountEl, totalItems, page, perPage, onChange) {
  if (!mountEl) return;
  const pageCount = Math.max(1, Math.ceil(totalItems / perPage));
  if (pageCount <= 1) {
    mountEl.innerHTML = "";
    return;
  }
  let html = '<div class="pagination">';
  for (let p = 1; p <= pageCount; p++) {
    html += `<button class="page-btn${p === page ? " active" : ""}" data-page="${p}">${p}</button>`;
  }
  html += "</div>";
  mountEl.innerHTML = html;
  mountEl.querySelectorAll(".page-btn").forEach((btn) => {
    btn.addEventListener("click", () => onChange(Number(btn.dataset.page)));
  });
}
