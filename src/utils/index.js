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