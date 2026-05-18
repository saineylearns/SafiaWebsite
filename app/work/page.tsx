'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SERIES } from './seriesData';

export default function Work() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

      {/* ── Page title ──────────────────────────────────────── */}
      <div style={{ paddingTop: 'var(--header-height)', padding: `calc(var(--header-height) + 40px) 40px 32px` }}>
        <p style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-neutral-5)', marginBottom: 6, fontWeight: 500 }}>Selected Work</p>
        <h1 style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1 }}>
          Photography
        </h1>
      </div>

      {/* ── Series grid ─────────────────────────────────────── */}
      <div className="series-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
        padding: '0 40px 80px',
      }}>
        {SERIES.map(series => (
          <Link key={series.id} href={`/work/${series.id}`} style={{ display: 'block', textDecoration: 'none' }} className="series-card">
            <div style={{ position: 'relative', aspectRatio: '2 / 3', overflow: 'hidden', background: '#f5f5f5' }}>
              <Image
                src={series.cover}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                className="series-cover-img"
              />
            </div>
          </Link>
        ))}
      </div>

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
    </>
  );
}
