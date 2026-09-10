import React, { useState, useEffect, useRef, Suspense } from 'react';
import WalkthroughCanvas from './3d/walkthrough/WalkthroughCanvas';

export default function HotelWalkthrough() {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const containerRef = useRef(null);
  const lookOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const rooms = [
    {
      id: 'bedroom',
      name: 'კამერული საძინებელი',
      subtitle: 'სივრცე 01 // სიმშვიდე და სიჩუმე',
      atmosphere: 'ხელით ნათალი კაკლის ხის ავეჯი, ძველი აგურის თაღი და რბილი საღამოს განათება.',
      details: ['კაკლის ხის საწოლი', 'ბუნებრივი სელის თეთრეული', 'თბილი საღამოს სანათი', 'მუხის იატაკი'],
      badge: 'პირადი სივრცე',
    },
    {
      id: 'lounge',
      name: 'მოსასვენებელი სალონი',
      subtitle: 'სივრცე 02 // ბუხარი და ბიბლიოთეკა',
      atmosphere: 'მოქმედი თუჯის ბუხარი, საუკუნოვანი ბიბლიოთეკა და მყუდრო ტახტები საღამოს საუბრებისთვის.',
      details: ['თუჯის ბუხარი', 'ვინილის კოლექცია', 'ქართული ლიტერატურა', 'ხავერდის სავარძლები'],
      badge: 'საღამოს ჰარმონია',
    },
    {
      id: 'breakfast',
      name: 'საუზმის დარბაზი',
      subtitle: 'სივრცე 03 // დილის მზე და არომატები',
      atmosphere: 'ახალგამომცხვარი დედას პურის, მთის მცენარეული ჩაისა და მაღალ თაღებში შემომავალი დილის სინათლე.',
      details: ['თიხის ჭურჭელი', 'ცხელი ჩაის სამოვარი', 'დილის მზის თაღები', 'ადგილობრივი ყველი'],
      badge: 'კულინარიული რიტუალი',
    },
    {
      id: 'courtyard',
      name: 'ისტორიული ეზო',
      subtitle: 'სივრცე 04 // ასწლოვანი ლეღვის ჩრდილი',
      atmosphere: 'ძველი თბილისური მოკირწყლული ეზო, ჩუქურთმიანი ხის აივნები და საღამოს თბილად განათებული ფარნები.',
      details: ['1894 წლის მოკირწყვლა', 'ჭვირული ხის აივნები', 'ასწლოვანი ლეღვის ხე', 'თითბერის ფარნები'],
      badge: 'შენობის გული',
    },
  ];

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 350);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener tracking progress through the 3D walkthrough track
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollHeight = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollHeight, 0), 1);
      setScrollProgress(progress);

      const index = Math.min(Math.floor(progress * rooms.length), rooms.length - 1);
      setActiveRoomIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [rooms.length]);

  // Clickable Navigation dots
  const scrollToRoom = (index) => {
    if (!containerRef.current) return;
    const totalScrollHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetOffset = containerRef.current.offsetTop + (index / (rooms.length - 1)) * totalScrollHeight;
    window.scrollTo({ top: targetOffset, behavior: 'smooth' });
  };

  // Drag-to-look around handlers (Desktop Mouse & Mobile Touch)
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    setShowHint(false);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = (e.clientX - dragStart.current.x) / window.innerWidth;
    const deltaY = (e.clientY - dragStart.current.y) / window.innerHeight;

    lookOffset.current = {
      x: Math.max(Math.min(deltaX * 3.5, 1.2), -1.2),
      y: Math.max(Math.min(deltaY * 3.0, 0.8), -0.8),
    };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    // Spring back gently to center orientation
    const easeBack = () => {
      if (isDragging.current) return;
      lookOffset.current = {
        x: lookOffset.current.x * 0.92,
        y: lookOffset.current.y * 0.92,
      };
      if (Math.abs(lookOffset.current.x) > 0.005 || Math.abs(lookOffset.current.y) > 0.005) {
        requestAnimationFrame(easeBack);
      } else {
        lookOffset.current = { x: 0, y: 0 };
      }
    };
    easeBack();
  };

  const currentRoom = rooms[activeRoomIndex] || rooms[0];

  return (
    <section id="walkthrough" ref={containerRef} className="walkthrough-track">
      <div
        className="walkthrough-sticky"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Loading Indicator */}
        <div
          className="canvas-loader"
          style={{
            opacity: isLoaded ? 0 : 1,
            pointerEvents: isLoaded ? 'none' : 'auto',
          }}
        >
          <div className="spinner-ring" />
          <span className="loader-text">3D სივრცეების მომზადება...</span>
        </div>

        {/* Top Status Bar */}
        <div className="walkthrough-topbar container">
          <div className="walkthrough-tag">
            <span className="walkthrough-pulse-dot" />
            <span>ინტერაქციული 3D გასეირნება &bull; ოთახიდან ოთახში</span>
          </div>

          <div className="walkthrough-counter">
            <span className="counter-current">0{activeRoomIndex + 1}</span>
            <span className="counter-divider">/</span>
            <span className="counter-total">0{rooms.length}</span>
          </div>
        </div>

        {/* Full Interactive 3D WebGL Canvas */}
        <div className="walkthrough-stage">
          <Suspense fallback={null}>
            <WalkthroughCanvas scrollProgress={scrollProgress} lookOffset={lookOffset} />
          </Suspense>
        </div>

        {/* Active Room Caption Card */}
        <div className="scene-caption-container container" style={{ pointerEvents: 'none' }}>
          <div className="scene-caption-card" style={{ pointerEvents: 'auto' }}>
            <div className="caption-badge">{currentRoom.badge}</div>
            <span className="caption-subtitle">{currentRoom.subtitle}</span>
            <h2 className="caption-title">{currentRoom.name}</h2>
            <p className="caption-atmosphere">{currentRoom.atmosphere}</p>

            <div className="caption-details-row">
              {currentRoom.details.map((detail, dIdx) => (
                <span key={dIdx} className="caption-pill">
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Side Navigation Dots */}
        <aside className="walkthrough-navigation" aria-label="3D სივრცეების ნავიგაცია">
          <div className="nav-dots-wrapper">
            {rooms.map((room, idx) => (
              <button
                key={room.id}
                onClick={() => scrollToRoom(idx)}
                className={`nav-dot-item ${activeRoomIndex === idx ? 'dot-active' : ''}`}
                aria-label={room.name}
              >
                <span className="dot-bullet" />
                <span className="dot-label">{room.name}</span>
              </button>
            ))}
          </div>

          {/* Interactive Hint Indicator */}
          {showHint && (
            <div className="walkthrough-hint">
              <span>გადააადგილეთ დასათვალიერებლად</span>
              <span className="hint-arrow">&harr;</span>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
