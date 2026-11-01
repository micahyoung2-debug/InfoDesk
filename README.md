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
- `theverge.com` — any website; the display finds its feed automatically
- `https://example.com/feed.xml` — or paste a feed address directly

Stories from all sources are mixed together. Click a headline to open the story.


## News settings

Move the mouse and click **News settings** for things that apply to every newsfeed and the ticker:

- **Watch words**: stories that mention them jump to the front and are marked.
- **Mute words**: stories that mention them are hidden everywhere.
- **Big-story alerts**: when several of your separate sources cover the same story, a banner drops in at the top and the story turns amber. You can set how many sources it takes (3 by default).
- **Ticker**: the crawl along the bottom edge, with its own category, sources and speed. Hover to pause it; click a story to open it.

Each newsfeed also shows a QR code for the current story, so you can scan it with your phone from across the room. You can turn it off in the zone's settings.

## Clock

In the clock zone's settings, list **Other places**, one per line: a city like `Tokyo` or `Paris, France` (add a state or country after a comma if the name is common), a time zone like `UTC`, or a small place the name lookup can't find, written with its coordinates: `Akakura Onsen (36.886, 138.172)`. Places show two per row and you can add as many as you like. Each shows its local time, its current weather, and "Tomorrow" or "Yesterday" when the date differs from yours. The zone grows to fit them, moving the zone below it down; turn that off with **Resize the zone to fit all places** if you'd rather set the size yourself. Fill in **Your city** to show your own weather beside the date.

## Other zones

- **World map quotes**: a rotating quote sits above the map. In the map's settings, list people or books, one per line; quotes come from their pages on Wikiquote (a free, sourced quotation collection). For a book, type its title; if it doesn't come up, add "by" and the author (`The Dispossessed by Ursula K. Le Guin`) and the display will also look for that book's section on the author's page. The **Quote check** at the bottom of the map's settings shows which names and books found quotes. You can also type your own quotes as `quote — who said it`.
- **World map**: dots on the countries in your current headlines (amber for big stories), earthquakes from the last day, and the space station's track. Land on the night side of Earth is dimmer. **Aurora**: NOAA's aurora forecast for the next 30 to 90 minutes, drawn as glowing rainbow areas (violet for a slight chance through to red for a strong one) that shimmer gently; hover anywhere in them for the chance, the current Kp and how visible it's likely to be, and click for NOAA's live forecast. Three layers have quick on/off buttons on the map (shown when you move the mouse): **Aurora** (above), **Radar**, live rain and snow from Rain Viewer wherever weather radar exists (most of North America, Europe, Japan, Australia and parts of Asia and South America; not open ocean), and **Storms & hazards**, active hurricanes and typhoons (spinning spirals), floods, volcanoes, wildfires and droughts from GDACS, in amber when the alert is orange or red. Hover over a country's dot to see its stories, a quake to see its size, place and depth, or the ISS for its position. Click a dot to open the top story, or a quake for the USGS details.
- **Weather**: pick a view from the menu in the zone's top-right corner (shown when you move the mouse), or set it in the zone's settings: your local conditions, or world rankings for heaviest snowfall, heaviest rain, strongest gusts, thunderstorm and lightning risk, hottest, coldest, biggest temperature swing, highest feels-like heat, strongest UV, worst air quality and dust storms, plus active disaster alerts (cyclones, floods, volcanoes, droughts, wildfires). Rankings show the top five places with their values and bars, can be for today or tomorrow's forecast, and can rotate through every view. Click a place to open it on a live weather map. The same top five appear on the world map as stars in a color that stands out from your theme (pink for Earth blue, mint for Mars red, violet for Belt amber), strongest for #1 and fading to #5; hover a star for details or click it to open the weather map. Rankings cover about 120 places chosen for big cities and extreme weather. For local conditions, type your city, adding a state or country after a comma if the name is common, like "Portland, Oregon".
- **Earthquakes**: magnitude 2.5+ from the last 24 hours (US Geological Survey).
- **Rocket launches**: countdown to the next launch worldwide, plus the ones after it. Click a launch to open its webcast (marked ▶) or its information page.
- **Space weather**: geomagnetic activity (with aurora chances), solar wind and the latest solar flare (NOAA).
- **Space station**: hover over the ISS on the world map for its position, altitude and speed. (There's also a separate readout zone if you want one.)
- **Image feed**: a random image every 30 seconds from sources you list, one per line: `nasa:nebula` searches NASA's image library, `commons:aurora` finds Wikimedia Commons featured pictures (photographer credited), `da:cyberpunk city` finds popular DeviantArt art matching the words, `da:@artistname` shows one artist's gallery, `unsplash:aurora` searches Unsplash photos (needs a free key, below), `earthporn@lemmy.world` pulls a Lemmy community's top posts (Lemmy is an open, Reddit-like network). NSFW and mature posts are skipped. The Source check in the zone's settings shows which lines work.
- **Events calendar**: paste public calendar links (.ics or webcal://) from venues, promoters, or your own Google Calendar.

If a readout says it's unavailable, that service is briefly down; it retries on its own.

## When a news source isn't working

Open the newsfeed's settings (press **E**, click the newsfeed). At the bottom, **Source check** lists every source with a ✓ or ✕ and the reason it failed.

- **Running as a file?** Feeds go through free public relays, and big sites like Google News often block those. The Vercel setup above fixes most of this.
- **"This site doesn't seem to publish a feed"**: try the site's main address (for example `democracynow.org`, not `.com`), or find the site's RSS link and paste that.
- **Reddit**: Reddit no longer allows outside access (new API access needs Reddit's manual approval), so subreddit lines can't work and are removed automatically.

## If it feels slow

Use the **Motion** menu on the control bar. **Light** redraws the animated zones a few times a second instead of 30, turns off the pulsing rings and the scanline overlay, and keeps the ticker smooth. It's a good fit for a display you mostly glance at.

Press **P** to show a frame-rate meter in the top-left corner. Around 60 fps is smooth; if it's well under 30, try **Motion: light**.

## Moving and resizing zones

Press **E** (or click **Edit layout**). Drag a zone's title bar to move it, and drag any edge or corner to resize it; zones snap to the 12 × 8 grid and show their size while you drag. Click a zone (without dragging) to open its settings.

## Unsplash photos (optional)

Unsplash needs a free access key, and only works from your Vercel address.

1. Go to unsplash.com/developers, sign up or log in, and click **Your apps** → **New Application**. Accept the guidelines, give it any name and description, and create it.
2. On the app's page, copy the **Access Key** (not the Secret key).
3. In Vercel, open your project → **Settings** → **Environment Variables**. Add `UNSPLASH_ACCESS_KEY` with that key and save.
4. Go to **Deployments**, click **⋯** on the latest one, and choose **Redeploy**.

Then add lines like `unsplash:aurora` to the image feed. New Unsplash apps start in demo mode (50 searches an hour), which is plenty: each search is cached for 30 minutes.

## Notes on speed and safety

- The display only redraws what moves: animated zones at 30 frames a second, the map at 20, and the ticker smoothly. **Motion: light** on the control bar slows all of them further.
- A source that fails is left alone for 30 minutes before being tried again, instead of on every refresh.
- Your Vercel relay and Unsplash lookup only answer requests from your own display, so other websites can't use them.

## Display & alerts (control bar)

- **Brightness**: a slider on the control bar while editing, and in Display & alerts. **Dim at night** lowers the brightness between the times you choose, slows the animations and silences sounds.
- **Sound**: an optional chime for big stories and your alerts, and an optional engine-room hum. Browsers only allow sound after a click or key press, so after a reload sound starts with your first click.
- **Your alerts**: snow forecast at a place, aurora chance near a place, earthquakes near a place, news mentioning words, and rocket launches about to happen. Each shows in the drop-down banner and the event log, once per event.
- **Copy this setup to another screen**: copy a link (or a code) that carries your whole layout, sources, alerts and settings. Open the link on the other screen and choose **Load this setup**.

## More zones (Add zone → Shows)

- **Ship's radio**: NTS 1 and 2 plus all 16 NTS Infinite Mixtapes, dublab (Los Angeles, Cologne and Tokyo), SUBLAB, every SomaFM channel, KEXP, or your own stream. It's one shared player: the radio on every page plays the same station, so changing pages doesn't interrupt it. dublab and SUBLAB addresses are looked up in Radio Browser, an open directory of stations, so they stay current. Press play after the page loads.
- **Powder report**: snow on the ground, the last 24 hours, and a 7-day snow forecast for your ski spots.
- **Live sun**: NASA SDO images of the Sun in several wavelengths, every 15 minutes.
- **Tonight's sky**: Moon phase, sunset and sunrise, and which planets are up while it's dark.
- **Near-Earth asteroids**: close passes in the next 60 days from NASA JPL.
- **On this day**: events from Wikipedia for today's date, with the words you choose shown first.
- **Event log**: big stories, your alerts, strong quakes, serious disaster alerts, strong aurora and launches, kept for three days.

## Pages

Besides your original layout there are two more pages, **Space** and **Snow and radio**. Move the mouse and use the **page switch** at the top of the screen (or press **1**, **2**, **3**) to jump between them; the display stays on whichever page you choose.

### Rotating pages (optional)

Turn on in **Display & alerts → Rotating pages**. Page 1 is always your original layout; you start with two more pages, **Space** and **Snow and radio**, and the display moves to the next page every 2 minutes (adjustable), dissolving smoothly from one page into the next. Moving the mouse pauses it, and keys **1–9** jump to a page. In edit mode, the page bar at the top adds, renames and deletes pages; build each page with Add zone, drag and resize as usual. The ticker, brightness, alerts and banners carry across every page.

Turning pages **off** goes straight back to your original layout. Your other pages are kept, so turning them on again brings them back.

## Vertical monitors

Use the **Layout** menu on the control bar: **horizontal**, **vertical** (an 8 × 12 grid for a portrait screen), or **match screen**, which switches by itself when the window is taller than it is wide. The first time you go vertical, your zones are arranged to fit automatically; rearrange them however you like. Each layout is remembered separately, so switching back and forth never undoes the other one. Rotating pages each get their own vertical layout too.

## Showing the controls

Moving the mouse only shows the cursor (and pauses rotating pages). To bring up the control bar, move the mouse to the **middle of the bottom edge**; for the page switch, the **middle of the top edge**. They stay while the mouse is over them. A zone's own small menus (the newsfeed category, the weather view, the map's layer buttons) appear when you hover that zone.

## Screen settings (Display & alerts → Screen)

- **Text size**: scales all text for reading from across the room, without changing the layout.
- **Background**: plain, drifting stars, or stars with a faint nebula tinted to your theme, plus a strength slider.
- **Keep the screen awake**: stops the computer dimming or sleeping while the display is open (Firefox 126 or newer). If it still sleeps, also set System Settings → Lock Screen → "Turn display off when inactive" to Never.
- **Burn-in protection**: every 4 minutes everything shifts by a few pixels, too little to notice, so nothing sits in exactly the same spot for hours.
- **Start-up sequence**: panels power on one by one with a scan line when the page loads.

More themes are in the color menu: Belter teal and rust, Martian navy steel, and UN navy and white. Each zone can also have its own accent color (press E, click the zone, then **Accent color**).

**Layout presets** (Display & alerts): one click swaps the main page for News-heavy, Space-heavy or Minimal, and you can save your own. **Undo** (control bar, or Cmd+Z) reverses layout changes, preset swaps and settings changes.

## Start it automatically on the Mac

This opens the display full screen in Firefox with no toolbars when you log in.

1. Open **Automator** (in Applications), choose **New Document → Application**.
2. In the search box on the left, type **Run Shell Script** and drag it into the right side.
3. Replace the text in the box with this line, using your Vercel address:
   `open -na "Firefox" --args --kiosk "https://YOUR-ADDRESS.vercel.app"`
4. **File → Save**, name it `Ops Display`, and save it in **Applications**.
5. Open **System Settings → General → Login Items**, click **+** under "Open at Login", and choose **Ops Display**.

To test it now, double-click Ops Display in Applications. To leave kiosk mode, press **Cmd+Q**. If Firefox is already open when it runs, quit Firefox first, as kiosk mode applies to a fresh start. Drag the window to the TV before going full screen, or set the TV as the main display in System Settings → Displays.

## Messages zone (Add zone → Shows: Messages)

Shows your newest unread email, plus buttons that open Gmail, WhatsApp, Messenger and Instagram in a new tab. Instagram, Messenger and WhatsApp don't allow outside apps to read personal messages, so those are shortcuts only.

### Connecting Gmail (one time)

1. Your Google account needs **2-Step Verification** on (myaccount.google.com → Security).
2. Go to **myaccount.google.com/apppasswords**, type a name like `Ops display`, and click **Create**. Copy the 16-letter password it shows.
3. In Vercel, open your project → **Settings** → **Environment Variables** and add three, each as **Secret**:
   - `MAIL_USER`: your Gmail address
   - `MAIL_APP_PASSWORD`: the 16-letter app password
   - `INBOX_KEY`: a passcode you make up (any long word or phrase)
4. **Deployments** → **⋯** on the latest → **Redeploy**.
5. On the display, press **E**, click the Messages zone, and type the same passcode into **Email passcode**.

The passcode is saved only in that browser and is never included in setup links, so sharing the display's address never shares your email. Use **Show only who it's from** if other people can see the screen. To disconnect, delete the app password in your Google account.

Other providers with app passwords (iCloud, Fastmail, Yahoo) work too: also add `MAIL_IMAP_HOST`, for example `imap.mail.me.com` for iCloud.
