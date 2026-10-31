// Reads a subreddit's top posts through Reddit's official API.
// Needs a free Reddit app: set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET in Vercel (see README).
let token = null, expires = 0;
const UA = 'web:ops-display:1.0 (personal news dashboard)';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sub = String((req.query && req.query.sub) || '').replace(/[^A-Za-z0-9_]/g, '');
  const id = process.env.REDDIT_CLIENT_ID, secret = process.env.REDDIT_CLIENT_SECRET;
  if (!sub) return res.status(400).json({ error: 'Missing subreddit' });
  if (!id || !secret) return res.status(501).json({ error: 'Reddit app not connected' });
  try {
    if (!token || Date.now() > expires) {
      const t = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(id + ':' + secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': UA
        },
        body: 'grant_type=client_credentials'
      });
      const j = await t.json();
      if (!j.access_token) return res.status(502).json({ error: 'Reddit sign-in failed. Check the app ID and secret.' });
      token = j.access_token;
      expires = Date.now() + ((j.expires_in || 3600) - 60) * 1000;
    }
    const r = await fetch(`https://oauth.reddit.com/r/${sub}/top?t=day&limit=20&raw_json=1`, {
      headers: { 'Authorization': 'Bearer ' + token, 'User-Agent': UA }
    });
    if (!r.ok) return res.status(r.status).json({ error: 'Reddit error ' + r.status });
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900');
    return res.status(200).json(await r.json());
  } catch (e) {
    return res.status(502).json({ error: 'Could not reach Reddit' });
  }
};
