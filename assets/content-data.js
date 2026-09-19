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
  586: { name: "Pakistan" },
  524: { name: "Nepal" },
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
    /* Optional: path to an HTML file with the full research write-up
       (converted from the Word doc), shown below the video on the
       content-detail page. e.g. "research/carbon-pricing-economies.html" */
    researchFile: o.researchFile || null,
    /* Optional: overrides the "Full Research" label above that section,
       e.g. "In Athreya's Words" for a non-report video like the intro. */
    researchLabel: o.researchLabel || "Full Research",
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
const CONTENT_ITEMS = [
  makeItem({
    id: "pakistan-debt-trap",
    title: "Pakistan Is Broke AGAIN. Here's the Real Reason",
    youtubeVideoId: "QxFlRJKc1gM",
    iso: 586,
    tags: ["Sovereign Debt", "IMF", "Economic Policy"],
    views: 0,
    date: "2026-08-20",
    issue:
      "Pakistan has asked the IMF for a bailout 24 times in 76 years, trapped by expensive Chinese debt, a decades-long conflict with India that drains money and trade, and militant violence spilling over from Afghanistan.",
    howOthersDoIt:
      "Indonesia and India both hit rock bottom and recovered. Indonesia cleaned up its banks, paid off its IMF debt early, and built a downstream nickel industry. India deregulated fast and built a software export industry from nearly zero.",
    solution:
      "Pakistan needs to broaden its tax base, normalize trade with India, diversify away from expensive Chinese debt, privatize loss-making state enterprises, and build an export industry that does not depend on aid.",
    researchFile: "research/pakistan-debt-trap.html",
  }),
  makeItem({
    id: "vip-culture-india",
    title: "VIP Culture in India: When Politicians Are Reminded Who's the Boss",
    youtubeVideoId: "t-wlelvAIYY",
    iso: 356,
    tags: ["Governance", "Civic Rights", "Public Policy"],
    views: 0,
    date: "2026-09-05",
    issue:
      "VIP convoys routinely block Indian roads, including for ambulances, even though the law only allows traffic to be stopped for the President, Vice President, and Prime Minister. A viral confrontation in Mumbai reignited the debate.",
    howOthersDoIt:
      "Australia held its prime minister publicly accountable for abandoning duty during a crisis, while Denmark, Sweden, and New Zealand treat holding office as a form of service rather than a privilege, with ministers cycling to work or riding public transport.",
    solution:
      "Stop treating politicians like celebrities, use RTI rights to demand transparency, hold media coverage accountable for its framing, ask real questions at public forums, and vote on performance instead of identity.",
    researchFile: "research/vip-culture-india.html",
  }),
  makeItem({
    id: "nepal-bhote-koshi-flood",
    title: "Nepal's $4.7 Billion Disaster: Where's the Aid?",
    youtubeVideoId: "gxBrlErj8e8",
    iso: 524,
    tags: ["Disaster Finance", "Climate Policy", "Public Finance"],
    views: 0,
    date: "2026-09-19",
    issue:
      "A glacier collapse above Rasuwa on August 26, 2026 sent a flood down the Bhote Koshi and Trishuli rivers, killing more than 1,300 people and leaving a $4.7 billion reconstruction bill against a $150 million pre-arranged financing facility.",
    howOthersDoIt:
      "The Philippines has kept its own World Bank Cat DDO facility at a stable $500 million for fourteen years, renewing and restructuring it on a standing schedule, while Bhutan physically lowered a dangerous glacial lake between 2008 and 2012 to prevent an outburst before it happened.",
    solution:
      "Put Nepal's Cat DDO on a redesign cycle instead of a one-off number, build a standing climate resilience office insulated from politics, rebuild hydropower away from the same flood-prone river corridors, and push the global Loss and Damage Fund to actually pay out pledges rather than let them sit.",
    researchFile: "research/nepal-bhote-koshi-flood.html",
  }),
  makeItem({
    id: "introduction",
    title: "Introduction to Chronocept Revolutions",
    youtubeVideoId: "f105nDe36EA",
    tags: ["About the Channel"],
    views: 0,
    date: "2026-08-01",
    researchFile: "research/introduction.html",
    researchLabel: "In Athreya's Words",
  }),
];

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
