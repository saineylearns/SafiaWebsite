'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [showreel, setShowreel] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showreel ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showreel]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowreel(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="header-inner" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 'var(--header-height)',
      }}>
        <Link href="/" style={{
          fontSize: 16, fontWeight: 900, letterSpacing: '0.14em',
          textTransform: 'uppercase', fontFamily: "'Roboto Condensed', sans-serif",
          color: 'var(--color-foreground)',
        }}>
          Safia Touray
        </Link>

        <nav className="header-nav" style={{ display: 'flex', gap: 40 }}>
          {[
            { label: 'Work', href: '/work' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
          ].map(link => (
            <a key={link.label} href={link.href} className="nav-link" style={{
              fontSize: 13, fontWeight: 500, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--color-neutral-4)', transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-neutral-4)')}>
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/work" style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--color-foreground)', paddingBottom: 1,
            borderBottom: '1.5px solid var(--color-foreground)',
          }}>
            Work
          </Link>
          <button
            onClick={() => setShowreel(true)}
            className="ig-btn"
            style={{ fontSize: 11, padding: '6px 14px', background: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}
          >
            <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor">
              <path d="M0.5 1.5L10.5 6.5L0.5 11.5V1.5Z" />
            </svg>
            <span className="btn-label">Showreel</span>
          </button>
          <a href="https://www.instagram.com/safia.touray/" target="_blank" rel="noreferrer" className="ig-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
            </svg>
            <span className="btn-label">Instagram</span>
          </a>
        </div>
      </header>

      {/* ── Featured image ──────────────────────────────────── */}
      <section style={{ paddingTop: 'var(--header-height)', padding: `calc(var(--header-height) + 40px) 40px 0`, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: 560,
          aspectRatio: '2 / 3',
          background: '#f5f5f5',
          overflow: 'hidden',
        }}>
          <Image
            src="/images/series-1/01.jpg"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 560px"
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            priority
          />
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────── */}
      <section id="about" className="about-section" style={{ padding: '107px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 84, alignItems: 'start' }}>
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

          <div className="about-grid-right" style={{ paddingTop: 36 }}>
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
            <a href="#contact" style={{
              display: 'inline-block', padding: '14px 32px',
              background: 'var(--color-foreground)', color: 'var(--color-background)',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', borderRadius: 'var(--radius-xs)', transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* ── Manifesto ───────────────────────────────────────── */}
      <section className="manifesto-section" style={{ background: '#0a0a0a', padding: '100px 40px', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 900,
          fontSize: 'clamp(28px, 5vw, 64px)', letterSpacing: '0.04em',
          textTransform: 'uppercase', color: '#fff', lineHeight: 1.15,
          maxWidth: 900, margin: '0 auto 24px',
        }}>
          I shoot on film.<br />Every frame is intentional.
        </p>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
          No shortcuts. No filters. Just the moment.
        </p>
      </section>

      {/* ── Contact ─────────────────────────────────────────── */}
      <section id="contact" className="contact-section" style={{ padding: '107px 40px', maxWidth: 800, margin: '0 auto' }}>
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
            <div className="contact-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>First name</label>
                <input type="text" required placeholder="Your first name" value={form.firstName}
                  onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-foreground)')}
                  onBlur={e => (e.target.style.borderColor = '#e0e0e0')} />
              </div>
              <div>
                <label style={labelStyle}>Last name</label>
                <input type="text" required placeholder="Your last name" value={form.lastName}
                  onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-foreground)')}
                  onBlur={e => (e.target.style.borderColor = '#e0e0e0')} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" required placeholder="your@email.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--color-foreground)')}
                onBlur={e => (e.target.style.borderColor = '#e0e0e0')} />
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea required rows={5} placeholder="Tell me about your project..." value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-foreground)')}
                onBlur={e => (e.target.style.borderColor = '#e0e0e0')} />
            </div>
            <button type="submit" style={{
              alignSelf: 'flex-start', padding: '16px 40px',
              background: 'var(--color-foreground)', color: 'var(--color-background)',
              border: 'none', fontSize: 13, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              borderRadius: 'var(--radius-xs)', transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Send
            </button>
          </form>
        )}
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="footer-inner" style={{
        borderTop: '1px solid var(--color-border)', padding: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--color-neutral-4)',
      }}>
        <span style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-foreground)', fontSize: 13 }}>
          Safia Touray
        </span>
        <span>© {new Date().getFullYear()} — All rights reserved</span>
        <div className="footer-links" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="mailto:Safleahfilm@outlook.com" style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--color-neutral-4)', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-foreground)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-neutral-4)')}>
            Safleahfilm@outlook.com
          </a>
          <a href="https://www.instagram.com/safia.touray/" target="_blank" rel="noreferrer" className="ig-btn" style={{ fontSize: 11, padding: '6px 14px' }}>
            ↗ Instagram
          </a>
        </div>
      </footer>

      {/* ── Showreel modal ──────────────────────────────────── */}
      {showreel && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.25s ease',
          }}
          onClick={() => setShowreel(false)}
        >
          <div
            style={{ width: '90vw', maxWidth: 960, position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            <video
              src="/showreel.mp4"
              controls
              autoPlay
              style={{ width: '100%', display: 'block', borderRadius: 2 }}
            />
          </div>

          {/* close */}
          <button
            style={{
              position: 'fixed', top: 20, right: 20,
              width: 64, height: 64,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', color: '#fff', fontSize: 22, cursor: 'pointer',
            }}
            onClick={() => setShowreel(false)}
            onTouchEnd={e => { e.preventDefault(); setShowreel(false); }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
