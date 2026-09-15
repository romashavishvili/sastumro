import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Interactive element hover detection
    const handleOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor-hover]');
      if (target) {
        setIsHovered(true);
      }
    };

    const handleOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor-hover]');
      if (target) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    // Smooth RAF loop for follower lag
    let animationFrameId;
    const render = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:block`}
    >
      {/* Central Cursor Point */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-accent-cyan transition-transform will-change-transform"
        style={{
          boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff',
        }}
      />

      {/* Lagging Outer Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full border border-accent-cyan/60 pointer-events-none transition-[width,height,background-color,border-color] duration-200 ease-out will-change-transform ${
          isHovered
            ? 'w-16 h-16 -ml-8 -mt-8 bg-accent-cyan/15 border-accent-cyan scale-110 shadow-glow-cyan'
            : 'w-10 h-10 bg-transparent'
        }`}
      />
    </div>
  );
}
