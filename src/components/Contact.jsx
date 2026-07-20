import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Contact info ─── */
const INFO = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: 'Email',
    value: 'anuj@example.com',
    href: 'mailto:anuj@example.com',
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
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
];

const SOCIALS = [
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

/* ─── Floating label input ─── */
const FloatInput = ({ id, label, type = 'text', value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full pt-5 pb-2 px-4 rounded-xl text-[14px] font-medium text-gray-800
                   outline-none transition-all duration-200 peer"
        style={{
          background: 'rgba(255,255,255,0.75)',
          border: `1.5px solid ${focused ? '#F5C518' : 'rgba(210,208,200,0.7)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(245,197,24,0.12)' : 'none',
        }}
      />
      <label
        htmlFor={id}
        className="absolute left-4 pointer-events-none font-medium transition-all duration-200"
        style={{
          top: active ? '8px' : '50%',
          transform: active ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: active ? '10px' : '13px',
          color: active ? '#F5C518' : '#aaa',
          letterSpacing: active ? '0.06em' : '0',
          textTransform: active ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  );
};

/* ─── Floating label textarea ─── */
const FloatTextarea = ({ id, label, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={5}
        className="w-full pt-6 pb-3 px-4 rounded-xl text-[14px] font-medium text-gray-800
                   outline-none transition-all duration-200 resize-none"
        style={{
          background: 'rgba(255,255,255,0.75)',
          border: `1.5px solid ${focused ? '#F5C518' : 'rgba(210,208,200,0.7)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(245,197,24,0.12)' : 'none',
        }}
      />
      <label
        htmlFor={id}
        className="absolute left-4 pointer-events-none font-medium transition-all duration-200"
        style={{
          top: active ? '8px' : '18px',
          fontSize: active ? '10px' : '13px',
          color: active ? '#F5C518' : '#aaa',
          letterSpacing: active ? '0.06em' : '0',
          textTransform: active ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  );
};

/* ─── Main component ─── */
const Contact = () => {
  const sectionRef  = useRef(null);
  const labelRef    = useRef(null);
  const headingRef  = useRef(null);
  const bgTextRef   = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);

  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied]   = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1600);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('anuj@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } }
      );
      gsap.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.35, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
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
            <span
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 'clamp(52px,10vw,140px)',
                color: 'rgba(175,172,165,0.26)',
                letterSpacing: '0.1em',
              }}
            >
              CONTACT
            </span>
          </div>

          {/* Label */}
          <div ref={labelRef} className="relative z-10 inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 rounded-full" style={{ background: '#F5C518' }}/>
            <span className="font-semibold uppercase tracking-[0.18em] text-[12px]"
              style={{ color: '#F5C518' }}>
              Get in Touch
            </span>
            <span className="h-px w-8 rounded-full" style={{ background: '#F5C518' }}/>
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="relative z-10 font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(26px,3.5vw,46px)' }}
          >
            Let's build something amazing
          </h2>
        </div>

        {/* ── Two column layout ── */}
        <div
          className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-20"
          style={{ maxWidth: '1100px', margin: '0 auto' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-start">

            {/* ════ LEFT — info ════ */}
            <div ref={leftRef} className="flex flex-col gap-8">

              {/* Intro */}
              <div>
                <h3 className="font-bold text-gray-900 text-xl mb-3"
                  style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  Open to new opportunities
                </h3>
                <p className="text-gray-500 leading-relaxed text-[14px]">
                  Whether you have a project in mind, a role to fill, or just want
                  to say hello — I'd love to hear from you. I'm currently available
                  for freelance work and full-time positions.
                </p>
              </div>

              {/* Contact info cards */}
              <div className="flex flex-col gap-3">
                {INFO.map((item) => (
                  <div
                    key={item.label}
                    className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      background: 'rgba(255,255,255,0.70)',
                      border: '1px solid rgba(220,218,210,0.55)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-gray-500
                                 group-hover:text-yellow-500 transition-colors duration-200"
                      style={{ background: 'rgba(245,197,24,0.10)', border: '1px solid rgba(245,197,24,0.20)' }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href}
                          className="text-[13px] font-semibold text-gray-700 hover:text-yellow-600 transition-colors truncate block">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-[13px] font-semibold text-gray-700">{item.value}</span>
                      )}
                    </div>
                    {/* Copy button for email */}
                    {item.label === 'Email' && (
                      <button
                        onClick={copyEmail}
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                                   transition-all duration-200 hover:bg-yellow-50"
                        style={{ border: '1px solid rgba(200,198,190,0.5)' }}
                        title="Copy email"
                      >
                        {copied ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round">
                            <rect x="9" y="9" width="13" height="13" rx="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div>
                <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mb-3">
                  Find me on
                </p>
                <div className="flex items-center gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500
                                 transition-all duration-200 hover:text-gray-900 hover:-translate-y-1 hover:shadow-md"
                      style={{
                        background: 'rgba(255,255,255,0.70)',
                        border: '1px solid rgba(220,218,210,0.55)',
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl w-fit"
                style={{
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.22)',
                }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"/>
                </span>
                <span className="text-[12px] font-semibold text-green-700">
                  Available for work · Response within 24 hrs
                </span>
              </div>
            </div>

            {/* ════ RIGHT — form ════ */}
            <div
              ref={rightRef}
              className="rounded-3xl p-7 sm:p-9"
              style={{
                background: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(220,218,210,0.55)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 48px rgba(0,0,0,0.06)',
              }}
            >
              {sent ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center justify-center text-center py-10 gap-5">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(245,197,24,0.15)', border: '2px solid #F5C518' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F5C518"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2"
                      style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 text-[14px]">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }); }}
                    className="px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200
                               hover:-translate-y-0.5"
                    style={{ background: '#F5C518', color: '#1a1a1a' }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1"
                      style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                      Send a message
                    </h3>
                    <p className="text-gray-400 text-[12px]">
                      All fields marked with * are required.
                    </p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInput id="name"    label="Your Name *"    value={form.name}    onChange={set('name')}    required />
                    <FloatInput id="email"   label="Email Address *" type="email" value={form.email}   onChange={set('email')}   required />
                  </div>

                  <FloatInput   id="subject" label="Subject *"       value={form.subject} onChange={set('subject')} required />
                  <FloatTextarea id="message" label="Your Message *"  value={form.message} onChange={set('message')} required />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-3 rounded-2xl font-semibold text-[14px]
                               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95
                               disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      padding: '15px 28px',
                      background: '#F5C518',
                      color: '#1a1a1a',
                      boxShadow: '0 4px 20px rgba(245,197,24,0.30)',
                    }}
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer
        className="relative w-full"
        style={{ background: '#1a1a1a', paddingTop: '48px', paddingBottom: '40px' }}
      >
        <div
          className="px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ maxWidth: '1100px', margin: '0 auto' }}
        >
          {/* Logo + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <div className="flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <polygon points="14,2 26,24 2,24" fill="none" stroke="#F5C518" strokeWidth="2.5" strokeLinejoin="round"/>
                <line x1="8" y1="24" x2="20" y2="24" stroke="#F5C518" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span className="font-bold text-white text-[15px]"
                style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Anuj
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              Crafting digital experiences with precision.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {['Home','About','Skills','Projects','Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="text-[12px] font-medium text-gray-500 hover:text-white transition-colors duration-200">
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
    </>
  );
};

export default Contact;
