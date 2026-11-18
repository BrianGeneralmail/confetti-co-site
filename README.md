# Confetti & Co. — Website Mockup

## ⭐ November 2026 update: what changed and what still needs you

### Analytics and email signup — ✅ connected
- **Google tag** (Tag Manager container `GTM-5VGX4RQX`, which sends to GA4
  `G-88L5MNETH3`) is pasted right after `<head>` on every page, including all
  blog posts, the privacy page, and the download page. Any new page you add
  needs the same snippet in the same spot.
- **Click tracking:** `assets/js/site.js` sends `etsy_click`, `signup_click`,
  and `sign_up` events through that Google tag, with a `site_section` value
  (`featured`, `occasions`, `blog-cta`, `blog-related`, …). It deliberately
  does not load GA4 a second time, because the container already records page
  views. Find the events in GA4 under Reports → Engagement → Events. To see
  `site_section` in reports, register it once in GA4: Admin → Custom
  definitions → Create custom dimension → Event scope → parameter
  `site_section`.
- **Mailchimp:** the embedded-form address is set in `assets/js/site.js`
  (`MAILCHIMP_FORM_ACTION`). The homepage and blog forms sign people up in the
  background and send them straight to `/download/` (Starter Kit + WELCOME10),
  so visitors never see Mailchimp's own pages. If Mailchimp is slow to answer,
  the form falls back to a normal Mailchimp submit in a new tab.
  In Mailchimp itself, two settings matter for people who sign up through the
  hosted landing page and for the email: (1) on the hosted form's confirmation
  thank-you page, redirect to `https://confettiandcopapershop.com/download/`;
  (2) turn on a welcome email (final welcome email or a welcome automation)
  that links to the same page.

### What changed
- **Homepage:** product photos on all occasion tiles, product cards, and blog
  cards (loaded from your Etsy listings); visible H1; shorter meta
  description; "Fan favorites" / "Shop favorite" replaced with honest labels;
  Christmas flagship (Murder at Holly Manor) plus a holiday row and a
  year-round row; "View on Etsy" on every product; signup section with a
  Starter Kit preview and the WELCOME10 offer; bigger footer.
- **Blog:** all four posts expanded (tips, timelines, FAQs), plus a new
  Christmas murder mystery guide and a blog index at `/blog/`. Every post now
  has a hero photo, a product callout, an email signup, related products, and
  BlogPosting structured data for Google.
- **New pages:** `privacy.html` and `blog/index.html`, both in `sitemap.xml`.
- **Click tracking, signup form, and menu code** live in `assets/js/site.js`, shared by every page.

### Seasonal swap calendar (homepage)
Search `index.html` for `SEASONAL` to find the three spots to change: the
pill above the H1, the flagship, and the "More for the holidays" row.

| When | Flagship | Pill / row theme |
|---|---|---|
| Mid-Nov to Dec 25 | Murder at Holly Manor | Christmas + New Year's |
| Dec 26 to Jan 1 | Uncorked (New Year's Eve) | New Year's Eve |
| January to Feb 14 | XOXO, You're Dead | Valentine's / Galentine's |
| Spring | Bridal or Baby Shower bundles | Showers & graduation |
| September to Oct 31 | Haunted Hollow | Halloween |

Also re-submit `sitemap.xml` in Google Search Console after uploading so
Google picks up the new pages.

### Product photos
Photos load straight from Etsy's image server (your own listing photos), so
nothing needs to be uploaded. To change one: open the listing on Etsy,
right-click the main photo → **Copy image address**, and paste it into that
card's `src="..."`. If you ever delete a listing, swap its card too.

### Once you have reviews
Add a short reviews strip under the hero with 3–5 real Etsy review quotes and
your star rating, and change "New for Christmas" to "Bestseller" only once
it's true.

---
  
This is a static (no-database, no-server-code) marketing site built from your
real brand kit: exact colors, Playfair Display/Sacramento/Poppins fonts, your
logo, and your shop banner. It links out to Etsy rather than replicating
checkout — that's what keeps hosting nearly free.

## What's in this folder

```
index.html                          the homepage
blog/host-a-murder-mystery-party.html                        blog post
blog/baby-shower-games-people-actually-want-to-play.html     blog post
blog/backyard-escape-room-kids-birthday.html                 blog post
assets/fonts/                       your brand font files
assets/img/                         your logo + banners
sitemap.xml                         lists all pages for search engines
robots.txt                          tells search engines where to find the sitemap
```

Open `index.html` by double-clicking it to preview the site in your browser
before you do anything else.

## SEO — what's built in, and what still needs you

Included already: a descriptive page title and meta description, Open Graph
tags so links look good when shared, a Store schema (structured data) so
Google understands this is a shop, semantic headings, alt text on images,
a `sitemap.xml` + `robots.txt` pair — all pointing to your real domain,
`confettiandcopapershop.com`.

Still needed:
1. Submit the site to **Google Search Console** (free) and give it your
   sitemap URL, so Google actually crawls it instead of waiting to discover
   it.
2. Keep adding blog posts as you build new products — the three live now
   target "murder mystery dinner party," "baby shower games," and "kids
   birthday escape room" searches. More posts targeting more searches is
   what keeps traffic growing over time; the homepage alone won't rank for
   much.
3. Optional but worth it later: compress the images and convert the fonts to
   `.woff2` for faster load times, which Google's ranking does factor in a
   little.

## Already wired up for you

- **Domain** — canonical URL, Open Graph tags, structured data, `sitemap.xml`,
  and `robots.txt` all point to `confettiandcopapershop.com`.
- **Etsy shop link** — every "Shop on Etsy" / "View full shop" link points to
  `https://confetticopapershop.etsy.com`.
- **Shop-by-occasion cards** — all six link to their real Etsy section URLs
  (Life Milestones, Wedding & Romance, Baby & Gender Reveal, Kids & Family,
  Party Games Bundles, Escape Room & Murder Mystery).
- **Blog content** — all three posts referenced from the homepage are
  written (murder mystery hosting, baby shower games, backyard escape room
  for a kid's birthday), each with a CTA to a real product, and all three
  are listed in `sitemap.xml` so search engines can find them.
- **Pinterest** — footer link points to `https://www.pinterest.com/confetticopapershop/`.
- **Email signup** — the "Get a free printable game" button now links out to
  your Mailchimp Landing Page (`mailchi.mp/07ba28988662/confetti-co-paper-shop`),
  which hosts the actual signup form. This replaced the embedded form that
  used to live directly on the homepage — simpler to maintain, since any
  changes to the form now happen entirely in Mailchimp instead of in this
  site's code. **One thing only you can do:** in Mailchimp, set up an
  **Automation** on this audience so new subscribers actually get a link to
  your download page emailed to them — right now the landing page collects
  the signup but nothing sends automatically. (This also depends on the
  download page itself existing — see the note on the Starter Kit freebie
  below.)

## Still needed before you publish

1. **HTTPS on your domain** — you purchased `http://www.confettiandcopapershop.com/`;
   once DNS is pointed at GitHub Pages (Step 5 below), check **Enforce HTTPS**
   in Settings → Pages so visitors always land on the secure `https://`
   version — GitHub issues the SSL certificate for free automatically.
2. **The Starter Kit freebie itself** — the "5 pages of the shop" free
   printable that was spec'd out hasn't been built as an actual PDF yet, and
   there's no download page on the site to deliver it from. Once the PDF
   exists, a simple `download.html` page (or similar) needs to be added
   linking to it, and your Mailchimp Automation should point there instead
   of attaching the file directly (Mailchimp doesn't support attachments).

## How to actually edit these files

You don't need any special software — every file here is plain text.

- **Quick edits (swap a link, fix a typo, change a price):** open the `.html`
  file in any plain text editor — **Notepad** (Windows), **TextEdit** (Mac,
  switch it to "Plain Text" mode first via Format menu), or **VS Code**
  (free, and gives you syntax highlighting, which makes HTML much easier to
  read — download from code.visualstudio.com if you don't have it). Use
  **Find & Replace** to locate the text you want to change, and type your
  real content in its place. Save the file, then re-upload it to GitHub
  (Step 3 below) to push the change live.
- **Bigger changes (new blog post, new product card):** easiest approach is
  to copy an existing block that already looks right — e.g. duplicate one
  `<a class="product-card">...</a>` block to add a new product — and edit
  the text inside it, rather than writing new HTML from scratch.
- **If you'd rather not hand-edit HTML at all:** you can always paste the
  file content into a Claude chat and ask for the specific change in plain
  English (e.g. "add my Instagram link to the footer") — Claude will make
  the edit and hand back the updated file.
- **Once the site is on GitHub:** you don't have to download and re-upload
  files for small changes. Open the file in your repository on github.com,
  click the pencil icon ("Edit this file"), make your change right in the
  browser, and click **Commit changes**. GitHub Pages updates automatically
  within a minute or two.

## Step-by-step: getting this live for about $12–20/year

### 1. Domain name — ✅ already purchased
You bought `confettiandcopapershop.com`, and the site's SEO tags already
point to it. Nothing to do here yet except Step 5 (connecting DNS).

### 2. Create a free GitHub account (if you don't have one)
- Go to github.com and sign up. This is where the site's files will live and
  where GitHub Pages will serve them from, for free.

### 3. Create a new repository and upload the site
- Click **New repository**, name it anything (e.g. `confetti-co-site`), keep it Public.
- On the repository page, click **Add file → Upload files**, then drag in
  everything from this folder (`index.html`, the `blog/` folder, and the
  `assets/` folder, keeping the folder structure intact).
- Commit the upload.

### 4. Turn on GitHub Pages
- In the repository, go to **Settings → Pages**.
- Under "Build and deployment," set the source to **Deploy from a branch**,
  branch `main`, folder `/ (root)`. Save.
- GitHub gives you a live URL in a minute or two, like
  `https://yourusername.github.io/confetti-co-site/`. Confirm the site loads
  there before moving on.

### 5. Connect your custom domain
- In **Settings → Pages**, enter `confettiandcopapershop.com` in the "Custom
  domain" field and save. GitHub will show you DNS records to add.
- Go to wherever you bought the domain, find **DNS settings**, and add the
  records GitHub showed you (usually a few `A` records pointing to GitHub's
  IP addresses, plus a `CNAME` record for `www`).
- DNS changes can take anywhere from a few minutes to 24 hours to take effect.
- Once it resolves, come back to **Settings → Pages** and check **Enforce
  HTTPS** — this switches visitors from `http://` to the secure `https://`
  version automatically, using a free certificate GitHub issues for you.

### 6. Email capture — ✅ linked to your Mailchimp Landing Page
The "Get a free printable game" button on the homepage links straight to
your Mailchimp Landing Page, which hosts the actual signup form. Two things
still needed on the Mailchimp side: (1) build the Starter Kit PDF and a
download page on this site for it to point to — Mailchimp doesn't support
attachments, so the automation needs a link, not a file; (2) once that page
exists, set up an **Automation** in Mailchimp on this audience so new
subscribers instantly get an email with a link to it. Right now the landing
page collects signups but nothing sends automatically until that automation
exists.

### 7. Pinterest — ✅ linked
Your Pinterest profile (`pinterest.com/confetticopapershop`) is already linked in the footer.
Once the site is live, you can also start sending some pin traffic to blog
posts here instead of straight to Etsy — the post can then link onward to
the Etsy listing. That gives you a page you fully control for SEO, while
still sending buyers to Etsy to check out.

## Ongoing cost recap

| Item | Cost |
|---|---|
| Domain name | ~$12–20/year |
| GitHub Pages hosting | $0 |
| Mailchimp (up to 500 contacts) | $0 |
| **Total** | **~$12–20/year** |

If you outgrow the Mailchimp free tier or want a drag-and-drop editor instead
of hand-editing HTML, Squarespace ($16–36/month) is the natural next step —
but this bare-bones version is a fine place to prove out whether the traffic
funnel converts before spending more.
