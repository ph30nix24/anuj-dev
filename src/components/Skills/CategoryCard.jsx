import { useEffect, useRef } from "react";
import SkillTag from "./SkillTag";
import gsap from "gsap";

const CategoryCard = ({ cat, cardIdx, triggered, dark }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!triggered || !cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: cardIdx * 0.14, ease: 'power3.out' }
    );
  }, [triggered, cardIdx]);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl p-6 flex flex-col gap-5 h-full transition-colors duration-500"
      style={{
        background: dark ? 'rgba(28,28,28,0.90)' : 'rgba(255,255,255,0.65)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(220,218,210,0.55)'}`,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.05)',
        opacity: 0,   /* hidden until GSAP fires */
        transition: 'background 0.5s ease, border 0.5s ease'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3
            className="font-bold mb-0.5 transition-colors duration-500"
            style={{ 
              fontFamily: "'Space Grotesk',sans-serif",
              color: dark ? '#f0f0f0' : '#111827',
              transition: 'color 0.5s ease'
            }}
          >
            {cat.label}
          </h3>
          <p 
            className="text-[11px] font-medium transition-colors duration-500"
            style={{
              color: dark ? 'rgba(160,160,160,0.7)' : '#9ca3af',
              transition: 'color 0.5s ease'
            }}
          >
            {cat.desc}
          </p>
        </div>
        {/* Code bracket icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(245,197,24,0.12)', border: '1px solid rgba(245,197,24,0.25)' }}
        >
          <svg width="16" height="14" viewBox="0 0 22 18" fill="none">
            <path d="M7 1L1 9l6 8"  stroke="#F5C518" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 1l6 8-6 8" stroke="#F5C518" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div 
        className="h-px w-full transition-colors duration-500" 
        style={{ 
          background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(200,198,190,0.4)',
          transition: 'background 0.5s ease'
        }} 
      />

      {/* Legend */}
      <div className="flex items-center gap-3 flex-wrap">
        <span 
          className="flex items-center gap-1.5 text-[10px] font-medium transition-colors duration-500"
          style={{
            color: dark ? 'rgba(140,140,140,0.6)' : '#9ca3af',
            transition: 'color 0.5s ease'
          }}
        >
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: '#F5C518' }} />
          Expert
        </span>
        <span 
          className="flex items-center gap-1.5 text-[10px] font-medium transition-colors duration-500"
          style={{
            color: dark ? 'rgba(140,140,140,0.6)' : '#9ca3af',
            transition: 'color 0.5s ease'
          }}
        >
          <span className="inline-block w-3 h-3 rounded-full border"
            style={{ background: 'rgba(255,255,255,0.9)', borderColor: 'rgba(245,197,24,0.4)' }} />
          Advanced
        </span>
        <span 
          className="flex items-center gap-1.5 text-[10px] font-medium transition-colors duration-500"
          style={{
            color: dark ? 'rgba(140,140,140,0.6)' : '#9ca3af',
            transition: 'color 0.5s ease'
          }}
        >
          <span className="inline-block w-3 h-3 rounded-full border"
            style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(200,198,190,0.6)' }} />
          Proficient
        </span>
        <span className="text-[10px] text-gray-300 italic">· hover for %</span>
      </div>

      {/* Tag cloud */}
      <div className="flex flex-wrap gap-2.5 flex-1 content-start">
        {triggered && cat.skills.map((skill, i) => (
          <SkillTag
            key={skill.name}
            skill={skill}
            delay={cardIdx * 0.14 + 0.3 + i * 0.055}
            dark={dark}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;