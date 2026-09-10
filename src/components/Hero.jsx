import React from 'react';
import ChandelierScene from './3d/ChandelierScene';

export default function Hero({ mouse, scrollProgress, onOpenBooking }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Editorial Headline & Story Content */}
          <div className="hero-content">
            <div className="hero-tag">
              სოლოლაკი, ამაღლების ქუჩა &bull; 1894
            </div>

            <h1 className="hero-headline">
              სიმშვიდე ძველი თბილისის ჩრდილიან ეზოებსა და ისტორიულ კედლებს შორის.
            </h1>

            <p className="hero-description">
              მე-19 საუკუნის დასასრულს აგებული ქალაქური სახლი სოლოლაკის წყნარ უბანში. ათი კამერული ნომერი, ხელით დამუშავებული კაკლის ხის ავეჯი, ძველი ქართული აგური და სიმშვიდე, რომელიც ქალაქის ხმაურს ავიწყებს სტუმარს.
            </p>

            <div className="hero-actions">
              <button
                onClick={() => onOpenBooking()}
                className="btn-primary"
              >
                დაჯავშნეთ ნომერი
              </button>

              <a href="#rooms" className="btn-secondary">
                ნომრების დათვალიერება &darr;
              </a>
            </div>

            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="hero-meta-number">10</span>
                <span className="hero-meta-label">კამერული ნომერი</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-number">1894</span>
                <span className="hero-meta-label">შენობის აგების წელი</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-number">24/7</span>
                <span className="hero-meta-label">პერსონალური მასპინძლობა</span>
              </div>
            </div>
          </div>

          {/* 3D Physical Chandelier Visual with Scroll Reaction */}
          <div className="hero-visual">
            <ChandelierScene mouse={mouse} scrollProgress={scrollProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}
