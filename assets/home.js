/* ============================================================
   HOME PAGE INTERACTIVITY
   Content data lives in content-data.js; card/pagination rendering
   helpers live in content-render.js (both loaded before this file).
   ============================================================ */

/* Countries with published content, derived from CONTENT_ITEMS so the
   map highlight never drifts out of sync with the actual data. */
const COUNTRIES_WITH_CONTENT = new Set(CONTENT_ITEMS.filter((c) => c.country).map((c) => c.country.iso));

/* ---------- FILTER BAR (sorts the global content ribbon) ---------- */
function wireFilterBar() {
  const bar = document.getElementById("filterBar");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    bar.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    let items = getGlobalContent();
    if (filter === "most-viewed") items = sortByViews(items);
    else items = sortByNewest(items);
    renderCardGrid(document.getElementById("globalContentRibbon"), items);
  });
}

/* ---------- WORLD MAP (D3 + topojson, same approach as the portfolio site) ---------- */
function wireWorldMap() {
  const svg = d3.select("#map-svg");
  const tooltip = document.getElementById("mapTooltip");
  if (svg.empty() || !tooltip) return;

  const projection = d3.geoNaturalEarth1().scale(155).translate([480, 250]);
  const path = d3.geoPath(projection);

  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
    .then((res) => res.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries).features;
      svg
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("d", path)
        .attr("class", (d) => "land" + (COUNTRIES_WITH_CONTENT.has(+d.id) ? " has-content" : ""))
        .style("outline", "none")
        .on("mousemove", (event, d) => {
          tooltip.textContent = d.properties.name;
          tooltip.style.left = event.clientX + "px";
          tooltip.style.top = event.clientY + "px";
          tooltip.classList.add("is-visible");
        })
        .on("mouseleave", () => tooltip.classList.remove("is-visible"))
        .on("click", (event, d) => {
          window.location.href = "country.html?name=" + encodeURIComponent(d.properties.name) + "&iso=" + d.id;
        });
    })
    .catch(() => {
      document
        .querySelector(".map-layout")
        .insertAdjacentHTML(
          "beforeend",
          '<p style="font-size:13px;color:var(--ink-faint);margin-top:10px;">Map requires an internet connection to load.</p>'
        );
    });
}

/* ---------- SUBSCRIBE FORM (wired to Supabase) ---------- */
function wireSubscribeForm() {
  const form = document.getElementById("subscribeForm");
  const success = document.getElementById("subscribeSuccess");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const email = document.getElementById("subEmail").value.trim();
    const cvFile = document.getElementById("subCv").files[0];
    let cv_path = null;

    try {
      if (cvFile) {
        const safeName = `${Date.now()}-${cvFile.name}`.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const { error: uploadError } = await supabaseClient.storage
          .from("cvs")
          .upload(safeName, cvFile);
        if (uploadError) throw uploadError;
        cv_path = safeName;
      }

      const { error: insertError } = await supabaseClient
        .from("subscribers")
        .insert({ email, cv_path });
      if (insertError) throw insertError;

      success.classList.add("is-visible");
      form.reset();
    } catch (err) {
      alert("Something went wrong submitting the form: " + err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Subscribe";
    }
  });
}

/* ---------- CONTACT MODAL ---------- */
function wireContactModal() {
  const openBtn = document.getElementById("openContactModal");
  const closeBtn = document.getElementById("closeContactModal");
  const overlay = document.getElementById("contactModal");
  const form = document.getElementById("contactForm");
  const success = document.getElementById("contactSuccess");
  if (!openBtn || !overlay) return;

  const open = () => {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const visitorEmail = document.getElementById("contactEmail").value;
    const subject = encodeURIComponent("New message from Chronocept Revolutions site");
    const body = encodeURIComponent(`A visitor wants to get in touch.\n\nTheir email: ${visitorEmail}`);
    window.location.href = `mailto:chronoceptrevolutions@gmail.com?subject=${subject}&body=${body}`;
    success.classList.add("is-visible");
    form.reset();
  });
}

/* ---------- "About Athreya Kannan" link ----------
   No live portfolio URL provided yet — points at '#' until one is supplied. */
function wireAboutLink() {
  const link = document.getElementById("aboutFounderLink");
  if (!link) return;
  const PORTFOLIO_URL = null; // TODO: set the live portfolio URL once deployed
  if (PORTFOLIO_URL) {
    link.href = PORTFOLIO_URL;
  } else {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Portfolio link not set yet — add the live URL in assets/home.js (PORTFOLIO_URL).");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCardGrid(document.getElementById("globalContentRibbon"), sortByNewest(getGlobalContent()));
  syncYouTubeStats(CONTENT_ITEMS).then(() => {
    renderCardGrid(document.getElementById("globalContentRibbon"), sortByNewest(getGlobalContent()));
  });
  wireFilterBar();
  wireWorldMap();
  wireSubscribeForm();
  wireContactModal();
  wireAboutLink();
});
