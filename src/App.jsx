import React, { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingSection from './components/BookingSection';
import About from './components/About';
import HotelWalkthrough from './components/HotelWalkthrough';
import Rooms from './components/Rooms';
import Reviews from './components/Reviews';
import Dining from './components/Dining';
import LocationAndInfo from './components/LocationAndInfo';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import IntroSequence from './components/IntroSequence';

export default function App() {
  const mouse = useRef({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingRoom, setBookingRoom] = useState('');

  const rafScrollId = useRef(null);
  const rafPointerId = useRef(null);

  // Track mouse coordinates for physical 3D parallax tilt with rAF throttle
  const handlePointerMove = (e) => {
    if (rafPointerId.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    rafPointerId.current = requestAnimationFrame(() => {
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      mouse.current = { x, y };
      rafPointerId.current = null;
    });
  };

  // Scroll listener: calculates progress for hero 3D shrinking and translation via rAF
  useEffect(() => {
    const handleScroll = () => {
      if (rafScrollId.current) return;
      rafScrollId.current = requestAnimationFrame(() => {
        const heroHeight = window.innerHeight * 0.9;
        const currentScroll = window.scrollY;
        const progress = Math.min(Math.max(currentScroll / heroHeight, 0), 1);
        setScrollProgress(progress);
        rafScrollId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafScrollId.current) cancelAnimationFrame(rafScrollId.current);
      if (rafPointerId.current) cancelAnimationFrame(rafPointerId.current);
    };
  }, []);

  const handleOpenBooking = (roomName = '') => {
    // If roomName provided, smooth scroll to booking section or open modal
    if (roomName) {
      setBookingRoom(roomName);
      setIsBookingOpen(true);
    } else {
      const bookingEl = document.getElementById('booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsBookingOpen(true);
      }
    }
  };

  return (
    <div onPointerMove={handlePointerMove} className="app-root">
      {/* Animated Entrance Sequence Overlay (First visit per session) */}
      <IntroSequence />

      {/* Subtle Noise / Film Grain Overlay */}
      <div className="noise-overlay" />

      {/* Navigation Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Experience */}
      <main>
        <Hero
          mouse={mouse}
          scrollProgress={scrollProgress}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Integrated Dedicated Booking Form Bar */}
        <BookingSection />

        {/* Townhouse Story & Heritage */}
        <About />

        {/* Interactive Scroll-Driven Hotel Walkthrough */}
        <HotelWalkthrough />

        {/* Curated Rooms Directory with Real Photography */}
        <Rooms onOpenBooking={(roomName) => handleOpenBooking(roomName)} />

        {/* Verified Guest Reviews & Testimonials */}
        <Reviews />

        {/* Courtyard Dining & Cellar */}
        <Dining />

        {/* Location Map & Practical Policies */}
        <LocationAndInfo />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Reservation Dialog Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultRoom={bookingRoom}
      />
    </div>
  );
}
