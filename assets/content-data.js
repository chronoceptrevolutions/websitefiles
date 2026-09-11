/* ============================================================
   CONTENT DATA (placeholder — replace with real ContentItem
   records once Supabase + the YouTube Data API are connected)

   Shape mirrors the spec's ContentItem schema:
   id, title, youtube_video_id, issue / how_others_do_it / solution,
   country (nullable = global), tags[], view_count, published_at,
   contributor (nullable)
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

const CONTENT_ITEMS = [
  makeItem({
  id: "carbon-pricing-economies",
  title: "Introduction",
  youtubeVideoId: "f1O5nDe36EA",
  tags: ["Climate Policy", "Public Finance"],
  views: 4200,
  date: "2026-07-18",
  issue: "Many governments adopt carbon taxes or cap-and-trade schemes expecting a uniform...",
  howOthersDoIt: "Sweden's carbon tax, in place since 1991 and now over $130/tonne, works becaus...",
  solution: "Pair any carbon price with a visible, near-term substitute for the taxed behav...",
}),
  makeItem({
    id: "fuel-subsidy-trap",
    title: "The subsidy trap: how fuel subsidies quietly bankrupt budgets",
    tags: ["Subsidies", "Public Finance", "Energy Policy"],
    views: 6100,
    date: "2026-07-05",
    issue:
      "Fuel subsidies are politically popular because removing them is visible and immediate, while their fiscal cost is diffuse and compounding — several countries now spend more on fuel subsidies than on health or education.",
    howOthersDoIt:
      "Indonesia cut most of its fuel subsidies in 2015 by first building a targeted cash-transfer system for lower-income households, so the removal didn't read as abandoning the poor.",
    solution:
      "Build the targeted replacement — cash transfers or means-tested vouchers — before touching the subsidy, and phase removal over a fixed public timeline rather than a single shock cut.",
  }),
  makeItem({
    id: "sovereign-debt-101",
    title: "Sovereign debt 101: what a default really means for citizens",
    tags: ["Sovereign Debt", "Public Finance"],
    views: 8900,
    date: "2026-06-10",
    issue:
      "Debt defaults are usually reported as a headline number, but the citizen-level consequences — currency devaluation, frozen public salaries, cuts to imported goods — are rarely explained until they're already happening.",
    howOthersDoIt:
      "Sri Lanka's 2022 default led to an IMF program built around debt restructuring plus targeted social spending floors, which softened, though didn't eliminate, the impact on the poorest households.",
    solution:
      "Track debt-to-GDP and debt service as a share of government revenue, not just headline borrowing, to spot a country nearing distress well before a default is announced.",
  }),
  makeItem({
    id: "circular-economy-small-budget",
    title: "Circular economy incentives that don't need a big budget",
    tags: ["Circular Economy"],
    views: 2400,
    date: "2026-05-28",
    issue:
      "Circular economy policy is often assumed to require large capital programs, which puts it out of reach for smaller municipal or national budgets.",
    howOthersDoIt:
      "Rwanda's plastic bag ban, enforced since 2008 on a minimal budget, worked primarily through consistent low-cost enforcement and reputational incentives for retailers rather than subsidy.",
    solution:
      "Start with low-cost regulatory nudges — bans, deposit-return schemes, procurement rules — before committing capital to recycling infrastructure. Sequencing determines whether the infrastructure gets used.",
  }),
  makeItem({
    id: "microfinance-what-scaled",
    title: "Microfinance, 30 years on: what actually scaled",
    tags: ["Public Finance", "Labor Markets"],
    views: 3050,
    date: "2026-06-22",
    issue:
      "Microfinance was pitched in the 1990s as a near-universal poverty solution. Three decades on, results are wildly uneven, and it's rarely explained which conditions made it work versus which made it just another debt trap.",
    howOthersDoIt:
      "Bangladesh's Grameen model succeeded where it paired lending with group accountability and mandatory savings; markets that copied the loan product without the accountability structure saw far higher default and over-indebtedness.",
    solution:
      "Evaluate any microfinance program on whether it builds in savings and peer accountability, not just credit access — the lending product alone is not the mechanism that worked.",
  }),
  makeItem({
    id: "us-municipal-green-bonds",
    iso: 840,
    title: "Why US cities are turning to green municipal bonds",
    tags: ["Public Finance", "Renewable Energy"],
    views: 5200,
    date: "2026-07-10",
    issue:
      "US municipalities need to finance climate-resilient infrastructure — grid hardening, stormwater systems, transit electrification — but general obligation bonds compete with every other budget priority for the same tax-exempt capacity.",
    howOthersDoIt:
      "Cities that issue dedicated green bonds, verified against a third-party framework, have tapped a distinct pool of ESG-mandated investors willing to accept marginally lower yields for certified climate use-of-proceeds.",
    solution:
      "Separate climate infrastructure into its own certified green bond series rather than folding it into general obligation debt — it accesses cheaper capital and keeps the spending auditable against its stated purpose.",
  }),
  makeItem({
    id: "us-water-utility-financing",
    iso: 840,
    title: "The financing gap keeping small US water utilities from upgrading",
    tags: ["Water & Sanitation", "Public Finance"],
    views: 1800,
    date: "2026-06-15",
    issue:
      "Most of the US's aging water infrastructure sits under small, rural utilities that are too small to efficiently issue bonds and too underfunded to self-finance replacement of century-old pipe networks.",
    howOthersDoIt:
      "State revolving fund programs that pool small utilities together for joint bond issuance — similar to structures used in parts of the EU — cut borrowing costs enough to make replacement projects pencil out.",
    solution:
      "Small utilities should default to pooled or state-backed financing vehicles rather than attempting individual bond issuance, which rarely clears a viable interest rate at their scale.",
  }),
  makeItem({
    id: "us-clean-energy-tax-credits",
    iso: 840,
    title: "How US clean energy tax credits actually get claimed",
    tags: ["Tax Policy", "Renewable Energy"],
    views: 3400,
    date: "2026-05-02",
    issue:
      "Clean energy tax credits are frequently structured as a nonrefundable credit against tax liability, which developers without sufficient tax appetite can't use directly — a fact rarely explained alongside the headline incentive numbers.",
    howOthersDoIt:
      "The market response has been a \"tax equity\" industry where investors with tax liability buy into projects specifically to use the credit, a structure that adds transaction cost but unlocks otherwise stranded incentives.",
    solution:
      "Understand transferability rules before assuming a tax credit is usable — where credits can now be sold directly (as under recent US rules), smaller developers can skip the tax equity middle layer entirely.",
  }),
  makeItem({
    id: "india-rooftop-solar-adoption",
    iso: 356,
    title: "What's slowing rooftop solar adoption in India's cities",
    tags: ["Renewable Energy", "Housing"],
    views: 4700,
    date: "2026-07-01",
    issue:
      "India's rooftop solar targets have consistently missed projections, even as utility-scale solar costs have fallen sharply — the barrier is largely at the level of net-metering approval and building-level financing, not panel cost.",
    howOthersDoIt:
      "Markets with faster rooftop uptake standardized net-metering approval into a fixed-timeline process handled by the utility, removing the multi-agency sign-off that discourages individual homeowners.",
    solution:
      "Prioritize streamlining the net-metering approval process to a fixed short timeline before adding new subsidy layers — approval friction, not cost, is the binding constraint in most under-performing markets.",
  }),
  makeItem({
    id: "india-msme-credit-access",
    iso: 356,
    title: "Why India's small businesses still struggle to access credit",
    tags: ["Public Finance", "Labor Markets"],
    views: 2900,
    date: "2026-04-18",
    issue:
      "MSMEs employ a large share of India's workforce but remain chronically underserved by formal credit, largely because they lack the collateral and documented cash-flow history banks require.",
    howOthersDoIt:
      "Cash-flow-based lending models, using digital transaction history rather than collateral, have expanded credit access to informal businesses in several markets without materially raising default rates.",
    solution:
      "Expand digital transaction-history-based underwriting rather than relaxing collateral requirements outright — it extends credit to genuinely creditworthy informal businesses while keeping lender risk assessment intact.",
  }),
  makeItem({
    id: "south-africa-just-energy-transition",
    iso: 710,
    title: "Inside South Africa's Just Energy Transition Partnership",
    tags: ["Energy Policy", "Climate Policy"],
    views: 3600,
    date: "2026-06-28",
    issue:
      "South Africa's coal-dependent power system and coal-mining regions face a transition that, if handled purely as an emissions problem, risks leaving entire towns without an economic base.",
    howOthersDoIt:
      "Germany's earlier coal phase-out paired plant closures with region-specific reinvestment funds and retraining pipelines negotiated years ahead of each closure date, not after.",
    solution:
      "Sequence any coal retirement plan around region-specific reinvestment and retraining commitments agreed before the closure date is set, not as a reactive measure once jobs are already lost.",
  }),
  makeItem({
    id: "brazil-amazon-carbon-credits",
    iso: 76,
    title: "Can carbon credits actually protect the Amazon?",
    tags: ["Climate Policy", "Circular Economy"],
    views: 5100,
    date: "2026-07-14",
    issue:
      "Voluntary carbon markets have funneled money toward Amazon forest-protection credits, but weak verification standards have let credits get sold for forest that was never actually at risk of being cut.",
    howOthersDoIt:
      "Newer verification frameworks that require a dynamic, satellite-monitored deforestation baseline — rather than a fixed historical one — have meaningfully cut the rate of over-crediting in comparable programs.",
    solution:
      "Treat carbon-credit quality as inseparable from its verification methodology — favor credits tied to dynamic, remotely monitored baselines over static historical ones.",
  }),
  makeItem({
    id: "germany-energiewende-lessons",
    iso: 276,
    title: "What the Energiewende teaches about pacing an energy transition",
    tags: ["Energy Policy", "Climate Policy"],
    views: 4400,
    date: "2026-06-05",
    issue:
      "Germany's Energiewende is often cited as a model, but its early years saw a sharp rise in consumer electricity prices, largely because renewable subsidy costs were passed directly onto household bills faster than the grid could absorb the new capacity.",
    howOthersDoIt:
      "Later adjustments shifted a larger share of subsidy cost onto general taxation and introduced competitive auctions for new renewable capacity, which slowed the price run-up considerably.",
    solution:
      "Spread the cost of a renewable buildout across general taxation rather than loading it entirely onto electricity bills, and use competitive auctions to keep new-capacity costs disciplined.",
  }),
  makeItem({
    id: "kenya-mobile-money-financial-inclusion",
    iso: 404,
    title: "How mobile money rewired financial inclusion in Kenya",
    tags: ["Public Finance", "Labor Markets"],
    views: 7200,
    date: "2026-03-22",
    issue:
      "Much of Kenya's population was excluded from formal banking due to branch access and minimum balance requirements, leaving remittances and savings dependent on cash and informal networks.",
    howOthersDoIt:
      "M-Pesa succeeded by piggybacking on existing mobile phone penetration and a network of local agents, rather than requiring new bank branch infrastructure — the distribution layer already existed.",
    solution:
      "Build financial inclusion on top of existing high-penetration infrastructure (mobile networks, local retail agents) instead of new branch-based banking rollouts, which are slower and far more capital-intensive.",
  }),
];

/* ---------- Extra placeholder United States items, generated to
   demonstrate country-page pagination (10 items/page). Titles are
   generic until real submissions replace them. ---------- */
const US_FILLER_TOPICS = [
  { title: "Property tax appeals and who actually wins them", tags: ["Tax Policy"] },
  { title: "The real cost of parking minimums in US zoning", tags: ["Housing"] },
  { title: "Why transit agencies struggle to price fares fairly", tags: ["Public Finance"] },
  { title: "State-level industrial policy after the CHIPS Act", tags: ["Energy Policy"] },
  { title: "How US flood insurance mispriced climate risk for decades", tags: ["Climate Policy"] },
  { title: "The municipal pension math nobody wants to explain", tags: ["Public Finance"] },
  { title: "Why broadband subsidies didn't close the rural gap", tags: ["Public Finance"] },
  { title: "What US carbon capture tax credits actually fund", tags: ["Tax Policy", "Climate Policy"] },
];
US_FILLER_TOPICS.forEach((t, i) => {
  CONTENT_ITEMS.push(
    makeItem({
      id: "us-filler-" + i,
      iso: 840,
      title: t.title,
      tags: t.tags,
      views: 900 + i * 240,
      date: "2026-0" + (1 + (i % 4)) + "-" + (10 + i) + "",
      issue: "Placeholder issue summary — replace once this topic is written up in full.",
      howOthersDoIt: "Placeholder comparison — replace once this topic is written up in full.",
      solution: "Placeholder solution — replace once this topic is written up in full.",
    })
  );
});

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
