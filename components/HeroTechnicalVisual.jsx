'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroTechnicalVisual.module.css';

const pathOrigins = [72, 96, 120, 146, 174, 204, 238, 274, 340, 406, 442, 476, 506, 534, 560, 584, 608];

const flowPaths = pathOrigins.map((y, index) => {
  const distance = 340 - y;
  const firstBend = Math.round(y + distance * 0.16);
  const secondBend = Math.round(y + distance * 0.74);

  return {
    d: `M40 ${y} C190 ${y} 270 ${y} 314 ${firstBend} C354 ${firstBend} 374 ${secondBend} 430 340`,
    delay: `${(0.3 + (index % 7) * 0.035).toFixed(3)}s`,
    secondary: index % 4 === 0,
  };
});

const systemNodes = [
  { x: 116, y: 96, delay: '0.96s' },
  { x: 176, y: 146, delay: '1.02s' },
  { x: 232, y: 204, delay: '1.08s' },
  { x: 292, y: 266, delay: '1.14s' },
  { x: 336, y: 302, delay: '1.20s' },
  { x: 386, y: 326, delay: '1.26s' },
  { x: 94, y: 406, delay: '1.00s' },
  { x: 166, y: 476, delay: '1.06s' },
  { x: 238, y: 534, delay: '1.12s' },
  { x: 302, y: 452, delay: '1.18s' },
  { x: 348, y: 396, delay: '1.24s' },
  { x: 392, y: 360, delay: '1.30s' },
  { x: 204, y: 274, delay: '1.32s', secondary: true },
  { x: 268, y: 584, delay: '1.38s', secondary: true },
];

const dataDots = Array.from({ length: 81 }, (_, index) => ({
  x: 360 + (index % 9) * 28,
  y: 240 + Math.floor(index / 9) * 25,
  delay: `${(1.02 + (index % 9) * 0.035).toFixed(3)}s`,
}));

function SystemGrid() {
  return (
    <g className={styles.gridLines}>
      {[80, 160, 240, 320, 400, 480, 560, 640].map((y, index) => (
        <line className={index % 2 ? styles.secondaryGrid : undefined} x1="30" y1={y} x2="650" y2={y} key={`h-${y}`} />
      ))}
      {[100, 180, 260, 340, 420, 500, 580].map((x, index) => (
        <line className={index % 2 ? styles.secondaryGrid : undefined} x1={x} y1="24" x2={x} y2="656" key={`v-${x}`} />
      ))}
      <line className={styles.axisLine} x1="12" y1="340" x2="668" y2="340" />
      <line className={styles.axisLine} x1="430" y1="8" x2="430" y2="672" />
      <path className={styles.crosshair} d="M414 340 H446 M430 324 V356" />
    </g>
  );
}

function SystemOrbit() {
  return (
    <g className={styles.orbitSystem}>
      <circle className={styles.heroOrbit} cx="430" cy="340" r="252" pathLength="1" />
      <g className={styles.orbitProjectMarker} transform="translate(430 88)">
        <circle r="21" />
        <text x="0" y="1">01</text>
      </g>
    </g>
  );
}

function FlowPaths() {
  return (
    <g className={styles.flowPaths}>
      {flowPaths.map((path, index) => (
        <path
          className={`${styles.flowPath} ${path.secondary ? styles.secondaryPath : ''}`}
          d={path.d}
          pathLength="1"
          style={{ '--draw-delay': path.delay }}
          key={index}
        />
      ))}
    </g>
  );
}

function SystemNodes() {
  return (
    <g className={styles.systemNodes}>
      {systemNodes.map((node, index) => (
        <rect
          className={`${styles.systemNode} ${node.secondary ? styles.secondaryNode : ''}`}
          x={node.x - 2.5}
          y={node.y - 2.5}
          width="5"
          height="5"
          style={{ '--node-delay': node.delay }}
          key={`${node.x}-${node.y}`}
        />
      ))}
      {dataDots.map((dot) => (
        <circle
          className={styles.dataDot}
          cx={dot.x}
          cy={dot.y}
          r="1.45"
          style={{ '--node-delay': dot.delay }}
          key={`${dot.x}-${dot.y}`}
        />
      ))}
    </g>
  );
}

function TechnicalLabels() {
  return (
    <div className={styles.technicalLabels}>
      <span className={`${styles.techLabel} ${styles.labelRealtime}`} style={{ '--label-delay': '1.70s' }}>REAL-TIME<br />SYSTEMS</span>
      <span className={`${styles.techLabel} ${styles.labelVoice}`} style={{ '--label-delay': '1.82s' }}>VOICE<br />INTERFACES</span>
      <span className={`${styles.techLabel} ${styles.labelAi}`} style={{ '--label-delay': '1.76s' }}>AI<br />MODELS</span>
      <span className={`${styles.techLabel} ${styles.labelData}`} style={{ '--label-delay': '1.88s' }}>DATA<br />PIPELINES</span>
      <span className={`${styles.marker} ${styles.markerOne}`} style={{ '--label-delay': '1.96s' }} />
      <span className={`${styles.marker} ${styles.markerTwo}`} style={{ '--label-delay': '2.04s' }} />
      <span className={`${styles.marker} ${styles.markerThree}`} style={{ '--label-delay': '2.12s' }} />
    </div>
  );
}

function Terminal({ terminalRef }) {
  return (
    <div className={styles.terminalAnchor}>
      <div className={styles.terminalParallax} ref={terminalRef}>
        <span className={`${styles.terminalCorner} ${styles.cornerTopLeft}`} />
        <span className={`${styles.terminalCorner} ${styles.cornerTopRight}`} />
        <span className={`${styles.terminalCorner} ${styles.cornerBottomLeft}`} />
        <span className={`${styles.terminalCorner} ${styles.cornerBottomRight}`} />
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <span>SYS/CORE</span>
            <span>01</span>
          </div>
          <div className={styles.terminalPrompt}>
            <span>&gt;</span>
            <span className={styles.cursor}>_</span>
          </div>
          <span className={styles.terminalStatus}>PROCESSING</span>
        </div>
      </div>
    </div>
  );
}

function TechnicalSystem({ diagramRef, terminalRef }) {
  return (
    <>
      <div className={styles.diagramParallax} ref={diagramRef}>
        <svg className={styles.systemSvg} viewBox="0 0 680 680" focusable="false">
          <SystemOrbit />
          <SystemGrid />
          <FlowPaths />
          <SystemNodes />
        </svg>
        <TechnicalLabels />
      </div>
      <Terminal terminalRef={terminalRef} />
    </>
  );
}

export default function HeroTechnicalVisual() {
  const visualRef = useRef(null);
  const motionRef = useRef(null);
  const diagramRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let context;
    const controller = new AbortController();

    const init = async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      const gsap = gsapModule.default || gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const visual = visualRef.current;
      const motion = motionRef.current;
      const diagram = diagramRef.current;
      const terminal = terminalRef.current;
      const hero = visual?.closest('section');

      if (!visual || !motion || !diagram || !terminal || !hero) return;

      gsap.registerPlugin(ScrollTrigger);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      context = gsap.context(() => {
        const grid = visual.querySelector(`.${styles.gridLines}`);
        const paths = visual.querySelector(`.${styles.flowPaths}`);
        const nodes = visual.querySelector(`.${styles.systemNodes}`);
        const heroCopy = hero.querySelectorAll('[data-hero-exit]');
        const heroBottom = hero.querySelector('[data-hero-bottom]');
        let heroRect = hero.getBoundingClientRect();
        const diagramX = gsap.quickTo(diagram, 'x', { duration: 0.8, ease: 'power3.out' });
        const diagramY = gsap.quickTo(diagram, 'y', { duration: 0.8, ease: 'power3.out' });
        const terminalX = gsap.quickTo(terminal, 'x', { duration: 0.9, ease: 'power3.out' });
        const terminalY = gsap.quickTo(terminal, 'y', { duration: 0.9, ease: 'power3.out' });

        const moveTo = (x, y) => {
          diagramX(x * -8);
          diagramY(y * -8);
          terminalX(x * -3);
          terminalY(y * -3);
        };

        if (window.matchMedia('(pointer: fine)').matches) {
          const syncHeroRect = () => {
            heroRect = hero.getBoundingClientRect();
          };

          hero.addEventListener('pointerenter', syncHeroRect, { signal: controller.signal });
          window.addEventListener('resize', syncHeroRect, { passive: true, signal: controller.signal });
          hero.addEventListener('pointermove', (event) => {
            const x = ((event.clientX - heroRect.left) / heroRect.width - 0.5) * 2;
            const y = ((event.clientY - heroRect.top) / heroRect.height - 0.5) * 2;
            moveTo(x, y);
          }, { signal: controller.signal });

          hero.addEventListener('pointerleave', () => moveTo(0, 0), { signal: controller.signal });
        }

        const scrollTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        scrollTimeline
          .to(heroCopy, { y: -14, opacity: 0.48, stagger: 0.02 }, 0)
          .to(heroBottom, { y: -6, opacity: 0.44 }, 0)
          .to(motion, { y: -8, opacity: 0.82 }, 0)
          .to(grid, { y: -3 }, 0)
          .to(paths, { x: 5, scaleX: 1.015, transformOrigin: 'right center' }, 0)
          .to(nodes, { x: 4, y: -4 }, 0);
      }, visual);
    };

    init();

    return () => {
      cancelled = true;
      controller.abort();
      context?.revert();
    };
  }, []);

  return (
    <div
      className={styles.visualPosition}
      ref={visualRef}
      role="img"
      aria-label="Real-time AI system connections converging into a processing terminal"
    >
      <div className={styles.visualMotion} ref={motionRef}>
        <TechnicalSystem diagramRef={diagramRef} terminalRef={terminalRef} />
      </div>
    </div>
  );
}
