/* =====================================================================
   Confetti & Co. — shared site script (loaded on every page)

   ANALYTICS: Google Analytics 4 (G-88L5MNETH3) is loaded by the Google tag
   (Tag Manager container GTM-5VGX4RQX) pasted at the top of every page's
   <head>. That container already records page views, so this file does NOT
   load GA4 again (that would double-count visits). It only sends extra
   click events through the gtag() function the Google tag defines:
     etsy_click   – any click to Etsy (with site_section = where it came from)
     signup_click – any click to the Mailchimp landing page
     sign_up      – inline email form submitted
   Find them in GA4 under Reports → Engagement → Events.

   MAILCHIMP_FORM_ACTION — the embedded-form address from Mailchimp. Once set,
   the inline signup form replaces the "Get My Free Printable" button.
   ===================================================================== */
var MAILCHIMP_FORM_ACTION = "https://mozmail.us1.list-manage.com/subscribe/post?u=77f782edab069ecd170712824&id=86839ef3bf&f_id=00e429e1f0";

(function () {
  /* ---------- Track every click out to Etsy / Mailchimp ----------
     Shows up in GA4 as the event "etsy_click" (or "signup_click"), with the
     page section the click came from — so you can see which parts of the
     site actually send buyers to Etsy. */
  function sectionOf(el) {
    var sec = el.closest("[data-track], section, header, footer, article");
    if (!sec) return "page";
    return sec.getAttribute("data-track") || sec.id || sec.tagName.toLowerCase();
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || !window.gtag) return;
    var href = a.href;
    var name = null;
    if (/etsy\.com/.test(href)) name = "etsy_click";
    else if (/mailchi\.mp|list-manage\.com/.test(href)) name = "signup_click";
    if (!name) return;
    gtag("event", name, {
      link_url: href,
      link_text: (a.innerText || a.getAttribute("aria-label") || "").trim().slice(0, 80),
      site_section: sectionOf(a),
      page_path: location.pathname
    });
  });

  /* ---------- Inline Mailchimp signup (only once the action URL is set) ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var forms = document.querySelectorAll("form.mc-form");
    var fallbacks = document.querySelectorAll(".mc-fallback");
    if (!MAILCHIMP_FORM_ACTION) return; // keep the button version
    forms.forEach(function (f) {
      f.action = MAILCHIMP_FORM_ACTION;
      f.hidden = false;
      f.addEventListener("submit", function () {
        if (window.gtag) gtag("event", "sign_up", { method: "mailchimp_inline", site_section: sectionOf(f) });
      });
    });
    fallbacks.forEach(function (b) { b.hidden = true; });
  });

  /* ---------- Footer year + mobile menu ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (toggle && links) {
      toggle.addEventListener("click", function () { links.classList.toggle("open"); });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { links.classList.remove("open"); });
      });
    }
  });
})();
