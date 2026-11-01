// Reads your newest unread emails (sender, subject, time) so the display can show them.
// Needs three settings in Vercel (see README): MAIL_USER, MAIL_APP_PASSWORD and INBOX_KEY.
// INBOX_KEY is a passcode you choose; only browsers where you've typed it can see your mail,
// so sharing the display's address never shares your inbox.
const { ImapFlow } = require('imapflow');
const crypto = require('crypto');

function fromOwnSite(req){
  const h = req.headers || {};
  const site = h['sec-fetch-site'];
  if (site === 'cross-site' || site === 'same-site') return false;
  const from = h.origin || h.referer;
  if (!from) return true;
  try { const host = new URL(from).host; return host === h.host || host === h['x-forwarded-host']; } catch (e) { return true; }
}
const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'private, no-store');
  if (!fromOwnSite(req)) return res.status(403).json({ error: 'Not allowed' });
  const { MAIL_USER, MAIL_APP_PASSWORD, INBOX_KEY } = process.env;
  if (!MAIL_USER || !MAIL_APP_PASSWORD || !INBOX_KEY) return res.status(501).json({ error: 'Email not set up' });
  if (!same(req.headers['x-inbox-key'] || '', INBOX_KEY)) return res.status(401).json({ error: 'Wrong passcode' });

  const client = new ImapFlow({
    host: process.env.MAIL_IMAP_HOST || 'imap.gmail.com', port: 993, secure: true,
    auth: { user: MAIL_USER, pass: MAIL_APP_PASSWORD }, logger: false
  });
  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');
    let messages = [], unread = 0;
    try {
      const uids = (await client.search({ seen: false }, { uid: true })) || [];
      unread = uids.length;
      const newest = uids.slice(-12);
      if (newest.length) for await (const m of client.fetch(newest, { envelope: true, internalDate: true }, { uid: true })) {
        const f = (m.envelope.from || [])[0] || {};
        messages.push({ from: f.name || f.address || 'Unknown', address: f.address || '', subject: m.envelope.subject || '(no subject)',
          date: new Date(m.internalDate || m.envelope.date).getTime(), id: m.envelope.messageId || '' });
      }
    } finally { lock.release(); }
    await client.logout();
    messages.sort((a, b) => b.date - a.date);
    return res.status(200).json({ unread, messages });
  } catch (e) {
    try { await client.logout(); } catch (e2) {}
    const auth = /auth|credential|password|login/i.test(String(e && (e.responseText || e.message)));
    return res.status(auth ? 502 : 504).json({ error: auth ? 'Email sign-in failed. Check MAIL_USER and MAIL_APP_PASSWORD.' : 'Could not reach the mail server.' });
  }
};
