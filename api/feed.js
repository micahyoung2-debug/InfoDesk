// Relays a public RSS/Atom feed (or web page) so the display can read it from the browser.
const BLOCKED = /^(localhost|127\.|10\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[?::1\]?$|metadata)/i;

// Only answers requests from your own display, so other sites can't use this relay.
function fromOwnSite(req){
  // Turn away requests that clearly come from another website; allow everything else,
  // so your own display is never blocked by a missing header.
  const h = req.headers || {};
  const site = h['sec-fetch-site'];
  if (site === 'cross-site' || site === 'same-site') return false;
  const from = h.origin || h.referer;
  if (!from) return true;
  try {
    const host = new URL(from).host;
    return host === h.host || host === h['x-forwarded-host'];
  } catch (e) { return true; }
}

module.exports = async (req, res) => {
  if (!fromOwnSite(req)) return res.status(403).send('This relay only serves its own display.');
  let target;
  try { target = new URL(req.query.url); } catch (e) { return res.status(400).send('Missing or invalid url'); }
  if (!/^https?:$/.test(target.protocol) || BLOCKED.test(target.hostname)) {
    return res.status(400).send('That address is not allowed');
  }
  try {
    const r = await fetch(target, {
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OpsDisplay/1.0; personal news display)',
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.8, */*;q=0.5'
      }
    });
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 3_000_000) return res.status(413).send('Feed too large');
    res.setHeader('Content-Type', r.headers.get('content-type') || 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900');
    return res.status(r.ok ? 200 : (r.status >= 400 && r.status < 600 ? r.status : 502)).send(buf);
  } catch (e) {
    return res.status(502).send('Could not reach that site');
  }
};
