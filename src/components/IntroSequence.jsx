import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function IntroSequence() {
  // Always active on full page load or manual refresh
  const [isVisible, setIsVisible] = useState(true);

  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const progressRef = useRef(0);
  const animFrameRef = useRef(null);
  const isFinishedRef = useRef(false);

  // Clean up any legacy sessionStorage flag from previous sessions
  useEffect(() => {
    try {
      sessionStorage.removeItem('amara_has_seen_intro');
    } catch {
      // Ignore private browsing restrictions
    }
  }, []);

  // Complete and exit sequence smoothly
  const triggerExit = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setProgress(100);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Small beat at 100% before curtain lift
    const exitDelay = prefersReducedMotion ? 50 : 220;
    setTimeout(() => {
      setIsExiting(true);

      // Unmount after exit transition completes
      const unmountDuration = prefersReducedMotion ? 250 : 850;
      setTimeout(() => {
        setIsVisible(false);
      }, unmountDuration);
    }, exitDelay);
  }, []);

  // Skip immediately on any user action (click, tap, scroll, keypress)
  const handleSkip = useCallback(() => {
    triggerExit();
  }, [triggerExit]);

  // Real asset loading tracker
  useEffect(() => {
    if (!isVisible) return;

    let targetProgress = 15;
    let isCancelled = false;

    // 1. Font readiness
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!isCancelled) targetProgress = Math.max(targetProgress, 45);
      });
    }

    // 2. Document ready state
    if (document.readyState === 'complete') {
      targetProgress = Math.max(targetProgress, 75);
    } else {
      const handleLoad = () => {
        if (!isCancelled) targetProgress = Math.max(targetProgress, 85);
      };
      window.addEventListener('load', handleLoad, { once: true });
    }

    // 3. Smooth progress interpolation loop
    const startTime = performance.now();
    const updateProgress = () => {
      if (isCancelled || isFinishedRef.current) return;

      const elapsed = performance.now() - startTime;

      // Natural gradual ramp towards targetProgress
      if (elapsed > 300 && targetProgress < 60) targetProgress = 60;
      if (elapsed > 700 && targetProgress < 85) targetProgress = 85;

      // Finish by max duration (2.0s safety cap)
      if (elapsed >= 1600 || targetProgress >= 99) {
        targetProgress = 100;
      }

      // Smooth dampening towards targetProgress
      const diff = targetProgress - progressRef.current;
      progressRef.current += Math.max(diff * 0.12, 1.2);

      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        triggerExit();
        return;
      }

      setProgress(Math.floor(progressRef.current));
      animFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    // Global skip listeners on user intent
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
      }
    };

    const handleWheel = () => {
      handleSkip();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      isCancelled = true;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isVisible, triggerExit, handleSkip]);

  if (!isVisible) return null;

  return (
    <aside
      className={`intro-overlay ${isExiting ? 'intro-exiting' : ''}`}
      onClick={handleSkip}
      role="status"
      aria-live="polite"
      aria-label="სასტუმრო ამარა - შესავალი"
    >
      {/* Background Architectural Curtain Layer */}
      <div className="intro-curtain">
        {/* Subtle Heritage Crest / Monogram Ornament */}
        <div className="intro-crest">
          <svg
            className="intro-crest-svg"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="21" stroke="#C9A227" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
            <path
              d="M24 10V38M14 24H34M17 17L31 31M31 17L17 31"
              stroke="#C9A227"
              strokeWidth="0.75"
              opacity="0.4"
            />
            <path
              d="M24 16L27 24L24 32L21 24Z"
              fill="#C9A227"
              opacity="0.75"
            />
          </svg>
        </div>

        {/* Central Hotel Name Reveal */}
        <div className="intro-content">
          <span className="intro-heritage-tag">სოლოლაკი • 1894 • თბილისი</span>

          <h1 className="intro-title">
            <span className="intro-title-text">სასტუმრო ამარა</span>
          </h1>

          <p className="intro-subtitle">HOTEL AMARA TBILISI</p>
        </div>

        {/* Minimal Progress Indicator */}
        <div className="intro-footer">
          <div className="intro-progress-track">
            <div
              className="intro-progress-bar"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>

          <div className="intro-status-row">
            <span className="intro-status-text">
              {progress < 100 ? 'შესასვლელის მომზადება...' : 'კეთილი იყოს თქვენი მობრძანება'}
            </span>
            <span className="intro-percentage">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>
        </div>

        {/* Subtle Skip Hint Button */}
        <button
          type="button"
          className="intro-skip-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          aria-label="შესავლის გამოტოვება"
        >
          <span>გამოტოვება</span>
          <span className="intro-skip-arrow">&rarr;</span>
        </button>

        {/* Decorative Golden Bottom Hem Line */}
        <div className="intro-bottom-hem" />
      </div>
    </aside>
  );
}
