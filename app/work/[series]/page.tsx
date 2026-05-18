'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SERIES } from '../seriesData';
import { notFound } from 'next/navigation';

export default function SeriesPage({ params }: { params: Promise<{ series: string }> }) {
  const { series: seriesId } = use(params);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const series = SERIES.find(s => s.id === seriesId);
  if (!series) notFound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => i !== null ? Math.min(i + 1, series!.images.length - 1) : null);
      if (e.key === 'ArrowLeft') setLightbox(i => i !== null ? Math.max(i - 1, 0) : null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, series]);

  return (
    <>
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
            <Link key={link.label} href={link.href} className="nav-link" style={{
              fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: link.href === '/work' ? 'var(--color-foreground)' : 'var(--color-neutral-4)',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>
        <a href="https://www.instagram.com/safia.touray/" target="_blank" rel="noreferrer" className="ig-btn">
          ↗ Instagram
        </a>
      </header>

      {/* ── Page header ─────────────────────────────────────── */}
      <div style={{ paddingTop: 'var(--header-height)', padding: `calc(var(--header-height) + 40px) 40px 32px` }}>
        <Link href="/work" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--color-neutral-4)', marginBottom: 24,
          transition: 'color 0.15s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-neutral-4)')}>
          ← Work
        </Link>
        <p style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-neutral-5)', marginBottom: 6, fontWeight: 500 }}>Series {series.label}</p>
        <h1 style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1 }}>
          {series.images.length} Frames
        </h1>
      </div>

      {/* ── Image grid ──────────────────────────────────────── */}
      <div className="series-detail-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
        padding: '0 40px 80px',
      }}>
        {series.images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            style={{
              display: 'block', background: 'none', border: 'none', padding: 0,
              cursor: 'zoom-in', textAlign: 'left',
            }}
          >
            <div style={{
              position: 'relative', aspectRatio: '2 / 3', overflow: 'hidden',
              background: '#f5f5f5',
              border: '12px solid #fff',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}>
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                className="series-cover-img"
              />
            </div>
            <p style={{ paddingTop: 8, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-neutral-5)', fontWeight: 700 }}>
              {String(i + 1).padStart(2, '0')}
            </p>
          </button>
        ))}
      </div>

      {/* ── Marquee ─────────────────────────────────────────── */}
      <section style={{ background: '#0a0a0a', overflow: 'hidden', padding: '28px 0', userSelect: 'none' }}>
        <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'marquee 45s linear infinite' }}>
          {[0, 1].map(n => (
            <span key={n} style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>
                  {['Portrait', 'Editorial', 'Documentary'].map((word, j) => (
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
          <a href="mailto:Safleahfilm@outlook.com" style={{ fontSize: 13, color: 'var(--color-neutral-4)', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-neutral-4)')}>
            Safleahfilm@outlook.com
          </a>
          <a href="https://www.instagram.com/safia.touray/" target="_blank" rel="noreferrer" className="ig-btn" style={{ fontSize: 11, padding: '6px 14px' }}>↗ Instagram</a>
        </div>
      </footer>

      {/* ── Lightbox ────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setLightbox(null)}
        >
          {/* image */}
          <div
            style={{ position: 'relative', maxWidth: '88vw', maxHeight: '88vh', width: '100%', height: '100%' }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={series.images[lightbox]}
              alt=""
              fill
              sizes="88vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          {/* close */}
          <button
            style={{
              position: 'fixed', top: 20, right: 20,
              width: 64, height: 64,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', color: '#fff', fontSize: 22, cursor: 'pointer',
            }}
            onClick={e => { e.stopPropagation(); setLightbox(null); }}
            onTouchEnd={e => { e.stopPropagation(); e.preventDefault(); setLightbox(null); }}
          >
            ×
          </button>

          {/* prev */}
          {lightbox > 0 && (
            <button
              style={{
                position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
                width: 64, height: 64,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%', color: '#fff', fontSize: 22, cursor: 'pointer',
              }}
              onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? i - 1 : null); }}
              onTouchEnd={e => { e.stopPropagation(); e.preventDefault(); setLightbox(i => i !== null ? i - 1 : null); }}
            >
              ‹
            </button>
          )}

          {/* next */}
          {lightbox < series.images.length - 1 && (
            <button
              style={{
                position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
                width: 64, height: 64,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%', color: '#fff', fontSize: 22, cursor: 'pointer',
              }}
              onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? i + 1 : null); }}
              onTouchEnd={e => { e.stopPropagation(); e.preventDefault(); setLightbox(i => i !== null ? i + 1 : null); }}
            >
              ›
            </button>
          )}

          {/* counter */}
          <div style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)',
            fontWeight: 700, textTransform: 'uppercase',
          }}>
            {lightbox + 1} / {series.images.length}
          </div>
        </div>
      )}
    </>
  );
}
