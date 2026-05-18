'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
const MARQUEE_WORDS = ['Portrait', 'Editorial', 'Documentary'];

/* ─── lightbox ────────────────────────────────────────────────────── */
function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
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
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease' }}
      onClick={onClose}
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) < 10) { onClose(); return; }
        if (dx < -60) onNext();
        if (dx > 60) onPrev();
        touchStartX.current = null;
      }}
    >
      <button onClick={e => { e.stopPropagation(); onClose(); }} onTouchEnd={e => { e.stopPropagation(); e.preventDefault(); onClose(); }}
        style={{ position: 'absolute', top: 0, right: 0, width: 64, height: 64, background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8, WebkitTapHighlightColor: 'transparent', zIndex: 10 }}
        aria-label="Close">×</button>
      <span style={{ position: 'absolute', top: 22, left: 20, color: 'rgba(255,255,255,0.45)', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'var(--font-sans)', fontWeight: 500, pointerEvents: 'none' }}>
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <button onClick={e => { e.stopPropagation(); onPrev(); }}
        style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 22, width: 56, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, WebkitTapHighlightColor: 'transparent' }}
        aria-label="Previous">←</button>
      <button onClick={e => { e.stopPropagation(); onNext(); }}
        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 22, width: 56, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, WebkitTapHighlightColor: 'transparent' }}
        aria-label="Next">→</button>
      <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%' }}
        onClick={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()}>
        <Image key={ALL_SRCS[index]} src={ALL_SRCS[index]} alt="" fill sizes="90vw" style={{ objectFit: 'contain' }} priority />
      </div>
    </div>
  );
}

/* ─── image cell ──────────────────────────────────────────────────── */
function ImgCell({ src, style, className, onClick }: {
  src: string; style: React.CSSProperties; className?: string; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={className} style={{ ...style, overflow: 'hidden', cursor: 'crosshair', position: 'relative' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}>
      <Image src={src} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
        style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }} />
    </div>
  );
}

/* ─── page ────────────────────────────────────────────────────────── */
export default function Work() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(() => setLightbox(i => i === null ? null : (i - 1 + ALL_SRCS.length) % ALL_SRCS.length), []);
  const nextImage = useCallback(() => setLightbox(i => i === null ? null : (i + 1) % ALL_SRCS.length), []);

  return (
    <>

      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="header-inner" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 'var(--header-height)',
        transition: 'background 0.3s ease',
      }}>
        <Link href="/" style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'Roboto Condensed', sans-serif", color: 'var(--color-foreground)' }}>
          Safia Touray
        </Link>

        <nav className="header-nav" style={{ display: 'flex', gap: 40 }}>
          {[
            { label: 'Work', href: '/work' },
            { label: 'About', href: '/#about' },
            { label: 'Contact', href: '/#contact' },
          ].map(link => (
            <Link key={link.label} href={link.href} className="nav-link" style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: link.href === '/work' ? 'var(--color-foreground)' : 'var(--color-neutral-4)' }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a href="https://www.instagram.com/safia.touray/" target="_blank" rel="noreferrer" className="ig-btn">
          ↗ Instagram
        </a>
      </header>

      {/* ── Work header ─────────────────────────────────────── */}
      <div style={{ paddingTop: 'var(--header-height)', borderBottom: '1px solid var(--color-border)', padding: `calc(var(--header-height) + 32px) 40px 24px` }}>
        <p style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-neutral-5)', marginBottom: 8, fontWeight: 500 }}>Selected Work</p>
        <h1 style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1 }}>
          Photography
        </h1>
      </div>

      {/* ── Grid ────────────────────────────────────────────── */}
      <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(5, 340px)', gap: 8 }}>
        {GRID_IMAGES.map((img, i) => (
          <ImgCell
            key={i} src={img.src}
            onClick={() => openLightbox(i)}
            className={img.colSpan === 3 ? 'hero-cell hero-cell-wide' : 'hero-cell'}
            style={{ gridColumn: `${img.col} / span ${img.colSpan}`, gridRow: `${img.row} / span ${img.rowSpan}` }}
          />
        ))}
      </div>

      {/* ── Marquee ─────────────────────────────────────────── */}
      <section style={{ background: '#0a0a0a', overflow: 'hidden', padding: '28px 0', userSelect: 'none' }}>
        <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'marquee 45s linear infinite' }}>
          {[0, 1].map(n => (
            <span key={n} style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>
                  {MARQUEE_WORDS.map((word, j) => (
                    <span key={j}>
                      <span style={{ fontWeight: 900, fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff' }}>{word}</span>
                      <span style={{ fontWeight: 900, fontSize: 'clamp(22px, 3vw, 36px)', color: '#c9924a', margin: '0 0.45em' }}>·</span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="footer-inner" style={{ borderTop: '1px solid var(--color-border)', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--color-neutral-4)' }}>
        <span style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-foreground)', fontSize: 13 }}>Safia Touray</span>
        <span>© {new Date().getFullYear()} — All rights reserved</span>
        <div className="footer-links" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="mailto:Safleahfilm@outlook.com" style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--color-neutral-4)', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-neutral-4)')}>
            Safleahfilm@outlook.com
          </a>
          <a href="https://www.instagram.com/safia.touray/" target="_blank" rel="noreferrer" className="ig-btn" style={{ fontSize: 11, padding: '6px 14px' }}>↗ Instagram</a>
        </div>
      </footer>
    </>
  );
}
