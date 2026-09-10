import React, { useState, useEffect } from 'react';
import Logo from './ui/Logo';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo in Clean SVG */}
          <a href="#" className="brand-link" aria-label="სასტუმრო ამარა - მთავარი">
            <Logo height={40} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            <a href="#about" className="nav-link">ჩვენ შესახებ</a>
            <a href="#walkthrough" className="nav-link">გასეირნება</a>
            <a href="#rooms" className="nav-link">ნომრები</a>
            <a href="#dining" className="nav-link">რესტორანი</a>
            <a href="#location" className="nav-link">მდებარეობა</a>
            <a href="#contact" className="nav-link">კონტაქტი</a>
            <button
              onClick={() => onOpenBooking()}
              className="btn-book"
            >
              დაჯავშნა
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="მენიუს გახსნა"
          >
            <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(4px, -5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              padding: '22px 0 12px',
              borderTop: '1px solid var(--color-border)',
              marginTop: '16px',
            }}
          >
            <a
              href="#about"
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              ჩვენ შესახებ
            </a>
            <a
              href="#walkthrough"
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              გასეირნება
            </a>
            <a
              href="#rooms"
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              ნომრები
            </a>
            <a
              href="#dining"
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              რესტორანი
            </a>
            <a
              href="#location"
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              მდებარეობა
            </a>
            <a
              href="#contact"
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              კონტაქტი
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="btn-book"
              style={{ width: '100%', marginTop: '6px' }}
            >
              დაჯავშნა
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
