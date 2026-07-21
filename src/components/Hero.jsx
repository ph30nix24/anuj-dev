import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import HeroCanvas from './HeroCanvas';
import { useTheme } from '../context/ThemeContext';

/* ─── breakpoint hook ─── */
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
};

const Hero = () => {
  const greetRef = useRef(null);
  const locationRef = useRef(null);
  const pillRef = useRef(null);
  const pixelRef = useRef(null);
  const imgRef = useRef(null);
  const scrollRef = useRef(null);
  const glowRef = useRef(null);
  const btnGroupRef = useRef(null);

  const { dark } = useTheme();

  const w = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;
  const isDesktop = w >= 1024;

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Background giant text fades up
    tl.fromTo('.bg-text-row',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, delay: 0.3 }
    );

    // Glow orb scales in
    tl.fromTo(glowRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)' },
      '-=0.7'
    );

    // Hero image rises from bottom
    tl.fromTo(imgRef.current,
      { translateY: isMobile ? '5%' : '55%', opacity: 0 },
      { translateY: isMobile? '0' : '45%', opacity: 1, duration: 1.1, ease: 'power4.out' },
      '-=0.8'
    );

    // Greeting text drops in
    tl.fromTo(greetRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.5'
    );

    // Location tag fades up
    tl.fromTo(locationRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.3'
    );

    // Pill badge slides from right
    tl.fromTo(pillRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    );

    // PIXEL PERFECT slides from left
    tl.fromTo(pixelRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    );

    // Buttons slide up
    tl.fromTo(btnGroupRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    // Scroll indicator fades in
    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.3'
    );

    // ── Looping Animations ──

    // Glow breathe
    gsap.to(glowRef.current, {
      scale: 1.08,
      opacity: 0.9,
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.4,
    });

    // Scroll indicator — bar + text float together in sync
    gsap.to(scrollRef.current, {
      y: -7,
      duration: 1.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2,
    });
  }, []);

  /* ─── responsive values ─── */

  const glowSize = isMobile ? '260px' : isTablet ? '320px' : '440px';
  const imgWidth = isMobile ? 'min(78vw, 300px)' : isTablet ? 'min(55vw, 420px)' : 'clamp(300px, 600px, 52vw)';
  const greetTop = isMobile ? '80px' : '96px';
  const greetSize = isMobile ? '18px' : isTablet ? '20px' : 'clamp(18px, 2vw, 26px)';
  const btnBottom = isMobile ? '20px' : '36px';
  const btnLeft = isMobile ? '50%' : isTablet ? '32px' : '48px';
  const btnTransform = isMobile ? 'translateX(-50%)' : 'none';

  return (

    <>
      <HeroCanvas dark={dark} />
      <section
        id="home"
        className="relative w-full overflow-hidden"
        style={{
          height: '100vh',
          minHeight: isMobile ? '560px' : '640px',
          background: dark ? '#0d0d0d' : '#F4F3EF',
          transition: 'background 0.5s ease',
        }}
      >

        {/* LAYER 0 — Giant background typography */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 pt-15 max-md:top-0 max-md:h-fit max-md:translate-y-3/4"
        >
          <span
            className={`bg-text-row block w-full text-center font-black uppercase leading-none font-heading ${
              isMobile ? 'text-[clamp(36px,12vw,128px)]' : isTablet ? 'text-[clamp(56px,11vw,110px)]' : 'text-[clamp(72px,12vw,152px)]'
            } tracking-wide`}
            style={{
              color: 'transparent',
              WebkitTextStroke: dark ? '0.5px rgba(255,255,255,0.18)' : '0.5px rgba(22,22,22,0.12)',
              transition: 'all 0.5s ease',
            }}
          >
            FRONTEND
          </span>
          <span
            className={`bg-text-row block w-full text-center font-black uppercase leading-none font-heading ${
              isMobile ? 'text-[clamp(36px,17vw,128px)]' : isTablet ? 'text-[clamp(56px,11vw,110px)]' : 'text-[clamp(72px,12vw,192px)]'
            } tracking-wide`}
            style={{
              color: dark ? 'rgba(255,255,255,0.10)' : 'rgba(22,22,22,0.09)',
              transition: 'color 0.5s ease',
            }}
          >
            DEVELOPER
          </span>
        </div>

        {/* LAYER 1 — Glow orb */}
        <div
          ref={glowRef}
          className="absolute z-10 rounded-full pointer-events-none"
          style={{
            width: glowSize,
            height: glowSize,
            left: '50%',
            bottom: isMobile ? '25%' : '-40px',
            transform: isMobile ? 'translateY(-30%) translateX(-10%)' : 'translateX(-50%)',
            background: dark
              ? 'radial-gradient(circle at 50% 60%, rgba(245,197,24,0.18) 0%, rgba(245,197,24,0.06) 45%, transparent 75%)'
              : 'radial-gradient(circle at 50% 60%, rgba(245,197,24,0.28) 0%, rgba(255,215,60,0.14) 45%, transparent 75%)',
            filter: 'blur(4px)',
            transition: 'background 0.5s ease',
          }}
        />

        {/* ═══════════════════════════════════════════
          LAYER 2 — Hero image (bottom-anchored, centred)
        ═══════════════════════════════════════════ */}
        <img
          ref={imgRef}
          src="/hero.webp"
          alt="Anuj — Frontend Developer"
          className="absolute z-20 pointer-events-none select-none object-contain hero-image"
          style={{
            width: imgWidth,
            height: 'auto',
            bottom: '0',
            left: '50%',
            transform: isMobile ? 'translateX(-25%)' : 'translateX(-50%) translateY(45%)',
            filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.10))',
          }}
        />

        {/* ═══════════════════════════════════════════
          LAYER 3 — Greeting + Location (one column group)
      ═══════════════════════════════════════════ */}
        <div
          ref={greetRef}
          className="absolute z-30 flex flex-col items-center"
          style={{
            top: greetTop,
            left: '50%',
            transform: 'translateX(-50%)',
            gap: isMobile ? '6px' : '8px',
          }}
        >
          {/* ── "Hey, I'm Anuj" row ── */}
          <div className="flex items-center gap-2 max-md:mt-10">
            <span
              className="font-bold whitespace-nowrap"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: greetSize,
                color: dark ? '#f0f0f0' : '#1f2937',
                transition: 'color 0.5s ease',
              }}
            >
              Hey, I'm Anuj
            </span>
            {/* Hand-drawn squiggle + arrow */}
            <svg width="52" height="28" viewBox="0 0 52 28" fill="none" style={{ marginTop: '4px', flexShrink: 0 }}>
              <path
                d="M2 20 Q8 6 15 16 Q22 26 29 16 Q36 6 43 12 L48 8"
                stroke="#F5C518" strokeWidth="2.2" strokeLinecap="round" fill="none"
              />
              <polyline
                points="44,6 48,8 45,12"
                stroke="#F5C518" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
              />
            </svg>
          </div>

          {/* ── "Based in Delhi, India" row ── */}
          <div
            ref={locationRef}
            className="flex items-center justify-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span
              className="font-body font-medium whitespace-nowrap"
              style={{
                fontSize: isMobile ? '11px' : '14px',
                letterSpacing: '0.05em',
                color: dark ? 'rgba(180,180,180,0.8)' : '#9ca3af',
                transition: 'color 0.5s ease',
              }}
            >
              Based in Delhi, India
            </span>
          </div>
        </div>

        {/* LAYER 3 — "Open to Opportunities" pill */}
        <div
          ref={pillRef}
          className="absolute z-30 items-center gap-2.5 rounded-full px-4 py-2 shadow-md"
          style={{
            top: isMobile ? '80px' : '100px',
            right: isMobile ? '16px' : isTablet ? '24px' : '52px',
            display: isMobile ? 'none' : 'flex',
            background: dark ? 'rgba(30,30,30,0.95)' : '#ffffff',
            border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid #f3f4f6',
            transition: 'background 0.5s ease, border 0.5s ease',
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span
            className="text-[12px] font-semibold whitespace-nowrap"
            style={{ color: dark ? '#d1d5db' : '#374151', transition: 'color 0.5s ease' }}
          >
            Open to Opportunities
          </span>
        </div>

        {/* LAYER 3 — PIXEL PERFECT UI/UX */}
        <div
          ref={pixelRef}
          className="absolute z-30 flex-col gap-1"
          style={{
            top: '50%',
            left: '40px',
            transform: 'translateY(-50%)',
            display: isDesktop ? 'flex' : 'none',
          }}
        >
          {['PIXEL', 'PERFECT', 'UI/UX'].map((word) => (
            <span
              key={word}
              className="block font-semibold uppercase"
              style={{
                fontSize: '11px',
                letterSpacing: '0.28em',
                color: dark ? 'rgba(180,180,180,0.55)' : '#9ca3af',
                transition: 'color 0.5s ease',
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* ═══════════════════════════════════════════
          LAYER 3 — CTA Buttons
          mobile: centred  |  tablet+: bottom-left
      ═══════════════════════════════════════════ */}
        <div
          ref={btnGroupRef}
          className="absolute z-30 flex lg:items-center max-lg:w-full max-lg:flex-col gap-3 max-lg:pl-5 max-lg:pb-30"
          style={{
            bottom: btnBottom,
            left: btnLeft,
            transform: btnTransform,
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            justifyContent: 'flex-start',
          }}
        >
          <a
            href="#projects"
            className="group flex items-center gap-3 rounded-full font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 bg-[#F5C518] hover:bg-[#e0b310] font-body max-lg:w-fit"
            style={{
              padding: isMobile ? '12px 22px' : '14px 26px',
              fontSize: isMobile ? '13px' : '14px',
              boxShadow: '0 4px 20px rgba(245,197,24,0.3)',
            }}
          >
            View My Work
            <span className="w-6 h-6 rounded-full bg-gray-900/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="6" x2="10" y2="6" />
                <polyline points="7,3 10,6 7,9" />
              </svg>
            </span>
          </a>

          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 max-lg:w-fit max-md:gap-6"
            style={{
              padding: isMobile ? '11px 20px' : '13px 24px',
              fontSize: isMobile ? '13px' : '14px',
              border: dark ? '2px solid rgba(255,255,255,0.18)' : '2px solid #d1d5db',
              color: dark ? '#d1d5db' : '#4b5563',
              transition: 'border 0.5s ease, color 0.5s ease',
            }}
          >
            Download CV
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="7" y1="1" x2="7" y2="10" />
                <polyline points="4,7 7,10 10,7" />
                <line x1="2" y1="13" x2="12" y2="13" />
              </svg>
            </span>
          </a>
        </div>

        {/* ═══════════════════════════════════════════
          LAYER 3 — Scroll Down indicator
          visible on desktop only
      ═══════════════════════════════════════════ */}
        <div
          ref={scrollRef}
          className="absolute z-30 flex-col-reverse items-center gap-3"
          style={{
            bottom: '32px',
            right: '48px',
            display: isDesktop ? 'flex' : 'none',
          }}
        >
          <div
            className="scroll-line rounded-full w-[1.5px] h-13 bg-linear-to-b from-[#F5C518] to-[#f5c5181a]"
          />
          <span
            className="scroll-text font-semibold uppercase"
            style={{
              fontSize: '9px',
              letterSpacing: '0.32em',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              color: dark ? 'rgba(180,180,180,0.5)' : '#9ca3af',
              transition: 'color 0.5s ease',
            }}
          >
            Scroll Down
          </span>
        </div>

      </section>
    </>

  );
};

export default Hero;
