# Chronocept Revolutions — Website Build Specification
*A comprehensive prompt for Claude Code, prepared from founder input*
Prepared for: Athreya Kannan | Draft v1 | July 24, 2026

---

## Cover Note — Read This First

This document has two parts. **Part A** is a short note summarizing decisions locked in, defaults applied where the brief was silent, and a checklist of resources to attach before starting. **Part B** is the actual build specification, written as an instruction set for Claude Code.

### Decisions locked in

- Technical foundation: fully custom-coded web application (not WordPress), with a simple built-in admin dashboard so the founder can self-edit content without touching code.
- CV collection and the Submit-a-CR contributor agreement will use a real e-signature integration (DocuSign or HelloSign).
- Visual direction: beige + blue, styled after the founder's portfolio site's layout and typographic restraint, with the accent color swapped from green to blue.
- Home page includes a "Contact the Founder" section: founder photo, an "About Athreya Kannan" button linking to the external portfolio, and a separate lightweight "Contact" button that captures only an email address for manual follow-up.

### Defaults applied where the brief didn't specify

*(Flagged inline throughout Part B as `> **ASSUMPTION/DEFAULT:**`)*

- Exact color hex codes and font names — placeholders proposed in Part B, to be reconciled once portfolio HTML/CSS is attached.
- Interactive map library — open-source (`react-simple-maps` or equivalent), not a paid mapping API.
- Related-content suggestions — simple shared-tag matching, not machine learning.
- Email/update delivery — a standard transactional provider (Resend/SendGrid) plus optional marketing broadcast tool (e.g. Mailchimp).
- Analytics and a cookie/consent notice — included by default given the site collects emails and CVs.
- Database and hosting — Postgres via Supabase, app hosted on Vercel.

---

## ✅ RESOURCES TO ATTACH TO THIS FILE BEFORE STARTING CLAUDE CODE

Attach these directly alongside this spec (drop files into the project folder, or paste text/keys when Claude Code asks). Grouped by what each one unlocks — items marked **[BLOCKING]** will stop visible progress on that part of the build if missing; the rest let Claude Code proceed with the documented placeholder/default until you provide the real thing.

### 1. Design assets
- [ ] **[BLOCKING — visual layer]** Portfolio HTML/CSS/asset files (as referenced throughout this spec)
- [ ] **[BLOCKING — brand color]** Chronocept Revolutions logo file — vector preferred (SVG/AI/EPS) so the exact blue can be extracted
- [ ] Favicon / social preview image, if you have one
- [ ] Any other existing brand guideline (font names, exact hex codes) if one exists, even informally

### 2. Accounts & API credentials
*(Claude Code can walk you through creating any of these live — but the resulting keys need to end up in this project.)*
- [ ] **[BLOCKING — video]** YouTube Data API key + your channel ID
- [ ] Supabase project URL + API key (or say "help me create one" and do it live with Claude Code)
- [ ] Vercel account access (or create live)
- [ ] **[BLOCKING — Submit-a-CR flow]** DocuSign or HelloSign developer account + API key
- [ ] Email provider account (Resend or SendGrid) + API key
- [ ] Domain registrar access, or confirmation the domain is already purchased and its registrar

### 3. Seed content
*(Site can technically launch empty, but a few real examples let you sanity-check the content model early.)*
- [ ] 3–5 real video links with their companion blog write-ups, each broken into **Issue / How Others Do It / Solution** — ideally covering a few different countries plus one "global" piece
- [ ] Founder bio copy for the Contact-the-Founder section (photo already provided: `Headshot_2.jpg`)
- [ ] Draft "About / Mission" copy for the home page intro, if you want your own words rather than AI-drafted placeholder copy

### 4. Legal / business inputs
- [ ] **[BLOCKING — Submit-a-CR legal text]** Actual contract text for the content-rights transfer agreement (or explicitly tell Claude Code to draft a clearly-marked placeholder pending lawyer review)
- [ ] A rough monthly budget ceiling for paid tools, so Claude Code doesn't default to the priciest plan at each choice point (DocuSign/HelloSign tier, Supabase/Vercel scaling tier)

### 5. Open decisions
*(Resolve any you can before starting — each one avoids a mid-build interruption.)*
- [ ] Confirm domain name / registration status
- [ ] Confirm the "Contact" button stays email-only capture (not a full subject/body message form)
- [ ] Confirm you're comfortable with the recommended stack's ongoing costs (DocuSign/HelloSign + Supabase/Vercel paid tiers at real traffic)

---

# Part B — Build Specification (Prompt for Claude Code)

Everything below is written to be executed directly. It is deliberately explicit and imperative so the build stays faithful to intent rather than filling gaps with generic defaults of its own.

## 1. Project Overview

Build a website called **Chronocept Revolutions ("CR")** — a companion platform to an existing YouTube channel of the same name. CR spreads free, practical ideas about economics, finance, and sustainability that communities and countries can apply locally, and grows a community of people working toward a more sustainable future.

**Goals, in priority order:**
1. *Immediate:* build a community around sustainable-future content.
2. *Immediate:* make economic, financial, and sustainability knowledge freely accessible, with shareable certificates tied to future topic-specific courses.
3. *Long-term:* connect the community to real project work for governments, private clients, and NGOs.

**Content model philosophy:** every piece of content (video + companion blog) follows a fixed three-part structure so complex ideas stay coherent and comparable across countries:
- **The Issue** — what a country/economy is doing, evaluated non-politically.
- **How Others Do It** — a comparison to another country's approach and why it works there.
- **The Solution** — the concrete recommendation and how it could be applied.

> **ASSUMPTION/DEFAULT:** Build the CMS content model around these three fields as first-class, required fields on every content item — not free-text blog bodies. This keeps future automation (e.g. auto-generating comparison views across countries) possible.

## 2. Brand & Design System

### 2.1 Palette
Primary reference: the founder's existing portfolio site (beige background, restrained typography, a single accent color used sparingly). Swap the accent from green to blue.

| Token | Placeholder value | Usage |
|---|---|---|
| Background / Beige | `#EFE9DE` (placeholder) | Page backgrounds, cards |
| Accent / Blue | `#1F3B57` (placeholder) | Headings, links, buttons, map hover state |
| Text / Charcoal | `#2B2B2B` (placeholder) | Body copy |
| Muted / Grey | `#6B6B6B` (placeholder) | Captions, metadata, timestamps |

> **ASSUMPTION/DEFAULT:** These hex values are provisional, inferred from a portfolio screenshot. Replace with exact values the moment the portfolio's CSS is attached. Do not treat these as final brand colors.

### 2.2 Typography
Match the portfolio's pairing: a classic serif for large display names/headings, a clean slightly technical-feeling sans-serif or monospace for labels/metadata, and a standard sans-serif for body copy.

> **ASSUMPTION/DEFAULT:** Exact font families are not yet specified. Use a serif such as Georgia/Playfair Display for display headings and a sans-serif such as Inter for body/UI text as a placeholder system, reconciled once portfolio assets arrive.

### 2.3 Logo
Use the provided Chronocept Revolutions logo asset. Extract its blue as the canonical accent color once supplied, and treat that extraction as the source of truth over the placeholder hex above.

### 2.4 Layout principles
- Fixed/sticky top navigation bar — remains visible on scroll (no sidebar navigation, unlike Climatebase-style job boards).
- Generous whitespace, minimal ornamentation, content-forward — consistent with the portfolio's restrained style.
- Fully responsive: desktop, tablet, mobile, with the sticky nav collapsing to a mobile menu below a defined breakpoint.

## 3. Technical Architecture

### 3.1 Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | Next.js (React) | Server-rendered pages for SEO on content/country pages, fast client interactivity for the map and filters |
| Styling | Tailwind CSS | Fast to theme with a small set of design tokens; easy for future self-editing |
| Database | Postgres via Supabase | Managed, generous free tier, built-in file storage and auth for future Profile/Learning phases |
| File storage | Supabase Storage | CV uploads, contributor photos, contract PDFs |
| Hosting | Vercel | Native Next.js support, simple deploys, free tier suitable for launch traffic |
| Interactive map | `react-simple-maps` (or equivalent open-source SVG map library) | Avoids paid mapping API costs; sufficient for clickable/hoverable country shapes |
| Video | YouTube Data API v3 + embedded IFrame player | Views register on the actual YouTube channel, satisfying the monetization requirement |
| E-signature | DocuSign or HelloSign API | Legally solid signing flow for the Submit-a-CR contributor agreement |
| Email — transactional | Resend or SendGrid | Contract emails, confirmation emails, contact-form notifications to founder |
| Email — broadcast updates | A marketing-email provider (e.g. Mailchimp) integrated via API, or a simple in-house sender for launch | Sending periodic updates to subscribers |
| Admin dashboard | Custom, built into the same Next.js app, behind founder-only authentication | Add/edit content, review CR submissions, view subscriber list and CVs, monitor contact requests |

### 3.2 Why not WordPress
WordPress is optimized for static pages and blog posts. This site's core features — a data-driven interactive map, filterable/sortable video-and-blog listings, tag-based related content, a multi-step contributor workflow with e-signature, and CV storage — are application logic, not traditional content management. Forcing these into WordPress would require heavy custom plugin development that fights the platform. The custom admin dashboard exists specifically so the founder retains WordPress-like day-to-day editing ease without that trade-off.

### 3.3 Environments & secrets
- Maintain separate development and production environments/databases.
- Store all API keys (YouTube, DocuSign/HelloSign, email provider, Supabase) as environment variables, never committed to source control.

## 4. Site Map & Navigation

Fixed top navigation bar, visible on scroll, containing exactly these items in this order:
- Home
- Content
- Submit a CR
- Learning *(build the route and page shell now; keep hidden from public nav or marked "Coming Soon" until the founder enables it)*
- Opportunities *(same treatment as Learning)*
- Profile *(same treatment as Learning; will require the auth system already provisioned via Supabase)*

> **ASSUMPTION/DEFAULT:** "Remain in the backend" is interpreted as: the routes, page shells, and data models exist in the codebase and admin dashboard now, but the public nav either hides these items or shows them disabled/"coming soon" until the founder flips a config flag.

## 5. Page Specifications

### 5.1 Home Page
Top to bottom:
1. **Intro section** — what Chronocept Revolutions is, its mission and vision, and why content is delivered through video. Copy should reflect the one-stop-shop positioning: learn sustainability/economics/finance concepts relevant to your country, upskill toward a career, find opportunities, connect with a like-minded community.
2. **Video filter bar** — three toggles: Newest, Global, Most Viewed — positioned above the map.
3. **Interactive world map** — clickable, hoverable countries (hover shows country name as tooltip). Clicking navigates to that country's content page (5.3).
4. **Global content panel** — below the map, a horizontally slideable/clickable panel showcasing the newest global (not country-specific) content.
5. **Subscribe block** — minimal-friction signup: email + CV upload only. No account/password at this stage.
6. **Submit a CR call-to-action** — links to the Submit-a-CR page (5.4).
7. **Contact the Founder** — founder photo, short bio line, "About Athreya Kannan" button linking to the external portfolio, and a separate "Contact" button opening a minimal form capturing only an email address, sent to the founder for manual follow-up.

> **ASSUMPTION/DEFAULT:** Subscribe (step 5) and Contact (step 7) are two distinct data captures with different purposes and should be stored/handled separately: Subscribe entries feed the marketing/update list and CV archive; Contact entries generate a direct notification to the founder and are not added to the broadcast list automatically.

### 5.2 Content Section
A YouTube-channel-style listing page showing Newest and Most Viewed content. Clicking an item opens a detail view with the video embedded above its companion blog (framed as the video's supporting research, not a standalone post), followed by a "Related" panel of other content sharing tags with the current item.

### 5.3 Country Content Pages
- Reached by clicking a country on the home page map.
- Shows up to 10 video+blog pairs for that country, paginated.
- Below the paginated country list: an option to view general/global content (content not tied to a specific country).

### 5.4 Submit a CR Page
- A downloadable blog template (structure: Issue / How Others Do It / Solution) contributors must use.
- A clear disclaimer covering: what's expected of a submission, how it will be reviewed, and that accepted content becomes CR's property once the contributor accepts the agreement — no financial claim survives acceptance.
- Step-by-step process explanation: submit → CR verifies sources → CR edits as needed → contributor receives edited version for reference → contributor signs the agreement online → CR produces the video → publishes video + blog with contributor credit and photo.
- Photo upload with specifications provided to the contributor (aspect ratio/size), used consistently in both video and blog credit.
- The e-signature step (DocuSign/HelloSign) is embedded directly in this flow — contributor should not need to leave the site to an unbranded signing portal if avoidable.

> **OPEN ITEM:** The actual contract/legal text for the rights-transfer agreement must be supplied by the founder or counsel; Claude Code should build the signing workflow and leave a clearly marked placeholder for legal text.

### 5.5 Learning / Opportunities / Profile
Build route, page shell, and a simple "coming soon" placeholder for each. Do not build full functionality yet. Sketch the future data models (course records, job/consultant-opportunity records, user accounts) in the database schema so future build-out doesn't require a redesign.

## 6. Data Model (minimum viable schema)

| Entity | Key fields |
|---|---|
| ContentItem | id, title, youtube_video_id, blog_body (issue / how_others_do_it / solution as separate fields), country (nullable = global), tags[], view_count, published_at, contributor_id (nullable) |
| Country | id, iso_code, name, map_shape_id |
| Tag | id, label |
| Contributor | id, name, email, photo_url, bio, linked ContentItem ids |
| CRSubmission | id, contributor info, submitted_blog_draft, status (submitted/in_review/edited/awaiting_signature/signed/published), signed_agreement_url, timestamps |
| Subscriber | id, email, name (optional), country (optional), cv_url, subscribed_at, consent_flag |
| ContactRequest | id, email, submitted_at, resolved_flag |

## 7. Backend & Integrations

**7.1 YouTube integration**
- Connect to the existing Chronocept Revolutions YouTube channel via the YouTube Data API to pull video metadata (title, thumbnail, view count, publish date, tags).
- Embed actual YouTube players (IFrame API) rather than re-hosting video files, so plays on the website count toward the channel's view totals — required, since channel growth is the monetization path.

**7.2 Data capture & storage**
- Store subscriber emails, names, countries, and CV files securely, associated with explicit consent capture (a checkbox, timestamped) given PII is being collected.
- Store CR submission data, including drafts, edit history, and the final signed agreement document.

**7.3 Automated updates**
- Provide an admin capability to send update emails/newsletters to the subscriber list from the dashboard, without developer involvement.

**7.4 Admin dashboard requirements**
- Founder-only authenticated area.
- Add/edit/publish ContentItems (attach YouTube video, write the three-part blog, tag, set country).
- Review queue for CR submissions with status tracking through the 5.4 workflow.
- View/export subscriber list and CVs.
- View contact requests.
- Toggle visibility of Learning / Opportunities / Profile in public nav.

## 8. Hosting & Deployment (plain-language steps for a non-developer)

1. Register/confirm the domain name (e.g. via Namecheap or Google Domains).
2. Create a Vercel account and connect it to the project's code repository for one-click deploys.
3. Create a Supabase account for database, file storage, and (later) authentication.
4. Create a Google Cloud project and enable the YouTube Data API to get an API key.
5. Create a DocuSign or HelloSign developer account for the e-signature integration.
6. Create an account with the chosen email provider (Resend/SendGrid) for transactional email, and a broadcast provider if separate.
7. Point the domain's DNS at Vercel and issue an SSL certificate (handled automatically by Vercel).
8. Set up environment variables for all the above keys in Vercel's project settings.

> **ASSUMPTION/DEFAULT:** Approximate ongoing cost will depend on traffic and the DocuSign/HelloSign plan chosen; most other services here have workable free tiers at launch scale. Claude Code should present a rough monthly cost estimate before provisioning paid tiers.

## 9. Compliance & Privacy Notes

- Include a cookie/consent banner and a basic privacy policy page, since the site collects emails and CVs internationally.
- Clearly disclose, at the point of CV/email collection, what the data will be used for and how it will be stored.
- Keep the Submit-a-CR rights-transfer language in a clearly reviewable, separate legal document rather than hard-coding assumptions about its terms into UI copy.

## 10. Explicit Non-Goals for This Phase

- No paid courses, certificates, or full learning management system yet — Learning stays a placeholder.
- No job/opportunity postings — Opportunities stays a placeholder; the model is CV-on-file plus manual outreach, not a live job board.
- No user login/full profile system yet, beyond what's needed for the founder's own admin access.

## 11. Summary of Open Items Requiring Founder Input

- Portfolio HTML/CSS/assets and finalized logo file.
- Domain name registration status.
- Monthly budget ceiling for paid services.
- Actual legal text for the Submit-a-CR contributor rights-transfer agreement.
- Confirm the Contact-the-Founder button stays email-only capture, not a full message form.
