import React, { useState, useEffect } from 'react';
import Logo from './ui/Logo';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let rafNavId = null;
    const handleScroll = () => {
      if (rafNavId) return;
      rafNavId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 25);
        rafNavId = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafNavId) cancelAnimationFrame(rafNavId);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Brand Logo in Clean SVG */}
            <a href="#" className="brand-link" aria-label="სასტუმრო ამარა - მთავარი" onClick={() => setMobileOpen(false)}>
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

            {/* Mobile Menu Toggle Button */}
            <button
              className={`mobile-toggle ${mobileOpen ? 'is-active' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
              aria-expanded={mobileOpen}
            >
              <span className="toggle-line top" />
              <span className="toggle-line middle" />
              <span className="toggle-line bottom" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Luxury Full-Screen Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)} />
        <div className="mobile-drawer-sheet">
          <div className="mobile-drawer-header">
            <Logo height={34} />
            <button
              className="mobile-drawer-close"
              onClick={() => setMobileOpen(false)}
              aria-label="მენიუს დახურვა"
            >
              &times;
            </button>
          </div>

          <nav className="mobile-nav-items">
            <a
              href="#about"
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-nav-num">01</span>
              <span>ჩვენ შესახებ</span>
            </a>
            <a
              href="#walkthrough"
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-nav-num">02</span>
              <span>3D გასეირნება</span>
            </a>
            <a
              href="#rooms"
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-nav-num">03</span>
              <span>ნომრები</span>
            </a>
            <a
              href="#dining"
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-nav-num">04</span>
              <span>რესტორანი</span>
            </a>
            <a
              href="#location"
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-nav-num">05</span>
              <span>მდებარეობა</span>
            </a>
            <a
              href="#contact"
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-nav-num">06</span>
              <span>კონტაქტი</span>
            </a>
          </nav>

          <div className="mobile-drawer-actions">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="btn-primary mobile-drawer-btn"
            >
              ნომრის დაჯავშნა
            </button>

            <div className="mobile-drawer-contact">
              <a href="tel:+995322990011" className="mobile-contact-pill">
                📞 +995 (32) 299-0011
              </a>
              <span className="mobile-address-note">
                📍 გ. ლეონიძის ქუჩა 14, სოლოლაკი, თბილისი
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
