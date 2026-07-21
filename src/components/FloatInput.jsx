import React, { useState } from 'react'

/* ─── Floating label input ─── */
const FloatInput = ({ id, label, type = 'text', value, onChange, required, dark }) => {
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
        className="w-full pt-5 pb-2 px-4 rounded-xl text-[14px] font-medium
                   outline-none peer"
        style={{
          background: dark ? 'rgba(30,30,30,0.85)' : 'rgba(255,255,255,0.75)',
          border: `1.5px solid ${focused ? '#F5C518' : (dark ? 'rgba(255,255,255,0.10)' : 'rgba(210,208,200,0.7)')}`,
          boxShadow: focused ? '0 0 0 3px rgba(245,197,24,0.12)' : 'none',
          color: dark ? '#e5e5e5' : '#1f2937',
          transition: 'background 0.5s ease, border 0.5s ease, color 0.5s ease, box-shadow 0.2s ease',
        }}
      />
      <label
        htmlFor={id}
        className="absolute left-4 pointer-events-none font-medium transition-all duration-200"
        style={{
          top: active ? '8px' : '50%',
          transform: active ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: active ? '10px' : '13px',
          color: active ? '#F5C518' : (dark ? 'rgba(140,140,140,0.7)' : '#aaa'),
          letterSpacing: active ? '0.06em' : '0',
          textTransform: active ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatInput