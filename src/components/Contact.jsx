import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { SOCIALS, INFO } from '../utils';
import FloatTextarea from '../components/FloatTextarea'
import FloatInput from '../components/FloatInput'

gsap.registerPlugin(ScrollTrigger);

/* ─── Main component ─── */
const Contact = () => {
  const { dark } = useTheme();

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
    navigator.clipboard.writeText('ph30nix.dev@gmail.com');
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
        style={{ 
          background: dark ? '#0d0d0d' : '#F4F3EF', 
          paddingTop: '100px', 
          paddingBottom: '100px',
          transition: 'background 0.5s ease' 
        }}
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
                color: dark ? 'rgba(255,255,255,0.06)' : 'rgba(175,172,165,0.26)',
                letterSpacing: '0.1em',
                transition: 'color 0.5s ease'
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
            className="relative z-10 font-bold leading-tight"
            style={{ 
              fontFamily: "'Space Grotesk',sans-serif", 
              fontSize: 'clamp(26px,3.5vw,46px)',
              color: dark ? '#f0f0f0' : '#111827',
              transition: 'color 0.5s ease'
            }}
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
                <h3 className="font-bold text-xl mb-3"
                  style={{ 
                    fontFamily: "'Space Grotesk',sans-serif",
                    color: dark ? '#f0f0f0' : '#111827',
                    transition: 'color 0.5s ease'
                  }}>
                  Open to new opportunities
                </h3>
                <p className="leading-relaxed text-[14px]"
                   style={{
                     color: dark ? 'rgba(175,175,175,0.8)' : '#6b7280',
                     transition: 'color 0.5s ease'
                   }}>
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
                      background: dark ? 'rgba(28,28,28,0.85)' : 'rgba(255,255,255,0.70)',
                      border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(220,218,210,0.55)',
                      backdropFilter: 'blur(8px)',
                      transition: 'background 0.5s ease, border 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease'
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
                      <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5"
                         style={{ color: dark ? 'rgba(130,130,130,0.7)' : '#9ca3af', transition: 'color 0.5s ease' }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href}
                          className="text-[13px] font-semibold hover:text-yellow-600 transition-colors truncate block"
                          style={{ color: dark ? '#d4d4d4' : '#374151', transition: 'color 0.5s ease' }}>
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-[13px] font-semibold"
                          style={{ color: dark ? '#d4d4d4' : '#374151', transition: 'color 0.5s ease' }}>
                          {item.value}
                        </span>
                      )}
                    </div>
                    {/* Copy button for email */}
                    {item.label === 'Email' && (
                      <button
                        onClick={copyEmail}
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-yellow-50"
                        style={{ 
                          border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(200,198,190,0.5)',
                          transition: 'border 0.5s ease, background 0.2s ease, transform 0.2s ease'
                        }}
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
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-3"
                   style={{ color: dark ? 'rgba(130,130,130,0.7)' : '#9ca3af', transition: 'color 0.5s ease' }}>
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
                      className={`w-10 h-10 rounded-xl flex items-center justify-center hover:-translate-y-1 hover:shadow-md ${dark ? 'hover:text-white' : 'hover:text-gray-900'}`}
                      style={{
                        background: dark ? 'rgba(28,28,28,0.85)' : 'rgba(255,255,255,0.70)',
                        border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(220,218,210,0.55)',
                        color: dark ? '#888' : '#6b7280',
                        transition: 'background 0.5s ease, border 0.5s ease, color 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease'
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
                background: dark ? 'rgba(22,22,22,0.92)' : 'rgba(255,255,255,0.72)',
                border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(220,218,210,0.55)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 48px rgba(0,0,0,0.06)',
                transition: 'background 0.5s ease, border 0.5s ease'
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
                    <h3 className="font-bold text-xl mb-2"
                      style={{ 
                        fontFamily: "'Space Grotesk',sans-serif",
                        color: dark ? '#f0f0f0' : '#111827',
                        transition: 'color 0.5s ease'
                      }}>
                      Message Sent!
                    </h3>
                    <p className="text-[14px]"
                       style={{
                         color: dark ? 'rgba(175,175,175,0.8)' : '#6b7280',
                         transition: 'color 0.5s ease'
                       }}>
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
                    <h3 className="font-bold text-lg mb-1"
                      style={{ 
                        fontFamily: "'Space Grotesk',sans-serif",
                        color: dark ? '#f0f0f0' : '#111827',
                        transition: 'color 0.5s ease'
                      }}>
                      Send a message
                    </h3>
                    <p className="text-[12px]"
                       style={{
                         color: dark ? 'rgba(140,140,140,0.7)' : '#9ca3af',
                         transition: 'color 0.5s ease'
                       }}>
                      All fields marked with * are required.
                    </p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInput id="name"    label="Your Name *"    value={form.name}    onChange={set('name')}    required dark={dark} />
                    <FloatInput id="email"   label="Email Address *" type="email" value={form.email}   onChange={set('email')}   required dark={dark} />
                  </div>

                  <FloatInput   id="subject" label="Subject *"       value={form.subject} onChange={set('subject')} required dark={dark} />
                  <FloatTextarea id="message" label="Your Message *"  value={form.message} onChange={set('message')} required dark={dark} />

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
    </>
  );
};

export default Contact;
