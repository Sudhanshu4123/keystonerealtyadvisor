# SEO changes: deployment and verification

Nothing here has been deployed. This file lists what changed in the repository, what must be done by hand, and how to verify it.

## Keep these lists in step
`frontend/src/utils/programmaticSeoConfig.js` (PROGRAMMATIC_PAGES and the alias maps) is the source for the programmatic URLs. They are mirrored in
`SitemapController.INDEXABLE_STATIC_PATHS`, `frontend/public/sitemap.xml`, and the two `map` blocks in `frontend/nginx.conf` / `nginx-ssl.conf`.
Run `cd frontend && npm run seo:check` before every release; it fails if any copy has drifted.

## Before deploying
1. `cd frontend && npm ci && npm run build && npm run seo:check`
2. `cd backend && ./mvnw -q test` (the sitemap controller change was NOT compiled in the review environment).
3. Test the nginx config you actually use with `nginx -t` (the new `map` / `@spa` blocks were NOT run in the review environment).
   `frontend/Dockerfile` copies `nginx.conf`; `nginx-ssl.conf` is a separate production variant. Confirm which one runs in production.
4. Rotate the credential in `deploy_keystone.py` (line 11) and move it to an environment variable or secret store.

## Host-level redirects (operational, not applied)
`deploy_keystone.py` makes the host nginx answer for six hostnames with identical content. Only keystonerealtyadvisor.com should serve pages.
Add (adjust certificates) and reload, then confirm with `curl -I`:

```nginx
# Redirect every non-preferred hostname (www and the legacy "...advisors..." domains) to the one canonical host.
server {
    listen 80;
    listen 443 ssl;
    server_name www.keystonerealtyadvisor.com keystonerealtyadvisors.com www.keystonerealtyadvisors.com
                keystonerealtyadvisors.shrishyamassociate.com www.keystonerealtyadvisors.shrishyamassociate.com;
    # ssl_certificate lines must cover these names or the HTTPS redirect will show a certificate warning.
    return 301 https://keystonerealtyadvisor.com$request_uri;
}
```
If the legacy domains are still used for something else, keep them but add `X-Robots-Tag: noindex` instead of redirecting.

## Post-deployment checks
- `curl -sI https://keystonerealtyadvisor.com/no-such-page` returns 404; `/flats-in-delhi` returns 301 to `/properties-in-delhi`; `/sitemap.xml` is XML containing the 25 static URLs plus listings and PUBLISHED projects only.
- In Search Console: URL Inspection > View crawled page on `/`, `/properties-in-delhi`, one property and one project; confirm title, description, canonical and JSON-LD in the rendered HTML.
- Submit `https://keystonerealtyadvisor.com/sitemap.xml`; watch Page indexing for "Duplicate without user-selected canonical", "Soft 404" and "Crawled - currently not indexed".
- Rich Results Test on one property URL (Offer/RealEstateListing fields appear only when the listing has the data).
- Re-crawl in Ahrefs Site Audit: duplicate titles, orphan pages, broken internal links, redirect chains.

## Known limits
- Metadata, canonicals and JSON-LD are still written by JavaScript after load. Google renders this, but other crawlers and social scrapers see only the static homepage tags. Prerendering/SSR for property and project pages is a separate project.
- Dynamic URLs (`/properties/<id>`, `/projects/<slug>`) cannot be validated by nginx, so a deleted listing still returns HTTP 200 with a noindex "not found" page. Fixing that needs SSR/prerender or an API lookup at the proxy.
- Programmatic category pages stay in the sitemap even if they have no listings; the page marks itself noindex once the API confirms zero results, but a crawler that does not run JavaScript will not see that.

## Business facts to confirm (left as TODO, not invented)
Registered address and locality, opening hours, price range, RERA agent registration, years in operation, what verification is really done before a listing is published, which services (NRI, valuation, leasing) are offered, and the correct LinkedIn/company profile URLs for `sameAs`.
