'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MARQUEE_WORDS = ['Portrait', 'Editorial', 'Documentary'];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      <style>{`
        @keyframes heroUp  { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }

        .hero-name {
          animation: heroUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .hero-sub {
          animation: heroUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both;
        }
        .hero-bar {
          animation: heroUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.38s both;
        }

        .work-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--color-foreground);
          border-bottom: 1.5px solid currentColor; padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .work-cta:hover { opacity: 0.5; }
      `}</style>

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="header-inner" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 'var(--header-height)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
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

        <a href="https://www.instagram.com/safia.touray/" target="_blank" rel="noreferrer" className="ig-btn">
          ↗ Instagram
        </a>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '0 40px 52px',
        position: 'relative',
      }}>
        {/* top label */}
        <p style={{
          position: 'absolute', top: 'calc(var(--header-height) + 28px)', left: 40,
          fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--color-neutral-5)', fontWeight: 500,
          animation: 'fadeIn 1s ease 0.5s both',
        }}>
          Film Photography · Manchester
        </p>

        {/* name */}
        <h1 className="hero-name" style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(72px, 14.5vw, 220px)',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          lineHeight: 0.88,
          marginBottom: 32,
        }}>
          Safia<br />Touray
        </h1>

        {/* bottom bar */}
        <div className="hero-bar" style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
              background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.22)',
            }} />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#22c55e',
            }}>
              Available for projects
            </span>
          </div>
          <Link href="/work" className="work-cta">
            View Work →
          </Link>
        </div>
      </section>

      {/* ── Featured image ──────────────────────────────────── */}
      <section style={{ width: '100%', height: '80vh', position: 'relative' }}>
        <Image
          src="/images/series-1/01.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          priority
        />
      </section>

      {/* ── Scrolling marquee ───────────────────────────────── */}
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
    </>
  );
}
