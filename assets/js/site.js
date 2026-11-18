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

  /* ---------- Inline Mailchimp signup ----------
     Submits in the background (Mailchimp's post-json endpoint), so visitors
     never see Mailchimp's own pages. On success they go straight to
     /download/ (Starter Kit + WELCOME10 code). If Mailchimp doesn't answer
     within 7 seconds, the form falls back to a normal submit in a new tab. */
  var THANK_YOU_URL = "/download/";
  function setMsg(f, text, ok) {
    var m = f.querySelector(".mc-msg");
    if (!m) { m = document.createElement("p"); m.className = "mc-msg"; m.setAttribute("role", "status"); f.appendChild(m); }
    m.textContent = text;
    m.style.cssText = "flex-basis:100%; margin:6px 0 0; font-size:.9rem; font-weight:600;" + (ok ? "" : "color:#3E3A34; background:#FBF4E9; padding:8px 12px; border-radius:6px;");
  }
  function jsonpSubmit(f) {
    var btn = f.querySelector("button[type=submit]");
    var cb = "mcCb" + Date.now();
    var params = new URLSearchParams(new FormData(f));
    params.set("c", cb);
    var url = MAILCHIMP_FORM_ACTION.replace("/subscribe/post?", "/subscribe/post-json?") + "&" + params.toString();
    var done = false, script = document.createElement("script");
    function cleanup() { try { delete window[cb]; } catch (e) { window[cb] = undefined; } script.remove(); if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; } }
    function fallback() { if (done) return; done = true; cleanup(); f.target = "_blank"; HTMLFormElement.prototype.submit.call(f); }
    if (btn) { btn.dataset.label = btn.dataset.label || btn.textContent; btn.disabled = true; btn.textContent = "Sending\u2026"; }
    window[cb] = function (resp) {
      if (done) return; done = true; cleanup();
      var msg = (resp && resp.msg ? String(resp.msg) : "").replace(/<[^>]+>/g, "").replace(/^\d+ - /, "");
      if (resp && resp.result === "success") {
        if (window.gtag) gtag("event", "sign_up", { method: "mailchimp_inline", site_section: sectionOf(f) });
        setMsg(f, "You're on the list! Taking you to your free printable\u2026", true);
        setTimeout(function () { location.href = THANK_YOU_URL; }, 900);
      } else if (/already subscribed/i.test(msg)) {
        setMsg(f, "You're already on the list. Here's your free printable\u2026", true);
        setTimeout(function () { location.href = THANK_YOU_URL; }, 1200);
      } else {
        setMsg(f, msg || "Something went wrong. Please check your email address and try again.", false);
      }
    };
    script.onerror = fallback;
    setTimeout(fallback, 7000);
    script.src = url;
    document.body.appendChild(script);
  }
  document.addEventListener("DOMContentLoaded", function () {
    var forms = document.querySelectorAll("form.mc-form");
    var fallbacks = document.querySelectorAll(".mc-fallback");
    if (!MAILCHIMP_FORM_ACTION) return; // keep the button version
    forms.forEach(function (f) {
      f.action = MAILCHIMP_FORM_ACTION;
      f.removeAttribute("target");
      f.hidden = false;
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        jsonpSubmit(f);
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
