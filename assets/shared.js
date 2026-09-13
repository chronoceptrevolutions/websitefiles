/* ============================================================
   SHARED NAV + FOOTER
   NAV_ITEMS.enabled controls the "coming soon" flag described in
   the spec. Learning / Opportunities / Profile stay built as
   routes but hidden from the public nav until switched on here.
   ============================================================ */
const NAV_ITEMS = [
  { label: "Home", href: "index.html", enabled: true },
  { label: "Content", href: "content.html", enabled: true },
  { label: "Submit a CR", href: "submit-a-cr.html", enabled: true },
  { label: "Learning", href: "learning.html", enabled: false },
  { label: "Opportunities", href: "opportunities.html", enabled: false },
  { label: "Profile", href: "profile.html", enabled: false },
];

function renderNav(activeHref) {
  const mount = document.getElementById("siteNav");
  if (!mount) return;
  const links = NAV_ITEMS.filter((i) => i.enabled)
    .map(
      (i) =>
        `<li><a href="${i.href}"${i.href === activeHref ? ' class="active"' : ""}>${i.label}</a></li>`
    )
    .join("");
  mount.innerHTML = `
    <nav class="navbar">
      <div class="wrap">
        <a href="index.html" class="nav-mark">
          <img src="assets/img/logo.png" alt="Chronocept Revolutions logo">
          Chronocept Revolutions
        </a>
        <ul class="nav-links" id="navLinks">${links}</ul>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false"><span></span></button>
      </div>
    </nav>
  `;
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function renderFooter() {
  const mount = document.getElementById("siteFooter");
  if (!mount) return;
  mount.innerHTML = `
    <footer>
      <div class="wrap">
        <a href="index.html" class="footer-brand">
          <img src="assets/img/logo.png" alt="Chronocept Revolutions logo">
          Chronocept Revolutions
        </a>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="content.html">Content</a>
          <a href="submit-a-cr.html">Submit a CR</a>
          <a href="privacy.html">Privacy</a>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span>&copy; 2026 Chronocept Revolutions.</span>
      </div>
    </footer>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const activeHref = document.body.dataset.page || "index.html";
  renderNav(activeHref);
  renderFooter();
});
