import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── Data ─────────────────────────── */
const PROJECTS = [
  {
    id: '01',
    title: 'DevHub',
    category: 'Full-Stack · Real-time',
    desc: 'A real-time developer collaboration platform with live code sharing, integrated chat, and project management boards powered by WebSockets.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
    live: '#',
    repo: '#',
    featured: true,
    colors: { from: '#6366f1', to: '#8b5cf6', bg: 'rgba(99,102,241,0.08)' },
  },
  {
    id: '02',
    title: 'PixelCart',
    category: 'E-Commerce',
    desc: 'Full-featured e-commerce platform with real-time inventory, Stripe payments, and an analytics-rich admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'Redis', 'PostgreSQL'],
    live: '#',
    repo: '#',
    featured: false,
    colors: { from: '#10b981', to: '#059669', bg: 'rgba(16,185,129,0.08)' },
  },
  {
    id: '03',
    title: 'TaskFlow',
    category: 'Productivity',
    desc: 'Drag-and-drop project management tool with team collaboration, role-based access, and real-time progress analytics.',
    tech: ['React', 'Express', 'PostgreSQL', 'JWT', 'Framer'],
    live: '#',
    repo: '#',
    featured: false,
    colors: { from: '#f59e0b', to: '#f97316', bg: 'rgba(245,158,11,0.08)' },
  },
  {
    id: '04',
    title: 'WeatherVue',
    category: 'Dashboard',
    desc: 'Animated weather dashboard with location-aware forecasts, interactive charts, and beautiful GSAP-powered data visualizations.',
    tech: ['React', 'GSAP', 'Chart.js', 'OpenWeather API'],
    live: '#',
    repo: '#',
    featured: false,
    colors: { from: '#0ea5e9', to: '#38bdf8', bg: 'rgba(14,165,233,0.08)' },
  },
];

/* ─── SVG mock-UI previews per project ─── */
const PreviewSVG = ({ id, colors }) => {
  const { from, to } = colors;

  if (id === '01') return (        // DevHub — code editor look
    <svg width="100%" height="100%" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="220" fill={`url(#g${id})`}/>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="360" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor={from}/><stop offset="1" stopColor={to}/>
        </linearGradient>
      </defs>
      {/* sidebar */}
      <rect x="0" y="0" width="64" height="220" fill="rgba(0,0,0,0.25)"/>
      <circle cx="32" cy="28" r="10" fill="rgba(255,255,255,0.15)"/>
      {[60,88,116,144].map(y => <rect key={y} x="14" y={y} width="36" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>)}
      {/* code lines */}
      {[24,40,56,72,88,104,120,136,152,168].map((y,i) => (
        <rect key={y} x="84" y={y} width={[120,80,140,60,100,90,110,70,130,85][i]} height="5" rx="2.5"
          fill={i%3===0 ? 'rgba(255,255,255,0.55)' : i%3===1 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.18)'}/>
      ))}
      {/* chat sidebar */}
      <rect x="260" y="0" width="100" height="220" fill="rgba(0,0,0,0.20)"/>
      {[20,55,90,125,160].map((y,i) => (
        <g key={y}>
          <circle cx="278" cy={y+8} r="7" fill="rgba(255,255,255,0.15)"/>
          <rect x="292" y={y+2} width={[44,32,50,28,38][i]} height="4" rx="2" fill="rgba(255,255,255,0.18)"/>
          <rect x="292" y={y+10} width={[30,44,22,40,26][i]} height="3" rx="1.5" fill="rgba(255,255,255,0.10)"/>
        </g>
      ))}
      {/* top bar */}
      <rect x="64" y="0" width="196" height="14" fill="rgba(0,0,0,0.18)"/>
      {['#ff5f57','#febc2e','#28c840'].map((c,i) => <circle key={c} cx={72+i*12} cy="7" r="3.5" fill={c} opacity="0.85"/>)}
    </svg>
  );

  if (id === '02') return (        // PixelCart — e-commerce grid
    <svg width="100%" height="100%" viewBox="0 0 360 220" fill="none">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="360" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor={from}/><stop offset="1" stopColor={to}/>
        </linearGradient>
      </defs>
      <rect width="360" height="220" fill={`url(#g${id})`}/>
      {/* navbar */}
      <rect x="0" y="0" width="360" height="28" fill="rgba(0,0,0,0.22)"/>
      <rect x="12" y="9" width="40" height="10" rx="5" fill="rgba(255,255,255,0.5)"/>
      <rect x="270" y="9" width="60" height="10" rx="5" fill="rgba(255,255,255,0.2)"/>
      {/* product cards */}
      {[[12,40],[132,40],[252,40],[12,140],[132,140]].map(([x,y],i) => (
        <g key={i}>
          <rect x={x} y={y} width="100" height="88" rx="8" fill="rgba(255,255,255,0.18)"/>
          <rect x={x+8} y={y+8} width="84" height="50" rx="4" fill="rgba(255,255,255,0.15)"/>
          <rect x={x+8} y={y+64} width="50" height="6" rx="3" fill="rgba(255,255,255,0.5)"/>
          <rect x={x+8} y={y+75} width="32" height="5" rx="2.5" fill="rgba(255,255,255,0.3)"/>
          <circle cx={x+86} cy={y+77} r="7" fill="rgba(255,255,255,0.3)"/>
        </g>
      ))}
      <rect x="252" y="140" width="100" height="88" rx="8" fill="rgba(0,0,0,0.18)"/>
      <rect x="262" y="155" width="60" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
    </svg>
  );

  if (id === '03') return (        // TaskFlow — kanban board
    <svg width="100%" height="100%" viewBox="0 0 360 220" fill="none">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="360" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor={from}/><stop offset="1" stopColor={to}/>
        </linearGradient>
      </defs>
      <rect width="360" height="220" fill={`url(#g${id})`}/>
      <rect x="0" y="0" width="360" height="24" fill="rgba(0,0,0,0.20)"/>
      <rect x="12" y="7" width="36" height="10" rx="5" fill="rgba(255,255,255,0.45)"/>
      {/* 3 columns */}
      {[12, 130, 248].map((x, col) => (
        <g key={col}>
          <rect x={x} y="34" width="106" height="12" rx="4" fill="rgba(255,255,255,0.25)"/>
          {[56, 96, 136, 176].slice(0, col===1 ? 3 : col===2 ? 2 : 4).map((y,i) => (
            <g key={y}>
              <rect x={x} y={y} width="106" height="32" rx="6" fill="rgba(255,255,255,0.18)"/>
              <rect x={x+8} y={y+8} width={[70,50,80,60][i]} height="5" rx="2.5" fill="rgba(255,255,255,0.55)"/>
              <rect x={x+8} y={y+18} width={[40,60,44,50][i]} height="4" rx="2" fill="rgba(255,255,255,0.25)"/>
              <circle cx={x+90} cy={y+16} r="6" fill="rgba(255,255,255,0.2)"/>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );

  return (                         // WeatherVue — dashboard
    <svg width="100%" height="100%" viewBox="0 0 360 220" fill="none">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="360" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor={from}/><stop offset="1" stopColor={to}/>
        </linearGradient>
      </defs>
      <rect width="360" height="220" fill={`url(#g${id})`}/>
      {/* big temp */}
      <text x="30" y="90" fontSize="52" fontWeight="800" fill="rgba(255,255,255,0.90)" fontFamily="sans-serif">24°</text>
      <text x="30" y="112" fontSize="13" fill="rgba(255,255,255,0.55)" fontFamily="sans-serif">New Delhi, India</text>
      {/* sun icon */}
      <circle cx="300" cy="60" r="26" fill="rgba(255,255,255,0.18)"/>
      <circle cx="300" cy="60" r="16" fill="rgba(255,255,255,0.30)"/>
      {[0,45,90,135,180,225,270,315].map(a => {
        const r1=20, r2=26, rad=a*Math.PI/180;
        return <line key={a} x1={300+r1*Math.cos(rad)} y1={60+r1*Math.sin(rad)}
          x2={300+r2*Math.cos(rad)} y2={60+r2*Math.sin(rad)} stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinecap="round"/>;
      })}
      {/* chart bars */}
      {[140,120,160,100,140,110,150].map((h,i) => (
        <rect key={i} x={18+i*48} y={220-h} width="34" height={h-80} rx="6"
          fill={i===2 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.20)'}/>
      ))}
      {/* bottom labels */}
      {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i) => (
        <text key={d} x={35+i*48} y="215" fontSize="9" fill="rgba(255,255,255,0.45)"
          fontFamily="sans-serif" textAnchor="middle">{d}</text>
      ))}
    </svg>
  );
};

/* ─── Link buttons ─── */
const LinkBtn = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold
               transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    style={{ background: 'rgba(245,197,24,0.12)', color: '#b38c00', border: '1px solid rgba(245,197,24,0.3)' }}
  >
    {icon}
    {label}
  </a>
);

/* ─── Featured project card ─── */
const FeaturedCard = ({ project, cardRef }) => (
  <div
    ref={cardRef}
    className="group rounded-3xl overflow-hidden col-span-1 lg:col-span-2"
    style={{
      background: 'rgba(255,255,255,0.70)',
      border: '1px solid rgba(220,218,210,0.55)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 48px rgba(0,0,0,0.06)',
      opacity: 0,
    }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
      {/* Preview */}
      <div className="relative overflow-hidden" style={{ minHeight: '240px' }}>
        <PreviewSVG id={project.id} colors={project.colors} />
        {/* Number watermark */}
        <span className="absolute bottom-3 right-4 font-black text-white/20 select-none"
          style={{ fontSize: '56px', lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif" }}>
          {project.id}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-7 gap-5">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ background: project.colors.bg, color: project.colors.from }}>
              ✦ Featured
            </span>
            <span className="text-[10px] text-gray-400 font-medium">{project.category}</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(22px,2.5vw,30px)' }}>
            {project.title}
          </h3>
          <p className="text-gray-500 leading-relaxed text-[13px]">{project.desc}</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-[11px] font-semibold text-gray-600"
                style={{ background: 'rgba(200,198,190,0.25)', border: '1px solid rgba(200,198,190,0.45)' }}>
                {t}
              </span>
            ))}
          </div>
          {/* Links */}
          <div className="flex items-center gap-2.5">
            <LinkBtn href={project.live} label="Live Demo" icon={
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7"/>
                <path d="M8 1h3v3M11 1 6 6"/>
              </svg>
            }/>
            <LinkBtn href={project.repo} label="GitHub" icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            }/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Regular project card ─── */
const ProjectCard = ({ project, cardRef }) => (
  <div
    ref={cardRef}
    className="group rounded-3xl overflow-hidden flex flex-col"
    style={{
      background: 'rgba(255,255,255,0.70)',
      border: '1px solid rgba(220,218,210,0.55)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 32px rgba(0,0,0,0.05)',
      opacity: 0,
    }}
  >
    {/* Preview area */}
    <div className="relative overflow-hidden" style={{ height: '180px' }}>
      <PreviewSVG id={project.id} colors={project.colors} />
      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center gap-3
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.42)' }}>
        <a href={project.live} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold
                     text-gray-900 transition-transform duration-200 hover:scale-105"
          style={{ background: '#F5C518' }}>
          Live ↗
        </a>
        <a href={project.repo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold
                     text-white border border-white/30 transition-transform duration-200 hover:scale-105"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
          GitHub
        </a>
      </div>
      {/* Project number */}
      <span className="absolute bottom-2 right-3 font-black text-white/20 select-none"
        style={{ fontSize: '40px', lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif" }}>
        {project.id}
      </span>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-5 gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: project.colors.from }}>{project.category}</span>
        <div className="flex gap-2">
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-yellow-50"
            style={{ border: '1px solid rgba(200,198,190,0.5)' }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
              <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7"/>
              <path d="M8 1h3v3M11 1 6 6"/>
            </svg>
          </a>
          <a href={project.repo} target="_blank" rel="noopener noreferrer"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-yellow-50"
            style={{ border: '1px solid rgba(200,198,190,0.5)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#888">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 text-[16px]"
        style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
        {project.title}
      </h3>

      <p className="text-gray-400 text-[12px] leading-relaxed flex-1">{project.desc}</p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.tech.map(t => (
          <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-gray-500"
            style={{ background: 'rgba(200,198,190,0.22)', border: '1px solid rgba(200,198,190,0.4)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────── Main component ─────────────────────── */
const Projects = () => {
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const headingRef = useRef(null);
  const bgTextRef  = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 72%' };

      gsap.fromTo(labelRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: trigger }
      );
      gsap.fromTo(headingRef.current,
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: 'power3.out', scrollTrigger: trigger }
      );
      gsap.fromTo(bgTextRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: trigger }
      );

      /* Cards stagger */
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [featured, ...rest] = PROJECTS;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full overflow-hidden"
      style={{ background: '#F4F3EF', paddingTop: '100px', paddingBottom: '100px' }}
    >

      {/* ── Header ── */}
      <div className="relative z-10 text-center px-6 mb-16">
        {/* Watermark */}
        <div
          ref={bgTextRef}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center
                     justify-center pointer-events-none select-none z-0"
        >
          <span className="font-black uppercase leading-none"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 'clamp(60px,11vw,150px)',
              color: 'rgba(175,172,165,0.28)',
              letterSpacing: '0.12em',
            }}>
            WORK
          </span>
        </div>

        {/* Label */}
        <div ref={labelRef} className="relative z-10 inline-flex items-center gap-3 mb-4">
          <span className="h-px w-8 rounded-full" style={{ background: '#F5C518' }}/>
          <span className="font-semibold uppercase tracking-[0.18em] text-[12px]"
            style={{ color: '#F5C518' }}>
            My Work
          </span>
          <span className="h-px w-8 rounded-full" style={{ background: '#F5C518' }}/>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="relative z-10 font-bold text-gray-900 leading-tight"
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(26px,3.5vw,46px)' }}
        >
          Featured Projects
        </h2>
      </div>

      {/* ── Grid ── */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-20"
        style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Row 1: featured (2/3) + first small card (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <FeaturedCard project={featured} cardRef={el => (cardsRef.current[0] = el)} />
          <ProjectCard  project={rest[0]}  cardRef={el => (cardsRef.current[1] = el)} />
        </div>

        {/* Row 2: two equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ProjectCard project={rest[1]} cardRef={el => (cardsRef.current[2] = el)} />
          <ProjectCard project={rest[2]} cardRef={el => (cardsRef.current[3] = el)} />
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full font-semibold text-sm
                       transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
            style={{
              padding: '14px 32px',
              background: '#F5C518',
              color: '#1a1a1a',
              boxShadow: '0 4px 20px rgba(245,197,24,0.30)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e0b310')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F5C518')}
          >
            View All on GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
