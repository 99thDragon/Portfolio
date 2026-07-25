/* ============================================================
   ERASMO CONCEPCION — Portfolio interactions
   Patterns adapted from the user's own ui-animation-library
   (orig. thelinestudio.com): FPS preloader, Lenis smooth
   scroll, split-line reveals, sticky cursor, studio clock,
   sound equalizer, fullscreen nav.

   Progressive enhancement: the page is fully readable with no
   JS and with reduced motion. Motion only turns on when GSAP
   is present AND the user hasn't asked for reduced motion.
   ============================================================ */

(function () {
    "use strict";

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const HAS_GSAP = typeof window.gsap !== 'undefined';
    const HAS_LENIS = typeof window.Lenis !== 'undefined';
    const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;
    const ENHANCED = HAS_GSAP && !REDUCED;

    const html = document.documentElement;
    if (!HAS_GSAP) html.classList.add('no-gsap');

    /* -------- split text into masked lines (adapted from split-lines.js) ---- */
    function splitLines(el) {
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = words.map(w => `<span class="sl-word">${w}</span>`).join(' ');
        const wordEls = [...el.querySelectorAll('.sl-word')];
        const lines = [];
        let top = null;
        for (const w of wordEls) {
            if (w.offsetTop !== top) { top = w.offsetTop; lines.push([]); }
            lines[lines.length - 1].push(w.textContent);
        }
        el.innerHTML = lines
            .map(l => `<span class="sl-mask"><span class="sl-line">${l.join(' ')}</span></span>`)
            .join(' ');
        return [...el.querySelectorAll('.sl-line')];
    }

    /* -------- Studio clock (adapted from clock.js) — NYC hours ------------- */
    function initClock() {
        const el = document.getElementById('studio-clock');
        if (!el) return;
        el.innerHTML =
            '<span class="studio-clock__dot"></span><span class="studio-clock__label"></span><span class="studio-clock__time"></span>';
        const labelEl = el.querySelector('.studio-clock__label');
        const timeEl = el.querySelector('.studio-clock__time');
        const OPEN = 9, CLOSE = 18, TZ = 'America/New_York';
        const fmt = h => (h % 12 || 12) + (h < 12 ? 'AM' : 'PM');
        function tick() {
            const parts = new Intl.DateTimeFormat('en-GB', {
                timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: false
            }).formatToParts(new Date());
            const hour = +parts.find(p => p.type === 'hour').value;
            const hhmm = parts.filter(p => p.type === 'hour' || p.type === 'minute' || p.type === 'literal')
                .map(p => p.value).join('');
            const open = hour >= OPEN && hour < CLOSE;
            labelEl.textContent = open ? 'Open' : 'Closed';
            timeEl.textContent = ` (${fmt(OPEN)}—${fmt(CLOSE)}) NYC ${hhmm}`;
            el.classList.toggle('is-open', open);
        }
        tick();
        setInterval(tick, 30000);
    }

    /* -------- Sound equalizer (adapted from equalizer.js) — the "voice" -----*/
    function initEqualizer() {
        const el = document.getElementById('voice-eq');
        if (!el) return;
        const BARS = 16;
        el.classList.add('sound-eq');
        el.innerHTML = Array.from({ length: BARS }, () => '<span class="sound-eq__bar"></span>').join('');
        const bars = [...el.querySelectorAll('.sound-eq__bar')];
        if (!ENHANCED) {
            // static frozen waveform
            bars.forEach((b, i) => { b.style.transform = `scaleY(${(0.2 + 0.6 * Math.abs(Math.sin(i * 0.7))).toFixed(2)})`; });
            return;
        }
        let running = true, timer;
        (function dance() {
            if (!running) return;
            for (const b of bars) b.style.transform = `scaleY(${(0.12 + Math.random() * 0.88).toFixed(2)})`;
            timer = setTimeout(dance, 130);
        })();
        // pause when tab hidden (perf)
        document.addEventListener('visibilitychange', () => {
            running = !document.hidden;
            if (running) { clearTimeout(timer); (function d() { if (!running) return; for (const b of bars) b.style.transform = `scaleY(${(0.12 + Math.random() * 0.88).toFixed(2)})`; timer = setTimeout(d, 130); })(); }
        });
    }

    /* -------- Fullscreen nav (adapted from nav-overlay.js) ------------------ */
    function initNav() {
        const btn = document.getElementById('menu-btn');
        if (!btn) return;
        const links = [
            { label: 'Home', href: '#top' },
            { label: 'The Thread', href: '#thread' },
            { label: 'Work', href: '#work' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' }
        ];
        const nav = document.createElement('nav');
        nav.className = 'fnav';
        nav.setAttribute('aria-hidden', 'true');
        nav.innerHTML = `<ul class="fnav__list">${links.map(l => `
            <li class="fnav__item"><a class="fnav__link" href="${l.href}">
              <span class="fnav__dot"></span><span class="fnav__label">${l.label}</span>
            </a><i class="fnav__slash">/</i></li>`).join('')}</ul>`;
        document.body.appendChild(nav);
        let open = false;

        // Pure CSS-driven open/close (transform + staggered items via CSS) —
        // robust and dependency-free; the panel is the one piece of critical
        // UI, so it must not rely on GSAP.
        function setOpen(state) {
            open = state;
            btn.classList.toggle('is-open', open);
            html.classList.toggle('nav-open', open);
            nav.setAttribute('aria-hidden', String(!open));
            btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        }
        btn.addEventListener('click', () => setOpen(!open));
        nav.querySelectorAll('.fnav__link').forEach(a =>
            a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) setOpen(false); });
    }

    /* -------- Sticky cursor (adapted from cursor.js) ------------------------ */
    function initCursor() {
        if (!ENHANCED || !FINE_POINTER) return;
        html.classList.add('has-cursor');
        const el = document.createElement('div');
        el.className = 'cursor';
        el.setAttribute('aria-hidden', 'true');
        el.innerHTML = '<span class="cursor__dot"></span><span class="cursor__label"></span>';
        document.body.appendChild(el);
        const labelEl = el.querySelector('.cursor__label');
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
        window.addEventListener('mousemove', e => { xTo(e.clientX); yTo(e.clientY); });
        document.addEventListener('mouseover', e => {
            const t = e.target.closest('[data-cursor-label]');
            if (t) { labelEl.textContent = t.dataset.cursorLabel; el.classList.add('cursor--active'); }
        });
        document.addEventListener('mouseout', e => {
            const t = e.target.closest('[data-cursor-label]');
            if (t && !t.contains(e.relatedTarget)) el.classList.remove('cursor--active');
        });
    }

    /* -------- Smooth scroll (adapted from smooth-scroll.js) ----------------- */
    function initSmoothScroll() {
        if (!ENHANCED || !HAS_LENIS) return;
        const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(t => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);

        const bar = document.createElement('div');
        bar.className = 'scrollbar';
        bar.setAttribute('aria-hidden', 'true');
        bar.innerHTML = '<div class="scrollbar__wrapper"><div class="scrollbar__handle"></div></div>';
        document.body.appendChild(bar);
        const handle = bar.querySelector('.scrollbar__handle');
        lenis.on('scroll', ({ progress }) => {
            const track = bar.querySelector('.scrollbar__wrapper').clientHeight;
            handle.style.transform = `translateY(${progress * (track - handle.clientHeight)}px)`;
        });
        // anchor clicks go through Lenis
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if (id.length < 2) return;
                const target = document.querySelector(id);
                if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: 0 }); }
            });
        });
        return lenis;
    }

    /* -------- Scroll reveals + hero intro ---------------------------------- */
    function setupReveals() {
        if (!ENHANCED) return [];
        gsap.registerPlugin(ScrollTrigger);
        const heroLines = [];
        document.querySelectorAll('[data-reveal]').forEach(el => {
            const lines = splitLines(el);
            gsap.set(lines, { yPercent: 110 });
            if (el.closest('#hero')) {
                heroLines.push(...lines);
            } else {
                gsap.to(lines, {
                    yPercent: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out',
                    scrollTrigger: { trigger: el, start: 'top 88%' }
                });
            }
        });
        return heroLines;
    }

    function playHeroIntro(heroLines) {
        if (!ENHANCED || !heroLines.length) return;
        gsap.to(heroLines, { yPercent: 0, duration: 1.1, stagger: 0.09, ease: 'power4.out', delay: 0.15 });
        // Failsafe: if requestAnimationFrame is throttled (e.g., the tab is
        // backgrounded during load), the tween above never advances and the
        // headline would stay hidden. gsap.set is synchronous, so this
        // guarantees the hero becomes visible no matter what.
        setTimeout(() => gsap.set(heroLines, { yPercent: 0 }), 2600);
    }

    /* -------- Preloader (adapted from preloader.js) ------------------------- */
    function runPreloader(onDone) {
        const el = document.getElementById('preloader');
        if (!ENHANCED) {
            if (el) el.style.display = 'none';
            html.style.overflow = '';
            onDone();
            return;
        }
        const countEl = document.getElementById('preloader-count');
        html.style.overflow = 'hidden';

        // done(): tear the preloader down and hand off. Idempotent.
        let exited = false;
        const done = () => {
            if (exited) return;
            exited = true;
            el.style.display = 'none';
            html.style.overflow = '';
            if (window.ScrollTrigger) ScrollTrigger.refresh();
            onDone();
        };
        // start(): play the exit wipe, with a timeout in case rAF is throttled.
        let started = false;
        const start = () => {
            if (started) return;
            started = true;
            gsap.to(el, { yPercent: -100, duration: 1, ease: 'power4.inOut', onComplete: done });
            setTimeout(done, 1200);
        };

        const counter = { v: 0 };
        const tween = new Promise(res => {
            gsap.to(counter, {
                v: 100, duration: 1.6, ease: 'power1.inOut',
                onUpdate: () => { countEl.textContent = String(Math.floor(counter.v)).padStart(2, '0'); },
                onComplete: res
            });
        });
        const loaded = document.readyState === 'complete'
            ? Promise.resolve()
            : new Promise(res => window.addEventListener('load', res, { once: true }));
        Promise.all([tween, loaded]).then(start);

        // Hard failsafe: a preloader must never hang and hide the whole page.
        // If the counter/exit tweens are throttled (backgrounded tab, low-power
        // rAF), force the handoff after a max wait.
        setTimeout(start, 3600);
    }

    /* -------- Boot --------------------------------------------------------- */
    if (ENHANCED) html.classList.add('js-anim');

    // deps that work regardless of motion
    initClock();
    initEqualizer();
    initNav();

    if (ENHANCED) {
        initCursor();
        initSmoothScroll();
        const heroLines = setupReveals();
        runPreloader(() => playHeroIntro(heroLines));
    } else {
        runPreloader(() => { }); // just removes the preloader
    }
})();
