import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronUp, CodeXml, Infinity, Pen, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

/* ─── Data ─── */
const CARDS = [
  {
    title: 'Performance First',
    desc: 'I optimize every interaction and animation for smooth, fast, and delightful experiences.',
    icon: ChevronUp
  },
  {
    title: 'User Focused',
    desc: 'I build intuitive interfaces that prioritize usability and create real impact.',
    icon: Users
  },
  {
    title: 'Clean Code',
    desc: 'I write maintainable, scalable code following best practices and modern standards.',
    icon: CodeXml
  },
  {
    title: 'Pixel Perfect',
    desc: 'I transform designs into flawless user interfaces with attention to every detail.',
    icon: Pen
  },
];

const STATS = [
  { value: '1+', label: 'YEARS EXP.', icon: false },
  { value: '4+', label: 'PROJECTS', icon: false },
  { value: '1+', label: 'CLIENTS', icon: false },
  { value: '</>', label: 'COFFEES', icon: true },
];

/* ─── SVG code bracket icon ─── */
const CodeIcon = () => (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path d="M7 1L1 9l6 8" stroke="#F5C518" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 1l6 8-6 8" stroke="#F5C518" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Component ─── */
const About = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const bgTextRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const pillRef = useRef(null);


  const w = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;
  const isDesktop = w >= 1024;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 72%' };

      /* Label slides in */
      gsap.fromTo(labelRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: trigger }
      );

      /* Heading sweeps up */
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: 'power3.out', scrollTrigger: trigger }
      );

      /* Body text fades in */
      gsap.fromTo(bodyRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.25, ease: 'power2.out', scrollTrigger: trigger }
      );

      // /* ABOUT watermark scales in */
      gsap.fromTo(bgTextRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: trigger }
      );

      /* Cards stagger from bottom */
      gsap.fromTo(cardsRef.current.filter(Boolean),
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      );

      /* Pill + stats stagger from right */
      gsap.fromTo([pillRef.current, ...statsRef.current.filter(Boolean)],
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden bg-[#F4F3EF] h-fit pt-25 pb-20"
    >

      {/* ── PIXEL PERFECT · left edge ── */}
      <div className="hidden lg:flex flex-col gap-1 absolute left-10 top-1/2 -translate-y-1/2 z-20">
        {['PIXEL', 'PERFECT', 'UI/UX'].map(w => (
          <span key={w} className="block font-semibold uppercase text-gray-400"
            style={{ fontSize: '11px', letterSpacing: '0.28em' }}>
            {w}
          </span>
        ))}
      </div>

      {/* ── SCROLL DOWN · left edge bottom ── */}
      <div className="hidden lg:flex flex-col-reverse items-center gap-3 absolute left-10 bottom-10 z-20">
        <div className="rounded-full" style={{
          width: '1.5px', height: '52px',
          background: 'linear-gradient(to bottom,#F5C518,rgba(245,197,24,0.1))'
        }} />
        <span className="font-semibold text-gray-400 uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.32em', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Scroll Down
        </span>
      </div>

      {/* ── Open to Opportunities · right edge top ── */}
      <div ref={pillRef}
        className="hidden lg:flex items-center gap-2.5 bg-white rounded-full px-4 py-2 shadow-md border border-gray-100 absolute right-10 z-20"
        style={{ top: '110px' }}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <span className="text-[12px] font-semibold text-gray-700 whitespace-nowrap">Open to Opportunities</span>
      </div>

      {/* ── Stats · right edge center ── */}
      <div className="hidden lg:flex flex-col items-center gap-8 absolute right-10 top-1/2 -translate-y-1/2 z-20"
        style={{ marginTop: '40px' }}>
        {STATS.map((s, i) => (
          <div key={s.label} ref={el => (statsRef.current[i] = el)}
            className="flex flex-col items-center gap-1">
            {s.icon ? (
              <span className="font-bold font-mono" style={{ fontSize: '22px', color: '#F5C518', letterSpacing: '-0.02em' }}>
                <Infinity />
              </span>
            ) : (
              <span className="font-black text-gray-900"
                style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '32px', lineHeight: 1 }}>
                {s.value}
              </span>
            )}
            <span className="font-semibold text-gray-400 uppercase whitespace-nowrap"
              style={{ fontSize: '9px', letterSpacing: '0.22em' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* ═══════════════ MAIN TWO-COLUMN GRID ═══════════════ */}
      <div className="relative z-10 w-full px-8 md:px-20 lg:px-0 lg:max-w-325 mx-auto lg:pl-[clamp(24px,3vw,80px)] lg:pr-[clamp(24px,6vw,160px)]">
        <div ref={bgTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 top-0 right-0! w-fit h-fit -translate-y-6/10 translate-x-6/10 md:translate-x-[160%] lg:hidden">
          <span className="font-black uppercase font-heading opacity-70"
            style={{

              fontSize: 'clamp(64px,9vw,148px)',
              color: 'rgba(175,172,165,0.22)',
              letterSpacing: '0.1em',
            }}>
            ABOUT
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ════ LEFT — text ════ */}
          <div className="flex flex-col">

            {/* "GET TO KNOW ME" label */}
            <div ref={labelRef} className="flex items-center gap-3 mb-5">
              <span className="font-semibold uppercase tracking-[0.18em]"
                style={{ color: '#F5C518', fontSize: '12px' }}>
                Get to Know Me
              </span>
              {/* Decorative tick marks */}
              <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
                <line x1="0" y1="10" x2="20" y2="10" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="17" y1="4" x2="26" y2="10" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="17" y1="16" x2="26" y2="10" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="24" y1="4" x2="33" y2="10" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="24" y1="16" x2="33" y2="10" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Heading */}
            <h2 ref={headingRef}
              className="font-bold text-gray-900 leading-[1.18] mb-7 font-heading"
              style={{ fontSize: 'clamp(26px,3vw,44px)' }}>
              Crafting digital experiences
              with precision and purpose.
            </h2>

            {/* Body paragraph */}
            <p ref={bodyRef} className="text-gray-500 leading-[1.85] max-md:hidden [&>span]:text-[#161616] [&>span]:font-medium" style={{ fontSize: 'clamp(13px,1.05vw,14px)' }}>
              I'm Anuj, a passionate <span>Frontend Developer</span> building modern,
              high-performance web applications that combine clean architecture
              with exceptional user experiences. I specialize in creating
              responsive, interactive interfaces using <span>React</span>, <span>Tailwind CSS</span>, and
              <span> GSAP</span>, while developing scalable backend services with <span>Node.js</span>,
              <span> Express</span>, <span>MongoDB</span>, and <span>Redis</span>.
            </p>
            <p ref={bodyRef} className="text-gray-500 leading-[1.85] md:hidden [&>span]:text-[#161616] [&>span]:font-medium" style={{ fontSize: 'clamp(13px,1.05vw,14px)' }}>
              I'm Anuj, a <span>Frontend JavaScript Developer</span> with a passion for creating fast, responsive, and user-centric web applications. I build modern interfaces using <span>React</span>, <span>Tailwind CSS</span>, and <span>GSAP</span>, while developing scalable backend systems with <span>Node.js</span>, <span>Express</span>, <span>MongoDB</span>, and <span>Redis</span>.
            </p>
            <p ref={bodyRef} className="text-gray-500 leading-[1.85] pt-4 max-md:hidden [&>span]:text-[#161616] [&>span]:font-medium" style={{ fontSize: 'clamp(13px,1.05vw,14px)' }}>
              Beyond crafting <span>pixel-perfect UIs</span>,
              I enjoy solving complex engineering problems—from designing <span>secure
                authentication</span> systems with <span>JWT</span> and <span>Redis</span> to building <span>RESTful APIs</span>, <span>microservices</span>, and cloud-integrated applications. My focus is on writing clean, maintainable code that delivers performance, scalability, and a seamless user experience.
            </p>
            <p ref={bodyRef} className="text-gray-500 leading-[1.85] pt-4 md:hidden [&>span]:text-[#161616] [&>span]:font-medium" style={{ fontSize: 'clamp(13px,1.05vw,14px)' }}>
              I believe great software is a balance of thoughtful design and solid engineering. Whether I'm building interactive frontends, <span>secure authentication</span> systems, or <span>RESTful APIs</span>, I strive to deliver clean, maintainable, and high-performance solutions while continuously learning new technologies.
            </p>
            <p ref={bodyRef} className="text-gray-500 leading-[1.85] pt-4 max-md:hidden [&>span]:text-[#161616] [&>span]:font-medium" style={{ fontSize: 'clamp(13px,1.05vw,14px)' }}>
              I'm constantly exploring new technologies, refining my development
              workflow, and pushing the boundaries of <span>modern web development</span>.
              Whether it's creating immersive frontend experiences or architecting
              reliable backend systems, I strive to build products that are both
              visually compelling and technically robust.
            </p>
          </div>

          {/* ════ RIGHT — ABOUT watermark + cards ════ */}
          <div className="lg:relative flex items-end lg:mt-30 justify-center" style={{ minHeight: isMobile ? '' : '420px' }}>

            {/* ABOUT watermark */}
            <div ref={bgTextRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 top-0 -translate-y-full  lg:-translate-y-6/10 -translate-x-1/10 max-lg:hidden">
              <span className="font-black uppercase font-heading opacity-70"
                style={{

                  fontSize: 'clamp(64px,9vw,148px)',
                  color: 'rgba(175,172,165,0.22)',
                  letterSpacing: '0.1em',
                }}>
                ABOUT
              </span>
            </div>

            {/* 2 × 2 cards */}
            <div className="relative z-10 grid grid-cols-2 gap-3.5 w-full">
              {CARDS.map((card, i) => (
                <div
                  key={card.title}
                  ref={el => (cardsRef.current[i] = el)}
                  className="group rounded-2xl p-5 border transition-all duration-300 cursor-default
                             hover:-translate-y-1 hover:shadow-xl hover:border-yellow-100"
                  style={{
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.68)',
                    border: '1px solid rgba(220,218,210,0.6)',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {/* Icon badge */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 text-[#F5C518] group-hover:bg-yellow-50"
                    style={{ background: 'rgba(245,197,24,0.10)', border: '1px solid rgba(245,197,24,0.2)' }}>
                    <card.icon />
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-1.5"
                    style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '14px' }}>
                    {card.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-md:hidden" style={{ fontSize: '12px' }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile stats row ── */}
      <div className="flex lg:hidden justify-center gap-8 mt-12 px-8 flex-wrap">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            {s.icon ? (
              <span className="font-bold font-mono text-xl" style={{ color: '#F5C518' }}>&lt;/&gt;</span>
            ) : (
              <span className="font-black text-gray-900 text-2xl"
                style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{s.value}</span>
            )}
            <span className="font-semibold text-gray-400 uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.2em' }}>{s.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default About;
