import { useEffect, useRef, useState } from "react";
import { TIER_STYLES } from "../../utils";
import gsap from "gsap";

const getTier = (pct) => {
  if (pct >= 88) return 'hero';
  if (pct >= 80) return 'high';
  if (pct >= 72) return 'mid';
  return 'base';
};

const SkillTag = ({ skill, delay }) => {
  const tagRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const tier = getTier(skill.pct);
  const styles = TIER_STYLES[tier];

  useEffect(() => {
    if (!tagRef.current) return;
    gsap.fromTo(
      tagRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, delay, ease: 'back.out(1.6)' }
    );
  }, [delay]);

  return (
    <div
      ref={tagRef}
      className="relative inline-flex items-center gap-1.5 rounded-full cursor-default
                 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ ...styles, backdropFilter: 'blur(6px)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dot indicator only for hero tier */}
      {tier === 'hero' && (
        <span className="w-1.5 h-1.5 rounded-full bg-gray-900/30 shrink-0" />
      )}
      {skill.name}

      {/* Hover tooltip — shows percentage */}
      {hovered && (
        <span
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md
                     text-[10px] font-bold whitespace-nowrap pointer-events-none z-30"
          style={{ background: '#1a1a1a', color: '#F5C518' }}
        >
          {skill.pct}%
        </span>
      )}
    </div>
  );
};

export default SkillTag