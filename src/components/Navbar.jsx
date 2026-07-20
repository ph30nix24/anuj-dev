import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const navRef   = useRef(null);
  const linksRef = useRef([]);
  const rightRef = useRef(null);
  const menuRef  = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1 });
    tl.fromTo(linksRef.current.filter(Boolean), { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07 }, '-=0.4');
    tl.fromTo(rightRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '-=0.4');
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    } else {
      gsap.to(menuRef.current,
        { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' }
      );
    }
  }, [menuOpen]);

  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50" ref={navRef}>
      {/* ── Main bar ── */}
      <nav
        className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-4"
        style={{ background: 'rgba(244,243,239,0.92)', backdropFilter: 'blur(12px)' }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <polygon points="14,2 26,24 2,24" fill="none" stroke="#F5C518" strokeWidth="2.5" strokeLinejoin="round"/>
            <line x1="8" y1="24" x2="20" y2="24" stroke="#F5C518" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span className="font-bold text-[15px] tracking-tight text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Anuj
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, i) => (
            <li key={link} ref={el => (linksRef.current[i] = el)}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`text-[13px] font-medium transition-colors duration-200 relative group pb-0.5 font-body tracking-wider ${
                  link === 'Home' ? 'text-[#F5C518]' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {link}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full transition-all duration-300 ${
                    link === 'Home' ? 'bg-[#F5C518] scale-x-100' : 'bg-gray-900 scale-x-0 group-hover:scale-x-100 origin-left'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3" ref={rightRef}>
          {/* Theme toggle — desktop only */}
          <button
            className="hidden sm:flex w-9 h-9 rounded-full border border-gray-300 items-center justify-center hover:border-[#F5C518] hover:text-[#F5C518] text-gray-500 transition-all duration-200 hover:rotate-12"
            aria-label="Toggle theme"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="2" x2="12" y2="4"/>
              <line x1="12" y1="20" x2="12" y2="22"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="2" y1="12" x2="4" y2="12"/>
              <line x1="20" y1="12" x2="22" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </button>

          {/* Let's Talk button */}
          <a
            href="#contact"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F5C518] text-gray-900 text-[12px] sm:text-[13px] font-semibold transition-all duration-200 hover:bg-[#e0b310] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-200/50 active:scale-95 whitespace-nowrap"
          >
            Let's Talk
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg border border-gray-200 hover:border-[#F5C518] transition-colors"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span className={`block w-4.5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} style={{ width: '18px' }} />
            <span className={`block h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} style={{ width: '14px' }} />
            <span className={`block h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} style={{ width: '18px' }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      <div
        ref={menuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0, background: 'rgba(244,243,239,0.97)', backdropFilter: 'blur(12px)' }}
      >
        <ul className="flex flex-col px-5 pb-5 pt-2 gap-1">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 px-2 text-[14px] font-medium border-b border-gray-100 transition-colors duration-200 ${
                  link === 'Home' ? 'text-[#F5C518]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link}
              </a>
            </li>
          ))}
          {/* Mobile theme toggle inside menu */}
          <li className="pt-3">
            <button className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4"/>
                <line x1="12" y1="2" x2="12" y2="4"/>
                <line x1="12" y1="20" x2="12" y2="22"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="2" y1="12" x2="4" y2="12"/>
                <line x1="20" y1="12" x2="22" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              Toggle Theme
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
