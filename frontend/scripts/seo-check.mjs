// Consistency check for URL lists that are maintained in several places.
// Run: npm run seo:check   (no dependencies; exits 1 on any mismatch)
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(path.join(root, p), 'utf8');
const errors = [];
const fail = (m) => errors.push(m);

const cfg = await import(pathToFileURL(path.join(root, 'src/utils/programmaticSeoConfig.js')).href);
const { PROGRAMMATIC_PAGES, PROGRAMMATIC_ALIASES, CITY_PAGE_ALIASES } = cfg;
const aliases = { ...CITY_PAGE_ALIASES, ...PROGRAMMATIC_ALIASES };

// 1. Static paths that must be in every sitemap (hand-built pages + programmatic pages).
const CORE = ['/', '/properties', '/properties-in-delhi', '/properties-in-gurugram', '/properties-in-noida',
  '/flats-for-rent-in-gurugram', '/projects', '/advisory', '/contact', '/terms', '/privacy'];
const expected = [...new Set([...CORE, ...PROGRAMMATIC_PAGES.map((s) => `/${s}`)])].sort();

// 2. Java sitemap list
const java = read('../backend/src/main/java/com/keystone/controller/SitemapController.java');
const block = java.match(/INDEXABLE_STATIC_PATHS\s*=\s*List\.of\(([\s\S]*?)\);/);
const javaPaths = block ? [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]).sort() : [];
if (!block) fail('SitemapController.INDEXABLE_STATIC_PATHS not found');

// 3. static fallback sitemap
const xml = read('public/sitemap.xml');
const xmlPaths = [...xml.matchAll(/<loc>https:\/\/keystonerealtyadvisor\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1]).sort();

const diff = (a, b) => [a.filter((x) => !b.includes(x)), b.filter((x) => !a.includes(x))];
for (const [name, list] of [['SitemapController.java', javaPaths], ['public/sitemap.xml', xmlPaths]]) {
  const [missing, extra] = diff(expected, list);
  if (missing.length) fail(`${name} is missing: ${missing.join(', ')}`);
  if (extra.length) fail(`${name} has unexpected URLs: ${extra.join(', ')}`);
}

// 4. no alias or noindex page may be in the sitemap
for (const a of Object.keys(aliases)) if (xmlPaths.includes(`/${a}`)) fail(`alias /${a} is in the sitemap`);
for (const p of ['/entity-map', '/login', '/register', '/sitemap']) if (xmlPaths.includes(p) || javaPaths.includes(p)) fail(`${p} must not be in the sitemap`);

// 5. every sitemap path has a React route
const app = read('src/App.jsx');
const routes = new Set([...app.matchAll(/path="(\/[^"]*)"/g)].map((m) => m[1]));
for (const p of expected) {
  const isProgrammatic = PROGRAMMATIC_PAGES.includes(p.slice(1));
  if (!isProgrammatic && !routes.has(p)) fail(`no <Route> for sitemap path ${p}`);
}
if (!app.includes('PROGRAMMATIC_PAGES.map')) fail('App.jsx no longer generates programmatic routes from PROGRAMMATIC_PAGES');
for (const [from, to] of Object.entries(aliases)) {
  const target = '/' + to;
  if (!expected.includes(target)) fail(`alias /${from} points at ${target}, which is not an indexable page`);
}

// 6. nginx: redirect map and known-route map
for (const f of ['nginx.conf', 'nginx-ssl.conf']) {
  const conf = read(f);
  const redir = conf.match(/map \$uri \$seo_redirect \{([\s\S]*?)\n\}/);
  const known = conf.match(/map \$uri \$spa_known \{([\s\S]*?)\n\}/);
  if (!redir || !known) { fail(`${f}: $seo_redirect / $spa_known maps missing`); continue; }
  const pairs = Object.fromEntries([...redir[1].matchAll(/^\s*(\/\S+)\s+(\/\S+);/gm)].map((m) => [m[1], m[2]]));
  for (const [from, to] of Object.entries(aliases)) if (pairs[`/${from}`] !== `/${to}`) fail(`${f}: redirect /${from} -> /${to} missing or wrong`);
  for (const from of Object.keys(pairs)) if (!aliases[from.slice(1)]) fail(`${f}: redirect ${from} is not an alias in programmaticSeoConfig.js`);
  const regexes = [...known[1].matchAll(/^\s*~(\S+)\s+1;/gm)].map((m) => new RegExp(m[1]));
  const knownPath = (p) => regexes.some((r) => r.test(p));
  for (const p of expected) if (!knownPath(p)) fail(`${f}: $spa_known would 404 the indexable page ${p}`);
  for (const p of ['/properties/12', '/properties/some-slug', '/projects/conscient-parq-sector-80-gurgaon', '/login', '/dashboard/favorites', '/admin/projects']) {
    if (!knownPath(p)) fail(`${f}: $spa_known would 404 the app route ${p}`);
  }
  for (const p of ['/explore/anything', '/this-page-does-not-exist', '/flats-for-sale-in-pune']) {
    if (knownPath(p)) fail(`${f}: $spa_known wrongly accepts ${p}`);
  }
}

// 7. robots.txt must not block an indexable page and must point at the sitemap
const robots = read('public/robots.txt');
const disallows = [...robots.matchAll(/^Disallow:\s*(\S+)/gim)].map((m) => m[1]);
for (const p of expected) for (const d of disallows) if (p.startsWith(d)) fail(`robots.txt Disallow ${d} blocks ${p}`);
if (!/^Sitemap:\s*https:\/\/keystonerealtyadvisor\.com\/sitemap\.xml/im.test(robots)) fail('robots.txt has no Sitemap line for /sitemap.xml');

if (errors.length) {
  console.error(`seo:check FAILED (${errors.length})\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`seo:check OK: ${expected.length} indexable static URLs consistent across App.jsx, SitemapController.java, public/sitemap.xml, nginx.conf, nginx-ssl.conf, robots.txt`);
