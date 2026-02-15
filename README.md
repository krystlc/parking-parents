# 🌳 Parking Parents: The Parent's Park Guide

Parking Parents is a high-utility discovery platform for parents. It bridges the gap between static map data and real-time "vibe" reports, ensuring parents have the logistical data they need before leaving the house.

---

## 🛠 Project Roadmap (v1.0)

### 🗺️ Geospatial Discovery (The Map)
- [x] **TASK-101:** Implement `Supercluster` logic for Mapbox/Leaflet marker clustering to handle high density.
- [ ] **TASK-102:** Develop "Search as I move" map bounds re-fetching for real-time park discovery.
- [ ] **TASK-103:** Create a sliding "Park Preview Card" for mobile map interactions (drawer-style).
- [x] **TASK-104:** Build multi-select filtering logic for Zod-validated amenities (Fenced, Shaded, Rubber Floor).
- [ ] **TASK-105:** Implement "Distance from me" sorting using the Browser Geolocation API.

### 📄 Content Architecture (Parks & Field Reports)
- [x] **TASK-201:** Develop a `Breadcrumb` component with dynamic Nuxt Content path injection (Park > Update).
- [x] **TASK-202:** Implement "Sibling Park" recommendation engine based on proximity or shared tags.
- [x] **TASK-203:** Build `FieldReportList` component to query child collections by `parkId` in frontmatter.
- [x] **TASK-204:** Create a "Condition Alert" flag on Park Master pages if a Field Report is < 7 days old.
- [x] **TASK-205:** Bridge Parent/Child data via `useAsyncData` to show latest "Vibe" on the Master Profile.

### 🎒 The Kit & Prose Experience
- [x] **TASK-301:** Implement `TableOfContents` component with an Intersection Observer for active-link tracking.
- [x] **TASK-302:** Develop a `StickyAside` layout for desktop to keep the TOC visible during long reads.
- [ ] ~~**TASK-303:** Create "Age-Switching" sections for the Baby Bag page (Infant vs. Toddler vs. Preschooler).~~
- [x] **TASK-304:** Build a "Copy Checklist" utility for one-click export of bag items to mobile Notes apps.

### 📈 SEO & Metadata Authority
- [x] **TASK-401:** Automate OpenGraph (OG) image generation for Park pages using `@nuxtjs/og-image`.
- [x] **TASK-402:** Standardize JSON-LD Schema.org `Place` and `Review` snippets for Park entities.
- [ ] **TASK-403:** Implement Zod-based frontmatter validation to ensure 100% metadata coverage.
- [ ] **TASK-404:** Configure `sitemap.xml` to prioritize Master Park pages over individual Field Reports.

### 💌 Conversion & Growth
- [ ] **TASK-501:** Integrate a newsletter signup CTA in the footer (Mailchimp/Substack/Loops).
- [ ] **TASK-502:** Design a "Park of the Month" newsletter template for automated engagement.
- [x] **TASK-503:** Implement "Save to Favorites" using LocalStorage to encourage user stickiness.

### 🏗️ Infrastructure & V1.0 Polish
- [ ] **TASK-601:** Implement `NuxtImg` with a provider (IPX/Cloudinary) for optimized mobile performance.
- [ ] **TASK-602:** Design "Empty States" for search results with "Clear All Filters" quick-actions.
- [ ] **TASK-603:** Create a "Submit a Correction" form to crowdsource data accuracy from other parents.
- [ ] **TASK-604:** Configure a basic PWA manifest for offline access to park addresses/details.

---

## 🚀 Tech Stack
* **Framework:** Nuxt 3 (Vue 3)
* **Styling:** Tailwind CSS v4 (Custom Prose Components)
* **Content:** Nuxt Content v3 (Collection-based)
* **UI Components:** Nuxt UI
* **Validation:** Zod

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
