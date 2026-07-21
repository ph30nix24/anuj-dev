export const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    desc: 'Interactive, responsive UIs',
    skills: [
      { name: 'React.js',     pct: 92 },
      { name: 'JavaScript',   pct: 90 },
      { name: 'HTML / CSS',   pct: 95 },
      { name: 'Tailwind CSS', pct: 88 },
      { name: 'GSAP',         pct: 82 },
      { name: 'Redux',        pct: 74 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    desc: 'Scalable APIs & server logic',
    skills: [
      { name: 'REST APIs',  pct: 88 },
      { name: 'Node.js',    pct: 85 },
      { name: 'Express.js', pct: 84 },
      { name: 'MongoDB',    pct: 80 },
      { name: 'JWT / Auth', pct: 80 },
      { name: 'Redis',      pct: 72 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    desc: 'Workflow & infrastructure',
    skills: [
      { name: 'VS Code',      pct: 96 },
      { name: 'Git / GitHub', pct: 90 },
      { name: 'Vite',         pct: 86 },
      { name: 'Figma',        pct: 76 },
    ],
  },
];

export const ALL_TECH = [
  'React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS',
  'GSAP', 'Node.js', 'Express', 'MongoDB', 'Redis', 'PostgreSQL',
  'Git', 'Docker', 'AWS', 'Figma', 'Vite', 'REST API', 'JWT',
  'Redux', 'HTML5', 'CSS3', 'Linux',
];

export const TIER_STYLES = {
  hero: {
    fontSize: '14px', fontWeight: 700, padding: '9px 18px',
    background: '#F5C518', color: '#1a1a1a',
    border: '1.5px solid #F5C518',
    boxShadow: '0 4px 14px rgba(245,197,24,0.30)',
  },
  high: {
    fontSize: '13px', fontWeight: 600, padding: '8px 16px',
    background: 'rgba(255,255,255,0.90)', color: '#2a2a2a',
    border: '1.5px solid rgba(245,197,24,0.40)',
  },
  mid: {
    fontSize: '12px', fontWeight: 500, padding: '7px 14px',
    background: 'rgba(255,255,255,0.70)', color: '#444',
    border: '1px solid rgba(200,198,190,0.60)',
  },
  base: {
    fontSize: '11px', fontWeight: 500, padding: '6px 12px',
    background: 'rgba(255,255,255,0.50)', color: '#777',
    border: '1px solid rgba(200,198,190,0.40)',
  },
};

export const SOCIALS = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export const INFO = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: 'Email',
    value: 'ph30nix.dev@gmail.com',
    href: 'mailto:aph30nix.dev@gmail.com',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Delhi, India',
    href: null,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.88 15.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.8 4.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 12a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 19.4z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+91 83685 60947',
    href: 'tel:+918368560947',
  },
];