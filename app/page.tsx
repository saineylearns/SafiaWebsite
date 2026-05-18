'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

/* ─── images ──────────────────────────────────────────────────────── */
const GRID_IMAGES = [
  { src: '/images/series-2/01.jpg', col: 1, row: 1, colSpan: 1, rowSpan: 2 },
  { src: '/images/series-1/01.jpg', col: 2, row: 1, colSpan: 1, rowSpan: 1 },
  { src: '/images/series-3/01.jpg', col: 3, row: 1, colSpan: 1, rowSpan: 1 },
  { src: '/images/series-1/02.jpg', col: 2, row: 2, colSpan: 1, rowSpan: 1 },
  { src: '/images/series-3/02.jpg', col: 3, row: 2, colSpan: 1, rowSpan: 1 },
  { src: '/images/series-2/02.jpg', col: 1, row: 3, colSpan: 1, rowSpan: 1 },
  { src: '/images/series-2/03.jpg', col: 2, row: 3, colSpan: 1, rowSpan: 2 },
  { src: '/images/series-3/03.jpg', col: 3, row: 3, colSpan: 1, rowSpan: 1 },
  { src: '/images/series-2/04.jpg', col: 1, row: 4, colSpan: 1, rowSpan: 1 },
  { src: '/images/series-3/04.jpg', col: 3, row: 4, colSpan: 1, rowSpan: 1 },
  { src: '/images/series-2/05.jpg', col: 1, row: 5, colSpan: 3, rowSpan: 1 },
];

const ALL_SRCS = GRID_IMAGES.map(i => i.src);
const NAV_LINKS = ['Work', 'About', 'Contact'];
const MARQUEE_WORDS = ['Portrait', 'Editorial', 'Documentary'];

/* ─── lightbox ────────────────────────────────────────────────────── */
function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const total = ALL_SRCS.length;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (dx < -60) onNext();
        if (dx > 60) onPrev();
        touchStartX.current = null;
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#fff', fontSize: 28, lineHeight: 1, padding: '8px 12px',
          opacity: 0.7, transition: 'opacity 0.15s',
          fontFamily: 'var(--font-sans)',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
        aria-label="Close"
      >
        ×
      </button>

      <span style={{
        position: 'absolute', top: 28, left: 24,
        color: 'rgba(255,255,255,0.45)',
        fontSize: 12, letterSpacing: '0.15em',
        fontFamily: 'var(--font-sans)', fontWeight: 500,
      }}>
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        style={{
          position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#fff', fontSize: 22, padding: '16px 12px',
          opacity: 0.5, transition: 'opacity 0.15s',
          fontFamily: 'var(--font-sans)',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
        aria-label="Previous"
      >
        ←
      </button>

      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        style={{
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#fff', fontSize: 22, padding: '16px 12px',
          opacity: 0.5, transition: 'opacity 0.15s',
          fontFamily: 'var(--font-sans)',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
        aria-label="Next"
      >
        →
      </button>

      <div
        style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%' }}
        onClick={e => e.stopPropagation()}
      >
        <Image
          key={ALL_SRCS[index]}
          src={ALL_SRCS[index]}
          alt=""
          fill
          sizes="90vw"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
}

/* ─── grid image cell ─────────────────────────────────────────────── */
function ImgCell({ src, style, onClick }: {
  src: string;
  style: React.CSSProperties;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...style, overflow: 'hidden', cursor: 'crosshair', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{
          objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />
    </div>
  );
}

/* ─── page ────────────────────────────────────────────────────────── */
export default function Home() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(() => setLightbox(i => i === null ? null : (i - 1 + ALL_SRCS.length) % ALL_SRCS.length), []);
  const nextImage = useCallback(() => setLightbox(i => i === null ? null : (i + 1) % ALL_SRCS.length), []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ firstName: '', lastName: '', email: '', message: '' }); }, 3500);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    border: '1px solid #e0e0e0', borderRadius: 'var(--radius-xs)',
    fontSize: 16, fontFamily: 'inherit', outline: 'none',
    background: '#fff', color: 'var(--color-foreground)',
    transition: 'border-color 0.15s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12,
    letterSpacing: '0.15em', textTransform: 'uppercase' as const,
    marginBottom: 8, color: 'var(--color-neutral-4)', fontWeight: 500,
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes marquee {
          from { transform: translateX(0) }
          to { transform: translateX(-50%) }
        }
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: currentColor;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .ig-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 18px;
          border: 1.5px solid #000;
          border-radius: 100px;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #000; background: transparent;
          transition: background 0.18s ease, color 0.18s ease;
          white-space: nowrap;
        }
        .ig-btn:hover { background: #000; color: #fff; }
      `}</style>

      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}

      {/* ── Header ──────────────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 'var(--header-height)',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      }}>
        <a href="#" style={{
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontFamily: "'Roboto Condensed', sans-serif",
          color: 'var(--color-foreground)',
        }}>
          Safia Touray
        </a>

        <nav style={{ display: 'flex', gap: 40 }}>
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link"
              style={{
                fontSize: 13, fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--color-neutral-4)',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-neutral-4)')}
            >
              {link}
            </a>
          ))}
        </nav>

        <a
          href="https://www.instagram.com/safia.touray/"
          target="_blank" rel="noreferrer"
          className="ig-btn"
        >
          ↗ Instagram
        </a>
      </header>

      {/* ── Hero grid ───────────────────────────────────────── */}
      <section id="work" style={{ marginTop: 'var(--header-height)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(5, 340px)',
          gap: 8,
        }}>
          {GRID_IMAGES.map((img, i) => (
            <ImgCell
              key={i}
              src={img.src}
              onClick={() => openLightbox(i)}
              style={{
                gridColumn: `${img.col} / span ${img.colSpan}`,
                gridRow: `${img.row} / span ${img.rowSpan}`,
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Scrolling marquee ───────────────────────────────── */}
      <section
        style={{
          background: '#0a0a0a',
          overflow: 'hidden',
          padding: '28px 0',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        <div style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: `marquee 45s linear infinite`,
        }}>
          {[0, 1].map(n => (
            <span key={n} style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>
                  {MARQUEE_WORDS.map((word, j) => (
                    <span key={j}>
                      <span style={{
                        fontWeight: 900,
                        fontSize: 'clamp(22px, 3vw, 36px)',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#fff',
                      }}>{word}</span>
                      <span style={{
                        fontWeight: 900,
                        fontSize: 'clamp(22px, 3vw, 36px)',
                        color: '#c9924a',
                        margin: '0 0.45em',
                      }}>·</span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────── */}
      <section id="about" style={{ padding: '107px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 84, alignItems: 'start' }}>
          <div>
            <h2 style={{
              fontSize: 33, fontWeight: 900, letterSpacing: '6px',
              textTransform: 'uppercase', lineHeight: 1, marginBottom: 50,
              fontFamily: "'Roboto Condensed', sans-serif",
            }}>
              About
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--color-neutral-1)', marginBottom: 25 }}>
              {"I'm a film photographer based in Manchester with a distinctive eye for portraiture, editorial and documentary work. I capture people in their element — honest, close, unhurried."}
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--color-neutral-4)' }}>
              {"I'm available for editorial, brand, and personal projects across the UK and beyond."}
            </p>
          </div>

          <div style={{ paddingTop: 36 }}>
            {/* availability tag */}
            <div style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 0 3px rgba(34,197,94,0.22)',
              }} />
              <span style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#22c55e',
              }}>
                Currently available
              </span>
            </div>

            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-neutral-5)', marginBottom: 16, fontWeight: 500 }}>Based in</p>
              <p style={{ fontSize: 21, fontWeight: 600 }}>Manchester, UK</p>
            </div>
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-neutral-5)', marginBottom: 16, fontWeight: 500 }}>Discipline</p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--color-neutral-1)' }}>
                Film Photography<br />Portraiture<br />Editorial<br />Documentary
              </p>
            </div>
            <a
              href="#contact"
              style={{
                display: 'inline-block', padding: '14px 32px',
                background: 'var(--color-foreground)', color: 'var(--color-background)',
                fontSize: 13, fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', borderRadius: 'var(--radius-xs)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* ── Manifesto ───────────────────────────────────────── */}
      <section style={{
        background: '#0a0a0a',
        padding: '100px 40px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(28px, 5vw, 64px)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#fff',
          lineHeight: 1.15,
          maxWidth: 900,
          margin: '0 auto 24px',
        }}>
          I shoot on film.<br />Every frame is intentional.
        </p>
        <p style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          No shortcuts. No filters. Just the moment.
        </p>
      </section>

      {/* ── Contact ─────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '107px 40px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 33, fontWeight: 900, letterSpacing: '6px',
          textTransform: 'uppercase', marginBottom: 16,
          fontFamily: "'Roboto Condensed', sans-serif",
        }}>
          Contact
        </h2>
        <p style={{ fontSize: 16, color: 'var(--color-neutral-4)', marginBottom: 50 }}>
          {"Enquiries for editorial, commercial, and personal projects — I'd love to hear from you."}
        </p>

        {sent ? (
          <p style={{ fontSize: 18, fontWeight: 500 }}>{"Message sent — I'll be in touch soon."}</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>First name</label>
                <input
                  type="text" required placeholder="Your first name"
                  value={form.firstName}
                  onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-foreground)')}
                  onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
                />
              </div>
              <div>
                <label style={labelStyle}>Last name</label>
                <input
                  type="text" required placeholder="Your last name"
                  value={form.lastName}
                  onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-foreground)')}
                  onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email" required placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--color-foreground)')}
                onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
              />
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                required rows={5} placeholder="Tell me about your project..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-foreground)')}
                onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
              />
            </div>
            <button
              type="submit"
              style={{
                alignSelf: 'flex-start', padding: '16px 40px',
                background: 'var(--color-foreground)', color: 'var(--color-background)',
                border: 'none', fontSize: 13, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                borderRadius: 'var(--radius-xs)', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Send
            </button>
          </form>
        )}
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
        fontSize: 13, color: 'var(--color-neutral-4)',
      }}>
        <span style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontWeight: 900, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--color-foreground)', fontSize: 13,
        }}>
          Safia Touray
        </span>
        <span>© {new Date().getFullYear()} — All rights reserved</span>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a
            href="mailto:Safleahfilm@outlook.com"
            style={{
              fontSize: 13, letterSpacing: '0.06em',
              color: 'var(--color-neutral-4)', transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-neutral-4)')}
          >
            Safleahfilm@outlook.com
          </a>
          <a
            href="https://www.instagram.com/safia.touray/"
            target="_blank" rel="noreferrer"
            className="ig-btn"
            style={{ fontSize: 11, padding: '6px 14px' }}
          >
            ↗ Instagram
          </a>
        </div>
      </footer>
    </>
  );
}
