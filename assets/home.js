/* ============================================================
   HOME PAGE INTERACTIVITY
   Content data lives in content-data.js; card/pagination rendering
   helpers live in content-render.js (both loaded before this file).
   ============================================================ */

const COUNTRIES_WITH_CONTENT = new Set(CONTENT_ITEMS.filter((c) => c.country).map((c) => c.country.iso));

const RIBBON_MAX = 6;

/* view = { type: "sort", sort: "newest" | "global" | "most-viewed" }
        | { type: "country", iso: number, name: string } */
let homeView = { type: "sort", sort: "global" };

function itemsForView(view) {
  if (view.type === "country") {
    return sortByNewest(CONTENT_ITEMS.filter((c) => c.country && c.country.iso === view.iso));
  }
  if (view.sort === "most-viewed") return sortByViews(CONTENT_ITEMS);
  if (view.sort === "global") return sortByNewest(CONTENT_ITEMS);
  return sortByNewest(CONTENT_ITEMS);
}

function renderHomeRibbon() {
  const mount = document.getElementById("homeContentRibbon");
  const emptyNote = document.getElementById("ribbonEmptyNote");
  if (!mount) return;
  const items = itemsForView(homeView).slice(0, RIBBON_MAX);
  renderCardGrid(mount, items);
  if (emptyNote) emptyNote.style.display = items.length ? "none" : "block";
}

/* ---------- FILTER BAR ---------- */
function wireFilterBar() {
  const bar = document.getElementById("filterBar");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    bar.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    homeView = { type: "sort", sort: btn.dataset.filter };
    renderHomeRibbon();
  });
}

/* ---------- WORLD MAP (D3 + topojson) ---------- */
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
          document.querySelectorAll("#filterBar .filter-pill").forEach((b) => b.classList.remove("active"));
          homeView = { type: "country", iso: +d.id, name: d.properties.name };
          renderHomeRibbon();
          document.getElementById("homeContentRibbon").scrollIntoView({ behavior: "smooth", block: "nearest" });
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

    /* honeypot check: real visitors never see or fill this field, so if
       it has a value, this is almost certainly a bot. Pretend it worked
       so the bot doesn't learn to try again differently. */
    const honeypot = document.getElementById("subWebsite");
    if (honeypot && honeypot.value.trim() !== "") {
      success.classList.add("is-visible");
      form.reset();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      const { error } = await supabaseClient.from("subscribers").insert({
        name: document.getElementById("subName").value.trim(),
        email: document.getElementById("subEmail").value.trim(),
        country: document.getElementById("subCountry").value.trim(),
        age_group: document.getElementById("subAge").value,
      });
      if (error) throw error;

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

document.addEventListener("DOMContentLoaded", () => {
  renderHomeRibbon();
  syncYouTubeStats(CONTENT_ITEMS).then(renderHomeRibbon);
  wireFilterBar();
  wireWorldMap();
  wireSubscribeForm();
});
