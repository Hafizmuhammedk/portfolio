'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let lenis;
    let tickerCallback;
    let gsapInstance;

    const init = async () => {
      // Import Lenis
      const LenisModule = await import('lenis');
      const Lenis = LenisModule.default || LenisModule.Lenis;

      // Import GSAP + ScrollTrigger once — the single source of truth
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      gsapInstance = gsapModule.default || gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      if (cancelled) return;
      gsapInstance.registerPlugin(ScrollTrigger);

      // Initialize Lenis with tuned settings
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1,
        anchors: { offset: -80, duration: 0.9 },
        respectReducedMotion: true,
        autoRaf: false,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Connect Lenis scroll events → ScrollTrigger.update
      lenis.on('scroll', ScrollTrigger.update);

      // Disable GSAP's built-in lag smoothing (Lenis handles this)
      gsapInstance.ticker.lagSmoothing(0);

      // Drive Lenis from GSAP's ticker — single RAF loop, no double-ticking
      tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsapInstance.ticker.add(tickerCallback);
    };

    init();

    return () => {
      cancelled = true;
      if (tickerCallback && gsapInstance) {
        gsapInstance.ticker.remove(tickerCallback);
      }
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
