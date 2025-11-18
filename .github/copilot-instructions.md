# Copilot Instructions for Sharma Florist Website

## Project Overview
This is a **static GitHub Pages website** (`sharmaflorist.github.io`) for a flower delivery & decoration business serving Ghaziabad, Noida & Greater Noida, India. The site combines a marketing homepage with a multi-page blog system, optimized for SEO and mobile conversion through WhatsApp contact integration.

**Key Domain Context:**
- Business: Flower delivery & event decoration (operating since 1950)
- Target Locations: Ghaziabad, Noida, Greater Noida, and international delivery (Canada/US to India)
- Primary CTAs: Blog article exploration and WhatsApp contact (`+91-9599308501`)

## Architecture & Data Flow

### Core Structure
```
Root (/)
├── index.html             [Main homepage with service cards]
├── rose-n-petals.html     [Bouquet delivery service page]
├── sharma-flower-decorators.html  [Decoration service page]
├── flower-delivery-canada-to-ghaziabad.html  [International delivery page]
└── blog/
    ├── index.html         [Blog landing with pagination]
    ├── blog-script.js     [Blog pagination & interactivity]
    ├── blog-styles.css    [Shared blog styling]
    └── [18 individual blog posts].html
```

### Design System
**CSS Variables (defined in inline `<style>` or `blog-styles.css`):**
```css
--pink: #f8e1e7           /* Primary accent */
--green: #d6f5e3          /* Secondary accent */
--white: #fff             /* Background */
--text: #3a3a3a           /* Body text */
--soft-green: #eafaf1
--soft-pink: #fbeff3      /* Page background */
--hover: #f3d6e3
```
**Brand Colors:** Primary pink `#b85c8c`, accent green `#7bb274`
**Fonts:** Montserrat (headings), Roboto (body), fallback Arial

### Page Patterns

**Homepage (`index.html`):**
- Sticky navbar with smooth scroll navigation
- Hero section with h1 heading
- 4-card service grid (responsive grid layout with `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`)
- Back-to-top button (fixed position, visible after 300px scroll)
- WhatsApp floating button (fixed bottom-right, animated bounce effect)
- Inline CSS only (no external stylesheets)

**Blog Landing (`blog/index.html`):**
- Similar navbar/hero structure
- Dynamic blog grid populated by JavaScript array of 18 posts
- Server-side pagination (6 posts per page via URL query `?page=N`)
- Post metadata: id, slug, title, date, excerpt

**Blog Posts:**
- Consistent HTML structure with breadcrumb navigation
- Markdown-like content (not actual markdown—plain HTML semantic tags)
- Post navigation links (Previous/↑ All Posts/Next)
- Minified/compressed HTML (no line breaks between tags)
- Back-to-blog link at top

## Critical Patterns & Conventions

### 1. Blog Post Metadata
Blog posts are defined in `blog/index.html` as a JavaScript array. When adding new posts:
```javascript
{
  id: 18,                    // Sequential ID
  slug: "kebab-case-title",  // Filename without .html
  title: "Full Title",
  date: "Month, DD",         // Format: "October, 01"
  excerpt: "..."             // 150-200 chars
}
```
**File naming:** Slugs must match filenames exactly. Always use lowercase with hyphens.

### 2. Responsive Design
- Mobile breakpoints: `900px` (medium) and `600px` (small)
- Grid adjusts: `repeat(auto-fit, minmax(300px, 1fr))` → single column on mobile
- No viewport units; use `rem` for scalability
- Test: navbar link spacing reduces on mobile, service cards stack

### 3. WhatsApp Integration
- **Endpoint:** `https://wa.me/919599308501`
- **Location:** Fixed button on all pages (fetched via `fetch('/blog/whatsapp-button.html')`)
- **Design:** Green `#25d366` circular button with SVG icon + animated text
- **Animations:** Bounce effect (`@keyframes whatsapp-bounce`) and text fade-in

### 4. SEO & Metadata
Every page includes:
- `<meta name="canonical">` (absolute URL)
- OG tags: `og:site_name`, `og:type`, `og:title`, `og:description`, `og:url`, `og:image`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Images served as `.webp` with fallback `.png`

### 5. Navigation Patterns
**Blog Post Navigation:**
- Uses data structure index to determine prev/next
- Links use `/blog/[slug].html` format
- Fallback to `/blog/` for first page

**Smooth Scrolling:**
- Navigation uses `href="#section"` with `scrollIntoView({ behavior: 'smooth' })`
- Active link highlighted by scroll position detection (offset + 80px buffer)

## Developer Workflows

### Adding a New Blog Post
1. Create HTML file: `blog/[slug].html` (minified structure, see existing posts)
2. Add entry to `blogPosts` array in `blog/index.html`:
   ```javascript
   {id: 19, slug: "new-post-slug", title: "...", date: "...", excerpt: "..."}
   ```
3. Verify: Post appears on pagination when `?page=N` shows it
4. Check SEO: Ensure canonical URL matches filename

### Updating Service Pages
- Service pages are static HTML (not templated)
- Maintain same navbar/footer as homepage
- Use brand colors and service-card grid for consistency
- Always include WhatsApp CTA button

### CSS Changes
- **Homepage styles:** Edit inline `<style>` in `index.html`
- **Blog styles:** Edit `blog/blog-styles.css`
- Maintain CSS variable usage for consistency
- Test responsive behavior at 900px and 600px breakpoints

## External Dependencies & Build Info

**No build process required** — static HTML/CSS/JS.

**External Resources:**
- Google Fonts: Montserrat, Roboto (preconnected in `<head>`)
- WhatsApp API: `https://wa.me/[phone]`
- Favicon: `favicon.ico` (root)

**Images:**
- WebP format preferred (`.webp`) with PNG fallback
- Location: `images/` directory
- OG images: `rose.webp`, `lily.webp` (used in meta tags)

## Common Tasks & Commands

**Local testing:**
```powershell
# Windows: Simple HTTP server for testing
python -m http.server 8000   # or: npx http-server
```
Then navigate to `http://localhost:8000`

**Validation:**
- Run HTML through W3C Validator for semantic correctness
- Check mobile responsiveness in DevTools (600px, 900px breakpoints)
- Verify all WhatsApp links resolve to `wa.me/919599308501`
- Test blog pagination across all pages

**Deployment:** Push to GitHub (auto-deployed via GitHub Pages)

## Known Limitations & Future Considerations

- **No dynamic backend:** All content is static HTML
- **Blog pagination:** Client-side only (6 posts per page hardcoded)
- **SEO:** Relies on meta tags; consider sitemap updates when adding posts
- **Analytics:** No tracking installed (consider adding if needed)
