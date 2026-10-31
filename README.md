# Ops display

A sci-fi second-monitor dashboard: live newsfeed, a world map of where the news is happening, a scrolling ticker, big-story alerts, and real-world readouts (weather, earthquakes, rocket launches, space weather, the space station, and event calendars).

**Already using an earlier version?** Your saved layout stays as it was. To get the new default layout with all the new zones, move the mouse and click **Reset layout** (twice). Or keep your layout and use **Add zone** to add the new ones.

## Try it right now (no setup)

1. Unzip the folder.
2. Double-click `index.html`. It opens in Firefox.
3. Drag the window to your TV and press **F** for full screen.

Opened this way, the newsfeed reads feeds through free public relays. They usually work, but they can be slow or go down. For a reliable setup, put it on Vercel (below).

## Put it on Vercel (recommended)

This gives you a permanent web address and its own feed relay, so it doesn't depend on anyone else's service.

1. Go to github.com, click **+** (top right) → **New repository**. Name it `ops-display`, leave it Public or Private, click **Create repository**.
2. On the new repo page, click **uploading an existing file**. Drag in everything inside this folder: `index.html`, `package.json`, `README.md`, and the `api` folder. Click **Commit changes**.
3. Go to vercel.com, click **Add New…** → **Project**, and **Import** the `ops-display` repo.
4. Leave every setting as it is and click **Deploy**.
5. When it finishes, click **Visit**. That's your display's address. Bookmark it in the Firefox window on your TV.

Your layout is saved per browser and per address, so set it up once on the TV's window.

## Newsfeed sources

### Category

Pick what kind of news you want: World, Top headlines, Business, Economy, Science, Technology, Space, Health, Climate, Politics, Entertainment, Sports, Music, or AI.

To switch quickly, move the mouse and use the small menu in the newsfeed's top-right corner. You can also set it in the zone's settings.

The category changes the `top` and country lines. Subreddits and websites you've added stay the same whatever the category.

### Sources

Press **E** (or move the mouse and click **Edit layout**), click the newsfeed zone, and edit **Sources**, one per line:

- `top` — the day's biggest stories in the chosen category
- `science`, `economy`, or any category name — always include that category, whatever the menu is set to
- `japan`, `uk`, `top canada` — a country's news in the chosen category. Countries with an English-language Google News edition get that edition's top stories; others get English coverage of the country. Any other single word works as a search topic.
- `r/worldnews` — a subreddit's top posts from the last 24 hours
- `theverge.com` — any website; the display finds its feed automatically
- `https://example.com/feed.xml` — or paste a feed address directly

Stories from all sources are mixed together. Click a headline to open the story.

Reddit sometimes blocks automated readers. If a subreddit shows "no response", it usually comes back on the next check.

## News settings

Move the mouse and click **News settings** for things that apply to every newsfeed and the ticker:

- **Watch words**: stories that mention them jump to the front and are marked.
- **Mute words**: stories that mention them are hidden everywhere.
- **Big-story alerts**: when several of your separate sources cover the same story, a banner drops in at the top and the story turns amber. You can set how many sources it takes (3 by default).
- **Ticker**: the crawl along the bottom edge, with its own category, sources and speed. Hover to pause it; click a story to open it.

Each newsfeed also shows a QR code for the current story, so you can scan it with your phone from across the room. You can turn it off in the zone's settings.

## Clock

In the clock zone's settings, list **Other places**, one per line: a city like `Tokyo` or `Paris, France` (add a state or country after a comma if the name is common), or a time zone like `UTC`. Places show two per row and you can add as many as you like. Each shows its local time, its current weather, and "Tomorrow" or "Yesterday" when the date differs from yours. The zone grows to fit them, moving the zone below it down; turn that off with **Resize the zone to fit all places** if you'd rather set the size yourself. Fill in **Your city** to show your own weather beside the date.

## Other zones

- **World map quotes**: a rotating quote sits between the map and its caption. In the map's settings, list authors, poets, books or people, one per line; quotes come from their pages on Wikiquote (a free, sourced quotation collection). You can also type your own quotes as `quote — who said it`.
- **World map**: dots on the countries in your current headlines (amber for big stories), earthquakes from the last day, and the space station's track. Land on the night side of Earth is dimmer.
- **Weather**: pick a view from the menu in the zone's top-right corner (shown when you move the mouse), or set it in the zone's settings: your local conditions, or world rankings for heaviest snowfall, heaviest rain, strongest gusts, thunderstorm and lightning risk, hottest, coldest, biggest temperature swing, highest feels-like heat, strongest UV, worst air quality and dust storms, plus active disaster alerts (cyclones, floods, volcanoes, droughts, wildfires). Rankings can be for today or tomorrow's forecast, and can rotate through every view. Click a place to open it on a live weather map. Rankings cover about 120 places chosen for big cities and extreme weather. For local conditions, type your city, adding a state or country after a comma if the name is common, like "Portland, Oregon".
- **Earthquakes**: magnitude 2.5+ from the last 24 hours (US Geological Survey).
- **Rocket launches**: countdown to the next launch worldwide, plus the ones after it. Click a launch to open its webcast (marked ▶) or its information page.
- **Space weather**: geomagnetic activity (with aurora chances), solar wind and the latest solar flare (NOAA).
- **Space station**: hover over the ISS on the world map for its position, altitude and speed. (There's also a separate readout zone if you want one.)
- **Reddit images**: a random image every 30 seconds from the top posts of subreddits you list, skipping NSFW posts. Click an image to open its post. Reddit blocks most free relays, so connect a Reddit app on Vercel (below) for this to work reliably.
- **Events calendar**: paste public calendar links (.ics or webcal://) from venues, promoters, or your own Google Calendar.

If a readout says it's unavailable, that service is briefly down; it retries on its own.

## When a news source isn't working

Open the newsfeed's settings (press **E**, click the newsfeed). At the bottom, **Source check** lists every source with a ✓ or ✕ and the reason it failed.

- **Running as a file?** Feeds go through free public relays, and big sites (Google News, Reddit) often block those. The Vercel setup above fixes most of this.
- **"This site doesn't seem to publish a feed"**: try the site's main address (for example `democracynow.org`, not `.com`), or find the site's RSS link and paste that.
- **Reddit**: Reddit blocks most automated readers, including Vercel's servers. To make subreddits reliable, connect a free Reddit app:
  1. Signed in to Reddit, go to reddit.com/prefs/apps and click **create another app**.
  2. Give it any name, choose **script**, and put `http://localhost` as the redirect URI. Click **create app**. (If Reddit asks you to request API access first, follow its steps; Reddit has been tightening this.)
  3. Copy the ID shown under the app's name, and the **secret**.
  4. In Vercel, open your project → **Settings** → **Environment Variables**. Add `REDDIT_CLIENT_ID` with the ID and `REDDIT_CLIENT_SECRET` with the secret.
  5. Go to **Deployments**, click the **⋯** on the latest one, and choose **Redeploy**.

## If it feels slow

Use the **Motion** menu on the control bar. **Light** redraws the animated zones a few times a second instead of 30, turns off the pulsing rings and the scanline overlay, and keeps the ticker smooth. It's a good fit for a display you mostly glance at.

Press **P** to show a frame-rate meter in the top-left corner. Around 60 fps is smooth; if it's well under 30, try **Motion: light**.
