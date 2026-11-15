// Template 4: GSAP + ScrollTrigger. Does nothing (page stays a stacked, readable page)
// when motion is reduced, JS-state class is missing, or the libraries failed to load.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains("js")) return;
  if (!window.gsap || !window.ScrollTrigger) { root.classList.remove("js"); return; }
  gsap.registerPlugin(ScrollTrigger);
  var EASE = "power4.out"; // close to cubic-bezier(0.25, 1, 0.5, 1)

  // (a) Split headings by word and reveal each once, rising and fading.
  function splitWords(el) {
    var text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.textContent = "";
    text.split(/ +/).forEach(function (word, i, all) {
      var w = document.createElement("span"); w.className = "w"; w.setAttribute("aria-hidden", "true");
      var wi = document.createElement("span"); wi.className = "wi"; wi.textContent = word;
      w.appendChild(wi); el.appendChild(w);
      if (i < all.length - 1) el.appendChild(document.createTextNode(" "));
    });
    el.classList.add("is-split");
    return el.querySelectorAll(".wi");
  }
  document.querySelectorAll("[data-split]").forEach(function (h) {
    var words = splitWords(h);
    var isHero = !!h.closest(".hero");
    gsap.fromTo(words, { yPercent: 115, opacity: 0 }, {
      yPercent: 0, opacity: 1, duration: 1.1, ease: EASE, stagger: 0.07,
      delay: isHero ? 0.15 : 0,
      scrollTrigger: isHero ? null : { trigger: h, start: "top 85%", once: true }
    });
  });
  document.querySelectorAll("[data-rise]").forEach(function (p) {
    var inHero = !!p.closest(".hero");
    gsap.fromTo(p, { y: 22, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: EASE, delay: inHero ? 0.7 : 0.15,
      scrollTrigger: inHero ? null : { trigger: p, start: "top 90%", once: true }
    });
  });

  // (c) First-screen background scrubs with scroll: photo scale and position, shade lifts.
  gsap.fromTo(".hero__bg", { scale: 1.28, yPercent: -2 }, {
    scale: 1, yPercent: 10, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.fromTo(".hero__shade", { opacity: 0.84 }, {
    opacity: 0.55, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.fromTo(".hero__ring", { scale: 0.9 }, {
    scale: 1.25, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  // (b) Pinned scene: the screen holds while the three principles change in turn.
  var section = document.querySelector(".pillars");
  var items = Array.prototype.slice.call(document.querySelectorAll("#plList .pl__item"));
  var dots = document.querySelectorAll("#plDots i");
  var num = document.getElementById("plNum");
  var arc = document.getElementById("plArc");
  var current = 0;
  function setActive(i) {
    if (i === current) return;
    current = i;
    items.forEach(function (it, k) { it.classList.toggle("is-on", k === i); });
    dots.forEach(function (d, k) { d.classList.toggle("on", k === i); });
    gsap.fromTo(num, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE });
    num.textContent = "0" + (i + 1);
    gsap.fromTo(".diamond__in img", { scale: 1.08 }, { scale: 1, duration: 0.9, ease: EASE });
  }
  if (section && items.length) {
    section.classList.add("is-pin");
    ScrollTrigger.create({
      trigger: section, start: "top top", end: function () { return "+=" + window.innerHeight * 2.4; },
      pin: true, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: function (self) {
        var p = self.progress;
        setActive(Math.min(items.length - 1, Math.floor(p * items.length)));
        // Ring arc draws from 1/3 to full as the scene advances.
        arc.setAttribute("stroke-dashoffset", String(1 - (0.34 + 0.66 * p)));
      }
    });
  }

  // Shapes in the facilities section rise in once.
  gsap.from(".sh", {
    opacity: 0, scale: 0.88, duration: 1.1, ease: EASE, stagger: 0.12,
    scrollTrigger: { trigger: ".shapes", start: "top 80%", once: true }
  });

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
