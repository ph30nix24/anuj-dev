import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillTag from './Skills/SkillTag';
import CategoryCard from './Skills/CategoryCard';
import { ALL_TECH, CATEGORIES } from '../utils';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

/* ── Marquee row ── */
const Marquee = ({ reverse, dark }) => (
  <div className="overflow-hidden select-none">
    <div
      className="flex gap-5 w-max"
      style={{ animation: `${reverse ? 'marqueeRev' : 'marqueeF'} 30s linear infinite` }}
    >
      {[...ALL_TECH, ...ALL_TECH].map((t, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-4 py-2 rounded-full shrink-0 transition-colors duration-500"
          style={{
            background: dark ? 'rgba(35,35,35,0.9)' : 'rgba(255,255,255,0.65)',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(220,218,210,0.5)'}`,
            backdropFilter: 'blur(6px)',
            transition: 'background 0.5s ease, border 0.5s ease'
          }}
        >
          <span className="text-[11px] font-bold" style={{ color: '#F5C518' }}>✦</span>
          <span 
            className="text-[12px] font-semibold whitespace-nowrap"
            style={{ 
              color: dark ? '#a0a0a0' : '#4b5563',
              transition: 'color 0.5s ease'
            }}
          >
            {t}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ── Main component ── */
const Skills = () => {
  const { dark } = useTheme();
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const headingRef = useRef(null);
  const bgTextRef  = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t = { trigger: sectionRef.current, start: 'top 72%' };

      gsap.fromTo(labelRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: t }
      );
      gsap.fromTo(headingRef.current,
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: 'power3.out', scrollTrigger: t }
      );
      gsap.fromTo(bgTextRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: t }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        onEnter: () => setTriggered(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full overflow-hidden transition-colors duration-500"
      style={{ 
        background: dark ? '#0d0d0d' : '#F4F3EF', 
        paddingTop: '100px', 
        paddingBottom: '0',
        transition: 'background 0.5s ease'
      }}
    >
      {/* ── Header + Watermark stacked together ── */}
      <div className="relative z-10 text-center px-6 mb-14">

        {/* SKILLS watermark — sits behind label + heading */}
        <div
          ref={bgTextRef}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center
                     justify-center pointer-events-none select-none z-0"
        >
          <span
            className="font-black uppercase leading-none transition-colors duration-500"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 'clamp(72px,13vw,168px)',
              color: dark ? 'rgba(255,255,255,0.06)' : 'rgba(175,172,165,0.30)',
              letterSpacing: '0.12em',
              transition: 'color 0.5s ease'
            }}
          >
            SKILLS
          </span>
        </div>

        {/* Label */}
        <div ref={labelRef} className="relative z-10 inline-flex items-center gap-3 mb-4">
          <span className="h-px w-8 rounded-full" style={{ background: '#F5C518' }} />
          <span className="font-semibold uppercase tracking-[0.18em] text-[12px]"
            style={{ color: '#F5C518' }}>
            What I Know
          </span>
          <span className="h-px w-8 rounded-full" style={{ background: '#F5C518' }} />
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="relative z-10 font-bold leading-tight transition-colors duration-500"
          style={{ 
            fontFamily: "'Space Grotesk',sans-serif", 
            fontSize: 'clamp(26px,3.5vw,46px)',
            color: dark ? '#f0f0f0' : '#111827',
            transition: 'color 0.5s ease'
          }}
        >
          Technologies I work with
        </h2>
      </div>

      {/* Three-column tag clouds */}
      <div
        className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 pb-16"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} cardIdx={i} triggered={triggered} dark={dark} />
          ))}
        </div>
      </div>

      {/* Scrolling marquee */}
      <div
        className="relative z-10 flex flex-col gap-3 py-8 overflow-hidden transition-colors duration-500"
        style={{ 
          background: dark ? 'rgba(18,18,18,0.9)' : 'rgba(240,238,232,0.6)', 
          borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(220,218,210,0.5)'}`,
          transition: 'background 0.5s ease, border-top 0.5s ease'
        }}
      >
        <Marquee reverse={false} dark={dark} />
        <Marquee reverse={true} dark={dark} />
      </div>

      <style>{`
        @keyframes marqueeF   { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes marqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
      `}</style>
    </section>
  );
};

export default Skills;
