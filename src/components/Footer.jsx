import React from 'react';
import Logo from './ui/Logo';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col with SVG Logo */}
          <div className="footer-brand">
            <Logo height={38} />
            <p className="footer-description">
              კამერული ბუტიკ-სასტუმრო ძველ თბილისში. ათი განმარტოებული ნომერი მე-19 საუკუნის ისტორიულ სავაჭრო სახლში.
            </p>
          </div>

          {/* Location & Address */}
          <div>
            <h4 className="footer-col-title">მისამართი</h4>
            <address className="footer-info-text" style={{ fontStyle: 'normal' }}>
              სასტუმრო ამარა<br />
              ამაღლების ქუჩა 14<br />
              სოლოლაკი, თბილისი 0105<br />
              საქართველო
            </address>
          </div>

          {/* Inquiries & Check-in line */}
          <div>
            <h4 className="footer-col-title">კონტაქტი და მიღება</h4>
            <p className="footer-info-text">
              ტელეფონი: +995 32 299 4410<br />
              ელფოსტა: <a href="mailto:info@amara-hotel.ge" style={{ color: 'var(--color-brass)' }}>info@amara-hotel.ge</a><br />
              რეგისტრაცია (Check-in): 15:00 &bull; გასვლა (Check-out): 12:00 &bull; მიღება 24/7
            </p>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>&copy; {new Date().getFullYear()} სასტუმრო ამარა (Amara Hotel LLC). ყველა უფლება დაცულია.</span>
          <span>სოლოლაკი &bull; ძველი თბილისი</span>
        </div>
      </div>
    </footer>
  );
}
