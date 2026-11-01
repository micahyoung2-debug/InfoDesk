// Searches Unsplash photos. Needs a free Unsplash access key in Vercel as UNSPLASH_ACCESS_KEY (see README).
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
  const key = process.env.UNSPLASH_ACCESS_KEY;
  const q = String((req.query && req.query.q) || '').slice(0, 100);
  if (!q) return res.status(400).json({ error: 'Missing search words' });
  if (!key) return res.status(501).json({ error: 'Unsplash key not set' });
  try {
    const r = await fetch(`https://api.unsplash.com/search/photos?per_page=30&orientation=landscape&content_filter=high&query=${encodeURIComponent(q)}`, {
      headers: { 'Authorization': 'Client-ID ' + key, 'Accept-Version': 'v1' }
    });
    if (!r.ok) return res.status(r.status).json({ error: 'Unsplash error ' + r.status });
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json(await r.json());
  } catch (e) {
    return res.status(502).json({ error: 'Could not reach Unsplash' });
  }
};
