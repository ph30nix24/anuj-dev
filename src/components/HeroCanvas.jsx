import React, { useRef, useEffect } from 'react';

/* ════════════════════════════════════════════════════════════
   HeroCanvas — Floating Tech Elements
   Geometric shapes (hexagon, circle, diamond, triangle) and
   developer code glyphs ( </> {} [] => () ) drift upward,
   rotate gently, and scatter when the mouse gets close.
   Palette: #F5C518 accent (~25%) + muted cream-gray (~75%)
════════════════════════════════════════════════════════════ */

const ACCENT   = [245, 197, 24];
const MUTED    = [160, 158, 150];
const GLYPHS   = ['</>', '{ }', '[ ]', '=>', '( )', '&&', '//', '#'];
const SHAPES   = ['hexagon', 'circle', 'diamond', 'triangle', 'square', 'ring'];

const rand = (min, max) => min + Math.random() * (max - min);
const choice = arr => arr[Math.floor(Math.random() * arr.length)];

/* ── Draw helpers ── */
function hexPath(ctx, x, y, r, rot) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a  = rot + (i * Math.PI) / 3;
    const px = x + r * Math.cos(a);
    const py = y + r * Math.sin(a);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function triPath(ctx, x, y, r, rot) {
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const a  = rot + (i * 2 * Math.PI) / 3 - Math.PI / 2;
    const px = x + r * Math.cos(a);
    const py = y + r * Math.sin(a);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function squarePath(ctx, x, y, r, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.rect(-r, -r, r * 2, r * 2);
  ctx.restore();
}

/* ── Element class ── */
class FloatEl {
  constructor(W, H, spawnAtBottom = true) {
    this.W = W;
    this.H = H;
    this.reset(spawnAtBottom);
  }

  reset(bottom = true) {
    this.x      = rand(60, this.W - 60);
    this.y      = bottom ? rand(this.H, this.H + 120) : rand(-80, this.H);
    this.vy     = -rand(0.22, 0.65);          // upward drift
    this.vx     = rand(-0.12, 0.12);          // slight horizontal drift
    this.rot    = rand(0, Math.PI * 2);
    this.rotV   = rand(-0.008, 0.008);        // rotation speed
    this.size   = rand(10, 34);
    this.accent = Math.random() < 0.25;
    this.isText = Math.random() < 0.38;       // 38 % are glyphs, rest shapes
    this.glyph  = choice(GLYPHS);
    this.shape  = choice(SHAPES);
    this.opMax  = rand(0.30, this.accent ? 0.65 : 0.45);
    this.op     = 0;
    this.age    = 0;
    this.life   = rand(300, 700);             // frames alive
    /* Push velocity (mouse scatter) */
    this.pvx    = 0;
    this.pvy    = 0;
  }

  update(mx, my) {
    this.age++;

    /* Fade in / out */
    const progress = this.age / this.life;
    if (progress < 0.12)      this.op = (progress / 0.12) * this.opMax;
    else if (progress > 0.78) this.op = ((1 - progress) / 0.22) * this.opMax;
    else                      this.op = this.opMax;

    /* Mouse scatter */
    const dx   = this.x - mx;
    const dy   = this.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const R    = 110;
    if (dist < R && dist > 1) {
      const f  = ((R - dist) / R) ** 2 * 2.2;
      this.pvx += (dx / dist) * f;
      this.pvy += (dy / dist) * f;
    }
    this.pvx *= 0.88;
    this.pvy *= 0.88;

    this.x   += this.vx + this.pvx;
    this.y   += this.vy + this.pvy;
    this.rot += this.rotV;

    /* Respawn when off screen or life ends */
    if (this.y < -120 || this.age > this.life) this.reset(true);
  }

  draw(ctx) {
    if (this.op <= 0.005) return;

    const [r, g, b] = this.accent ? ACCENT : MUTED;
    const color     = `rgba(${r},${g},${b},${this.op})`;

    ctx.save();

    if (this.isText) {
      /* ── Code glyph ── */
      const fs = Math.round(this.size * 0.95);
      ctx.font          = `500 ${fs}px 'Space Grotesk', monospace`;
      ctx.fillStyle     = color;
      ctx.textAlign     = 'center';
      ctx.textBaseline  = 'middle';
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot * 0.3);  // glyphs rotate less
      ctx.fillText(this.glyph, 0, 0);

    } else {
      /* ── Geometric shape (outline only) ── */
      ctx.strokeStyle = color;
      ctx.lineWidth   = 1.6 + (this.accent ? 0.7 : 0);
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';

      switch (this.shape) {
        case 'hexagon':
          hexPath(ctx, this.x, this.y, this.size, this.rot);
          ctx.stroke();
          break;

        case 'circle':
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case 'ring':
          /* Double concentric rings */
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = this.op * 0.4;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 0.58, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          break;

        case 'diamond':
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rot + Math.PI / 4);
          ctx.beginPath();
          ctx.rect(-this.size * 0.65, -this.size * 0.65,
                   this.size * 1.3,   this.size * 1.3);
          ctx.restore();
          ctx.stroke();
          break;

        case 'triangle':
          triPath(ctx, this.x, this.y, this.size, this.rot);
          ctx.stroke();
          break;

        case 'square':
          squarePath(ctx, this.x, this.y, this.size * 0.7, this.rot);
          ctx.stroke();
          break;

        default:
          break;
      }
    }

    ctx.restore();
  }
}

/* ── Component ── */
const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;
    let elements = [];
    let mouseX   = -9999;
    let mouseY   = -9999;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const W = canvas.width;
      const H = canvas.height;
      // Scale count with screen area
      const count = Math.round(28 * Math.min(1.4, (W * H) / (1280 * 900)));
      elements = Array.from({ length: count }, () => new FloatEl(W, H, false));
    };

    const onMove  = e => {
      const rc = canvas.getBoundingClientRect();
      mouseX = e.clientX - rc.left;
      mouseY = e.clientY - rc.top;
    };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      elements.forEach(el => {
        el.W = canvas.width;
        el.H = canvas.height;
        el.update(mouseX, mouseY);
        el.draw(ctx);
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position     : 'absolute',
        inset        : 0,
        width        : '100%',
        height       : '100%',
        zIndex       : 2,
        pointerEvents: 'none',
        display      : 'block',
      }}
    />
  );
};

export default HeroCanvas;
