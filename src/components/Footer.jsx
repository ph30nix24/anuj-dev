import React from 'react'
import { SOCIALS } from '../utils/index'


const Footer = () => {
  return (
    <footer
      className="relative w-full"
      style={{ background: '#1a1a1a', paddingTop: '48px', paddingBottom: '40px' }}
    >
      {/* ════════════════ FOOTER ════════════════ */}
      <div
        className="px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-6 pb-3"
        style={{ maxWidth: '1100px', margin: '0 auto' }}
      >
        {/* Logo + tagline */}
        <div className="flex flex-col items-center sm:items-start gap-1.5">
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center gap-2 shrink-0">
              <span className='font-logo text-[#E0B310] text-2xl'>A</span>
            </a>
            <span className="font-bold text-white text-[15px] font-body"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Anuj
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium font-body">
            Crafting digital experiences with precision.
          </p>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-[12px] font-medium text-gray-500 hover:text-white transition-colors duration-200 tracking-widest">
              {l}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {SOCIALS.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              title={s.name}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500
                           hover:text-white hover:border-gray-600 transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-8 pt-6 px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col sm:flex-row
                     items-center justify-between gap-3 text-center"
        style={{
          maxWidth: '1100px', margin: '0 auto',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <p className="text-[11px] text-gray-600">
          © {new Date().getFullYear()} Anuj. All rights reserved.
        </p>
        <p className="text-[11px] text-gray-600">
          Designed &amp; Built with{' '}
          <span style={{ color: '#F5C518' }}>♥</span>
          {' '}by Anuj
        </p>
      </div>
    </footer>
  )
}

export default Footer