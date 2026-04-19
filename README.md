# Sharma Florist Website

Static marketing and SEO website for Sharma Florist, a florist and event decoration business serving Ghaziabad, Noida, Greater Noida, and international flower orders from Canada/US to India.

**Live site:** [sharmaflorist.com](https://sharmaflorist.com)

## Project Scope

- Homepage with service navigation and business overview
- Primary service pages for bouquet delivery, flower decoration, and international delivery
- Geo-targeted landing pages inside `ghaziabad/`
- Blog landing page plus manually curated blog posts inside `blog/`
- Product and gallery imagery inside `flower-bouquet/`, `flower-decoration/`, `blog/images/`, and `images/`
- SEO and hosting files such as `sitemap.xml`, `robots.txt`, `ads.txt`, `404.html`, and `CNAME`

## Stack

- Plain HTML, CSS, and vanilla JavaScript
- Shared styling in `style.css` and `blog/blog-styles.css`
- Shared interactivity in `style.js` and `ghaziabad/whatsapp.js`
- Google Fonts and Google Analytics (`gtag.js`)
- WhatsApp-first conversion flow using `wa.me` links
- JSON-LD schema markup on key landing pages
- No framework, package manager, or build step

## Project Structure

```text
.
|-- index.html
|-- rose-n-petals.html
|-- sharma-flower-decorators.html
|-- flower-delivery-canada-to-ghaziabad.html
|-- style.css
|-- style.js
|-- blog/
|   |-- index.html
|   |-- blog-styles.css
|   |-- blog-script.js
|   `-- *.html
|-- ghaziabad/
|   |-- order-flower-bouquet-online.html
|   |-- flower-shop-photo-gallery.html
|   |-- *.html
|   `-- whatsapp.js
|-- flower-bouquet/
|-- flower-decoration/
|-- images/
|-- sitemap.xml
|-- robots.txt
`-- CNAME
```

## Local Preview

Serve the site over HTTP instead of opening files directly. The blog uses `fetch()` to load `blog/whatsapp-button.html`, so `file://` previews will not match production behavior.

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Content Maintenance

- Add new blog posts as `blog/<slug>.html`, then append the post metadata to the `blogPosts` array in `blog/index.html` so pagination works.
- Add new product or gallery images to the relevant asset folder and update the matching page under `ghaziabad/`.
- Update `sitemap.xml` when publishing new indexable pages or image-heavy landing pages.
- Preserve canonical tags, Open Graph tags, Twitter tags, WhatsApp CTA links, and schema markup when duplicating pages.
- Keep edits in UTF-8; several pages contain Hindi copy, special punctuation, and emoji icons.

## Shared Behavior

- `style.js` handles smooth scrolling, active nav highlighting, back-to-top visibility, month-tile accordions, and generic "Load More" behavior.
- `ghaziabad/whatsapp.js` handles bouquet and gallery filtering, the image lightbox, and `buyOnWhatsApp(productCode)` for product inquiries.
- `blog/index.html` contains the blog pagination data and rendering logic; `blog/blog-script.js` is currently a placeholder.

## Deployment Notes

This repository is ready for static hosting. Production uses the custom domain configured in `CNAME`:

- `sharmaflorist.com`

Before publishing, verify:

- the updated pages render correctly on mobile and desktop,
- WhatsApp links open the intended number,
- blog pagination still works,
- `sitemap.xml` matches the published URLs.
