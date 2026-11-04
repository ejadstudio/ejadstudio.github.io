/* EJAD Studio v2 — interactions. All text/data lives in js/content.js */
(() => {
  const D = window.EJAD;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} }
  };
  // shared state read by three-icons.js
  const S = window.EJAD_STATE = { mx: 0, my: 0, processP: 0, reduce };

  /* ---------- language ---------- */
  const qs = new URLSearchParams(location.search).get("lang");
  let lang = qs === "en" || qs === "ar" ? qs : store.get("ejad-lang") || "ar";
  const t = (k) => (D.ui[k] ? D.ui[k][lang] : k);
  const L = (o) => (o && typeof o === "object" && !Array.isArray(o) ? o[lang] : o);
  const dir = () => (lang === "ar" ? 1 : -1); // RTL content overflows to the left → translate +x

  let introDone = false;

  function applyLang() {
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = lang === "ar" ? "إيجاد | استوديو إبداعي سعودي" : "EJAD Studio | A Saudi creative studio";
    $$("[data-i18n]").forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    $$(".slice").forEach(splitSlice);
    $$("[data-words]").forEach(splitWords);
    splitHeads();
    renderTicker(); renderGrid(); renderReels(); renderProcess(); renderServices(); renderOrbit(); renderContact();
    observe();
    requestAnimationFrame(() => { measure(); onScroll(); });
  }

  /* ---------- text effects ---------- */
  function splitSlice(el) {
    const h = el.innerHTML;
    el.innerHTML = `<span class="sl sl--1">${h}</span><span class="sl sl--2" aria-hidden="true">${h}</span><span class="sl sl--3" aria-hidden="true">${h}</span>`;
  }
  function splitWords(el) {
    const wrap = (txt) => txt.split(/(\s+)/).map((w) => (w.trim() ? `<span class="w">${w}</span>` : w)).join("");
    el.innerHTML = [...el.childNodes].map((n) => {
      if (n.nodeType === 3) return wrap(n.textContent);
      const tag = n.tagName.toLowerCase();
      return `<${tag}>${wrap(n.textContent)}</${tag}>`;
    }).join("");
  }

  /* two-line heading (light + bold) that fills with the scroll.
     A clipped gradient, not per-letter spans, so Arabic letters stay joined. */
  let heads = [];
  function splitHeads() {
    heads = $$(".hl").map((el) => {
      const [a, b = ""] = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = `<span class="hl__a">${a}</span><span class="hl__b">${b}</span>`;
      return { el, a: el.children[0], b: el.children[1], p: -1 };
    });
  }
  function updateHeads() {
    heads.forEach((h) => {
      const top = h.el.getBoundingClientRect().top;
      const p = clamp((vh * 0.94 - top) / (vh * 0.5));
      if (Math.abs(p - h.p) < 0.004) return;
      h.p = p;
      h.a.style.setProperty("--f", (clamp(p / 0.55) * 100).toFixed(1) + "%");
      h.b.style.setProperty("--f", (clamp((p - 0.45) / 0.55) * 100).toFixed(1) + "%");
    });
  }

  /* ---------- sector ticker: only sectors already in content.js ---------- */
  function renderTicker() {
    const list = [...new Set(D.projects.map((p) => L(p.sector)))];
    const group = `<span>${list.map((x) => `${x} <b>/</b> `).join("")}</span>`;
    $("[data-ticker]").innerHTML = group + group;
  }

  /* ---------- words orbiting the 3D blocks ---------- */
  let orbitWords = [], orbitOn = false;
  function renderOrbit() {
    const list = [...new Set(D.projects.flatMap((p) => L(p.services)))].slice(0, innerWidth < 640 ? 6 : 12);
    const box = $("[data-orbit]");
    box.innerHTML = list.map((x) => `<span>${x}</span>`).join("");
    // one evenly spaced ring around the object: words never overlap it or each other
    orbitWords = $$("span", box).map((el, i) => ({ el, a: (i / list.length) * Math.PI * 2 }));
    drawOrbit(reduce ? 0.6 : performance.now() / 1000);
  }
  function drawOrbit(t) {
    const box = $("[data-orbit]"), rx = Math.max(70, box.clientWidth / 2 - 52), ry = box.clientHeight * 0.36;
    orbitWords.forEach((w) => {
      const a = w.a + t * 0.12 + S.mx * 0.3;
      const d = (Math.sin(a) + 1) / 2; // bottom of the ring = near, top = far
      w.el.style.transform = `translate3d(${(Math.cos(a) * rx).toFixed(1)}px, ${(Math.sin(a) * ry).toFixed(1)}px, 0) translate(-50%, -50%) scale(${(0.82 + d * 0.28).toFixed(3)})`;
      w.el.style.opacity = (0.32 + d * 0.68).toFixed(2);
    });
  }
  function orbitLoop(now) {
    if (!orbitOn) return;
    drawOrbit(now / 1000);
    requestAnimationFrame(orbitLoop);
  }
  if (!reduce) new IntersectionObserver(([e]) => {
    const was = orbitOn; orbitOn = e.isIntersecting;
    if (orbitOn && !was) requestAnimationFrame(orbitLoop);
  }).observe($(".orbit"));

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
  function observe() {
    $$(".reveal:not(.in), .slice:not(.in), .card:not(.in)").forEach((el) => {
      if (reduce) return el.classList.add("in");
      if (el.closest(".hero") && !introDone) return;
      io.observe(el);
    });
  }

  /* ---------- stage (hero columns → nav) ---------- */
  const stage = $("[data-stage]"), hero = $("[data-hero]");
  function renderHero() {
    const box = $("[data-hero-media]");
    box.innerHTML = D.hero.video
      ? `<video autoplay muted loop playsinline preload="auto" poster="${D.hero.image}"><source src="${D.hero.video}" type="video/mp4"></video>`
      : `<img src="${D.hero.image}" alt="" fetchpriority="high">`;
  }
  let vh = innerHeight, bar = 64, heroWant = true;
  function updateStage(y) {
    const range = Math.max(1, vh - bar);
    const p = clamp(y / range);
    stage.style.setProperty("--sh", Math.max(bar, vh - y) + "px");
    stage.style.setProperty("--p", p.toFixed(4));
    stage.style.setProperty("--lp", clamp((p - 0.62) / 0.38).toFixed(3));
    stage.classList.toggle("is-docked", p >= 0.98);
    const hv = stage.querySelector("video");
    if (hv) {
      const want = p < 0.98;
      if (want !== heroWant) { heroWant = want; want ? hv.play().catch(() => {}) : hv.pause(); }
    }
    const ho = 1 - clamp(p * 1.9);
    hero.style.setProperty("--ho", ho.toFixed(3));
    hero.style.setProperty("--hpe", ho < 0.5 ? "none" : "auto");
  }

  /* ---------- work: editorial staggered grid (Storck + Flatline + LiveMe5ive) ---------- */
  const strips = `<span class="card__strips" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;
  const pad = (n) => String(n).padStart(2, "0");
  function chapter(p, i, all) {
    const pos = p.pos || [];
    const bigs = all.filter((x) => !x.lab), labs = all.filter((x) => x.lab);
    const k = p.lab ? labs.indexOf(p) : bigs.indexOf(p);
    const cls = p.lab
      ? `pj--lab${k % 2 ? " pj--drop" : ""}${k === labs.length - 1 && labs.length % 2 ? " pj--solo" : ""}`
      : `pj--big${k % 2 ? " pj--alt" : ""}`;
    const imgs = p.images.map((src, n) => `<img class="pj__img${n ? "" : " is-on"}" src="${src}" alt="${n ? "" : L(p.title)}" ${n ? 'loading="lazy"' : ""} decoding="async" style="object-position:${pos[n] || "50% 50%"}">`).join("");
    const bars = p.images.length > 1 ? `<span class="pj__bars" aria-hidden="true">${p.images.map((_, n) => `<i${n ? "" : ' class="is-on"'}></i>`).join("")}</span>` : "";
    return `<article class="card pj ${cls}" data-id="${p.id}">
      <div class="pj__media">${imgs}
        <img class="pj__logo" src="${p.logo}" alt="" loading="lazy">${bars}${strips}
      </div>
      <div class="pj__meta">
        <span class="pj__num" aria-hidden="true">${pad(i + 1)}</span>
        <div class="pj__text">
          <p class="pj__sector">${L(p.sector)}${p.lab ? `<span class="ch__lab">Brand Lab</span>` : ""}</p>
          <h3 class="pj__title">${L(p.title)}</h3>
          <p class="pj__desc">${L(p.desc)}</p>
          <p class="pj__did">${t("work.did")}</p>
          <ul class="pj__tags">${L(p.services).map((x, n) => `<li style="--i:${n}">${x}</li>`).join("")}</ul>
        </div>
      </div>
    </article>`;
  }
  // brands with more than one strong image: swap every 2s while on screen
  setInterval(() => {
    if (document.hidden || reduce) return;
    $$(".pj").forEach((el) => {
      const imgs = $$(".pj__img", el);
      if (imgs.length < 2) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const k = imgs.findIndex((im) => im.classList.contains("is-on")), nx = (k + 1) % imgs.length;
      imgs[k].classList.remove("is-on"); imgs[nx].classList.add("is-on");
      $$(".pj__bars i", el).forEach((b, n) => b.classList.toggle("is-on", n === nx));
    });
  }, 2000);
  function reelCard(r, i) {
    return `<article class="card card--reel" data-id="${r.id}">
      <div class="card__frame">
        <div class="card__media">
          <img src="${r.cover}" alt="${L(r.title)}" loading="lazy">
          <span class="card__play" aria-hidden="true"></span>
          ${strips}
          <button class="card__btn" type="button" data-play="${r.id}" data-cursor="${t("card.play")}" aria-label="${t("card.play")}: ${L(r.title)}"></button>
        </div>
        <span class="card__n">${pad(i + 1)}</span>
      </div>
      <div class="card__meta"><h3 class="card__title">${L(r.title)}</h3></div>
    </article>`;
  }
  function renderGrid() { $("[data-grid]").innerHTML = D.projects.map(chapter).join(""); }

  /* ---------- reels: free horizontal strip (drag, arrows, scroll-snap) ---------- */
  const track = $("[data-track]");
  function renderReels() { track.innerHTML = D.reels.map(reelCard).join(""); track.scrollLeft = 0; reelArrows(); }
  const reelStep = () => { const c = $(".card", track); return c ? c.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0) : 300; };
  function reelArrows() {
    const max = track.scrollWidth - track.clientWidth, pos = Math.abs(track.scrollLeft);
    $$("[data-reel-step]").forEach((b) => { b.disabled = b.dataset.reelStep === "-1" ? pos < 4 : pos > max - 4; });
  }
  $$("[data-reel-step]").forEach((b) => b.addEventListener("click", () => {
    // RTL: forward is towards the left (negative scrollLeft)
    track.scrollBy({ left: +b.dataset.reelStep * reelStep() * (lang === "ar" ? -1 : 1), behavior: reduce ? "auto" : "smooth" });
  }));
  track.addEventListener("scroll", () => requestAnimationFrame(reelArrows), { passive: true });
  // mouse drag (touch already scrolls natively)
  let drag = null;
  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || e.target.closest("video")) return;
    drag = { x: e.clientX, left: track.scrollLeft, moved: false };
  });
  addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; track.classList.add("is-drag"); }
    if (drag.moved) track.scrollLeft = drag.left - dx;
  });
  const endDrag = () => {
    if (!drag) return;
    const moved = drag.moved; drag = null;
    if (!moved) return;
    track.classList.remove("is-drag");
    // swallow the click that follows a drag so it doesn't start a reel
    const eat = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
    addEventListener("click", eat, { capture: true, once: true });
    setTimeout(() => removeEventListener("click", eat, { capture: true }), 60);
  };
  addEventListener("pointerup", endDrag); addEventListener("pointercancel", endDrag);
  track.addEventListener("dragstart", (e) => e.preventDefault());
  document.addEventListener("click", (e) => {
    const p = e.target.closest("[data-play]");
    if (p) {
      const reel = D.reels.find((r) => r.id === p.dataset.play), card = p.closest(".card");
      stopReels(card);
      const v = document.createElement("video");
      Object.assign(v, { src: reel.src, poster: reel.cover, controls: true, playsInline: true, preload: "auto" });
      v.setAttribute("playsinline", "");
      $(".card__media", card).appendChild(v);
      card.classList.add("is-playing");
      v.play().catch(() => {});
      cursorOff();
      return;
    }
  });
  function stopReels(except) {
    $$(".card.is-playing").forEach((c) => {
      if (c === except) return;
      const v = $("video", c); if (v) { v.pause(); v.remove(); }
      c.classList.remove("is-playing");
    });
  }

  /* ---------- process: big outlined words that fill with the scroll ---------- */
  let stepRows = [];
  function renderProcess() {
    const box = $("[data-steps]");
    box.innerHTML = D.process.map((s, i) =>
      `<li class="step"><span class="step__n">0${i + 1}</span><h3 class="step__word">${s[lang]}</h3><p>${lang === "ar" ? s.dar : s.den}</p></li>`).join("");
    stepRows = $$(".step", box).map((el) => ({ el, word: $(".step__word", el), p: -1 }));
  }
  function updateSteps() {
    stepRows.forEach((r) => {
      const top = r.word.getBoundingClientRect().top;
      const p = clamp((vh * 0.82 - top) / (vh * 0.34));
      if (Math.abs(p - r.p) < 0.004) return;
      r.p = p;
      r.word.style.setProperty("--f", (p * 100).toFixed(1) + "%");
      r.el.classList.toggle("on", p > 0.5);
    });
  }

  /* ---------- services (3D icons) ---------- */
  const icons = ["prism", "blocks", "ring"];
  function renderServices() {
    $("[data-services]").innerHTML = D.services.map((s, i) => `
      <div class="svc reveal" style="--d:${i * 0.08}s">
        <div class="svc__icon obj" data-obj="${icons[i]}" aria-hidden="true"></div>
        <div><span class="svc__n">0${i + 1}</span><h3>${s[lang]}</h3></div>
        <p>${lang === "ar" ? s.dar : s.den}</p>
      </div>`).join("");
    window.dispatchEvent(new Event("ejad:objects"));
  }

  /* ---------- clients (Tequila logo grid) ---------- */
  const logoHTML = (c) => `<span class="cell__logo" role="img" aria-label="${c.name}" style="-webkit-mask-image:url('${c.logo}');mask-image:url('${c.logo}')"></span>`;
  const LAB_CELLS = 4;
  function renderClients() {
    const cellHTML = (c) => `<div class="cell">${logoHTML(c)}</div>`;
    $("[data-partners]").innerHTML = D.partners.map(cellHTML).join("");
    $("[data-logos]").innerHTML = D.lab.slice(0, LAB_CELLS).map(cellHTML).join("");
    $$(".clients .cell").forEach((cell) => cell.addEventListener("mousemove", (e) => {
      const r = cell.getBoundingClientRect();
      cell.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      cell.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    }));
  }
  // Brand Lab: one cell swaps to the next waiting logo every 2s while the grid is on screen
  let labNext = LAB_CELLS % D.lab.length, labCell = 0;
  setInterval(() => {
    if (document.hidden || reduce || D.lab.length <= LAB_CELLS) return;
    const grid = $("[data-logos]"), r = grid.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const cell = $$(".cell", grid)[labCell], old = $(".cell__logo:not(.is-leaving)", cell);
    cell.insertAdjacentHTML("beforeend", logoHTML(D.lab[labNext]));
    const nu = cell.lastElementChild;
    nu.classList.add("is-entering");
    if (old) { old.classList.add("is-leaving"); setTimeout(() => old.remove(), 900); }
    requestAnimationFrame(() => requestAnimationFrame(() => nu.classList.remove("is-entering")));
    labCell = (labCell + 1) % LAB_CELLS;
    // next logo = the first one not already visible in the grid
    const shown = $$(".cell__logo:not(.is-leaving)", grid).map((el) => el.getAttribute("aria-label"));
    let guard = 0;
    do { labNext = (labNext + 1) % D.lab.length; } while (shown.includes(D.lab[labNext].name) && ++guard < D.lab.length);
  }, 2000);

  /* ---------- contact ---------- */
  function renderContact() {
    const c = D.contact;
    const links = [
      `<a class="pill pill--main magnetic" href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener">${t("contact.whatsapp")} <small>${c.phoneDisplay}</small></a>`,
      `<a class="pill magnetic" href="mailto:${c.email}">${t("contact.email")} <small>${c.email}</small></a>`
    ];
    if (c.instagram) links.push(`<a class="pill magnetic" href="${c.instagram}" target="_blank" rel="noopener">${t("contact.instagram")} <small>${c.handle || "↗"}</small></a>`);
    if (c.tiktok) links.push(`<a class="pill magnetic" href="${c.tiktok}" target="_blank" rel="noopener">${t("contact.tiktok")} <small>${c.handle || "↗"}</small></a>`);
    $("[data-contact]").innerHTML = links.join("");
    bindMagnetic($("[data-contact]"));
  }

  /* ---------- language button ---------- */
  $(".lang").addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar";
    store.set("ejad-lang", lang);
    stopReels();
    applyLang();
  });

  /* ---------- scroll-driven ---------- */
  const proc = $("[data-process]"), cue = $(".scrollcue");
  function measure() {
    vh = innerHeight;
    bar = parseFloat(getComputedStyle(root).getPropertyValue("--bar")) || 64;
    stage.style.setProperty("--vh", vh + "px");
  }
  const navCols = $$(".stage__cols .col:not(.col--home)").map((c) => [c, $(c.getAttribute("href"))]);
  function onScroll() {
    const y = scrollY;
    updateStage(y);
    // nav: page progress + active section
    stage.style.setProperty("--sp", clamp(y / Math.max(1, root.scrollHeight - vh)).toFixed(4));
    let act = null;
    navCols.forEach(([col, sec]) => { if (sec && sec.getBoundingClientRect().top < vh * 0.45) act = col; });
    navCols.forEach(([col]) => col.classList.toggle("is-active", col === act));
    // statement words: blur → sharp (Flatline)
    $$("[data-words]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const p = clamp((vh * 0.82 - r.top) / (r.height + vh * 0.3));
      const ws = $$(".w", el), n = Math.round(p * ws.length);
      ws.forEach((w, i) => w.classList.toggle("on", i < n));
    });
    cue.classList.toggle("is-end", y > root.scrollHeight - vh * 1.6);
    if (reduce) { S.processP = 1; return; }
    updateHeads();
    updateSteps();
    // bars build as the process section comes in
    S.processP = clamp((vh * 0.85 - proc.getBoundingClientRect().top) / (vh * 0.75));
  }
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  let rw = innerWidth;
  addEventListener("resize", () => {
    if (innerWidth === rw && Math.abs(innerHeight - vh) < 120) return; // ignore mobile URL-bar jitter
    rw = innerWidth; measure(); onScroll(); reelArrows(); drawOrbit(performance.now() / 1000);
  });

  /* ---------- cursor + magnetic (Nuwebu) ---------- */
  const cur = $(".cursor"), label = $(".cursor__label");
  function cursorOff() { cur.classList.remove("is-big"); }
  function bindMagnetic(rootEl = document) {
    if (!fine || reduce) return;
    $$(".magnetic", rootEl).forEach((el) => {
      if (el.dataset.mag) return;
      el.dataset.mag = 1;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.32}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }
  let px = innerWidth / 2, py = innerHeight / 2, qx = px, qy = py;
  addEventListener("pointermove", (e) => {
    px = e.clientX; py = e.clientY;
    S.mx = e.clientX / innerWidth - 0.5; S.my = e.clientY / innerHeight - 0.5;
  }, { passive: true });
  if (fine) {
    document.addEventListener("mouseover", (e) => {
      const h = e.target.closest("[data-cursor]");
      if (h && !h.closest(".is-playing")) { label.textContent = h.dataset.cursor; cur.classList.add("is-big"); } else cursorOff();
    });
    (function move() {
      qx += (px - qx) * (reduce ? 1 : 0.2); qy += (py - qy) * (reduce ? 1 : 0.2);
      cur.style.transform = `translate3d(${qx}px, ${qy}px, 0)`;
      requestAnimationFrame(move);
    })();
  }

  /* ---------- intro (Cenima) ---------- */
  function finishIntro() {
    if (introDone) return;
    introDone = true;
    document.body.classList.remove("is-loading");
    $$(".hero .slice, .hero .reveal").forEach((el) => el.classList.add("in"));
    S.ready = true;
    window.dispatchEvent(new Event("ejad:ready"));
  }
  // fonts first so the hero title never swaps typeface (jump) right after it appears
  const fontsReady = () => Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 900))]);
  function runIntro() {
    const intro = $(".intro");
    let seen = false;
    try { seen = sessionStorage.getItem("ejad-intro") === "1"; sessionStorage.setItem("ejad-intro", "1"); } catch {}
    if (reduce || seen) { intro.remove(); fontsReady().then(finishIntro); return; }
    const close = () => {
      if (intro.dataset.closing) return;
      intro.dataset.closing = 1;
      intro.classList.add("is-closing");
      setTimeout(() => { intro.classList.add("is-open"); finishIntro(); }, 650);
      setTimeout(() => intro.remove(), 1500);
    };
    intro.addEventListener("click", close);
    // close after the mark has formed, but never before the fonts are in
    Promise.all([fontsReady(), new Promise((r) => setTimeout(r, 1900))]).then(close);
  }

  /* ---------- init ---------- */
  renderHero();
  renderClients();
  applyLang();
  bindMagnetic();
  runIntro();
})();
