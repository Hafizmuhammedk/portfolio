'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data';
import styles from './RadialProjects.module.css';

const TOTAL = projects.length;
const PROJECT_DIRECTIONS = [
  null,
  {
    incoming: { x: 20, y: 16 },
    outgoing: { x: -16, y: -10 },
    imageIncoming: { x: 14, y: 12 },
    imageOutgoing: { x: -10, y: -8 },
  },
  {
    incoming: { x: -22, y: 0 },
    outgoing: { x: 18, y: 0 },
    imageIncoming: { x: -14, y: 0 },
    imageOutgoing: { x: 10, y: 0 },
  },
];

function ProjectAction({ project, className, unavailableClassName, children }) {
  if (!project.link || project.link === '#') {
    return (
      <span
        className={`${className} ${unavailableClassName}`}
        aria-disabled="true"
        title="Architecture details available on request"
      >
        {children}
      </span>
    );
  }

  const isExternal = /^https?:\/\//.test(project.link);

  return (
    <a
      href={project.link}
      className={className}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

export default function RadialProjects() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const radialContainerRef = useRef(null);
  const orbitRef = useRef(null);
  const projectImageStageRef = useRef(null);
  const counterRef = useRef(null);
  const nodeRefs = useRef([]);
  const projectInfoRefs = useRef([]);
  const projectImageRefs = useRef([]);
  const prevIndexRef = useRef(0);
  const stRef = useRef(null);
  const transitionTimelineRef = useRef(null);
  const radiusRef = useRef(340);
  const layoutRef = useRef({
    radialCenterX: 0,
    radialCenterY: 0,
    imageLeft: 0,
    imageTop: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  const syncRadius = useCallback(() => {
    const radialContainer = radialContainerRef.current;
    const imageStage = projectImageStageRef.current;

    if (radialContainer) {
      const radialRect = radialContainer.getBoundingClientRect();
      radiusRef.current = radialRect.width / 2 - 5;

      if (imageStage) {
        const imageRect = imageStage.getBoundingClientRect();
        layoutRef.current = {
          radialCenterX: radialRect.left + radialRect.width / 2,
          radialCenterY: radialRect.top + radialRect.height / 2,
          imageLeft: imageRect.left,
          imageTop: imageRect.top,
        };
      }
    }
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const syncMobile = () => setIsMobile(mobileQuery.matches);

    syncMobile();
    mobileQuery.addEventListener('change', syncMobile);
    return () => mobileQuery.removeEventListener('change', syncMobile);
  }, []);

  // Every animated value is derived from the same ScrollTrigger progress.
  // Direct DOM writes keep React reconciliation out of the scroll path.
  const updateRadial = useCallback((progress) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rawIndex = progress * (TOTAL - 1);
    const activeIndex = Math.max(0, Math.min(TOTAL - 1, Math.round(rawIndex)));
    const radius = radiusRef.current;
    const totalRotation = ((TOTAL - 1) * Math.PI * 2) / TOTAL;
    const rotation = progress * totalRotation;
    const baseAngle = -Math.PI / 2;

    if (activeIndex !== prevIndexRef.current) {
      prevIndexRef.current = activeIndex;
      if (counterRef.current) {
        counterRef.current.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
      }
      projectInfoRefs.current.forEach((info, index) => {
        if (!info) return;
        const isActive = index === activeIndex;
        info.inert = !isActive;
        info.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
      projectImageRefs.current.forEach((image, index) => {
        image?.setAttribute('aria-hidden', index === activeIndex ? 'false' : 'true');
      });
    }

    if (orbitRef.current) {
      const rotationDegrees = (rotation * 180) / Math.PI;
      orbitRef.current.style.transform = `translate(-50%, -50%) rotate(${-rotationDegrees}deg)`;
    }

    nodeRefs.current.forEach((node, index) => {
      if (!node) return;

      const angle = baseAngle + (index * Math.PI * 2) / TOTAL - rotation;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const influence = Math.max(0, 1 - Math.abs(rawIndex - index));
      const easedInfluence = influence * influence * (3 - 2 * influence);

      node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${0.65 + easedInfluence * 0.35})`;
      node.style.opacity = 0.15 + easedInfluence * 0.85;
      node.classList.toggle(styles.nodeActive, index === activeIndex);
    });

    projects.forEach((_, index) => {
      const image = projectImageRefs.current[index];

      if (image) {
        const angle = baseAngle + (index * Math.PI * 2) / TOTAL - rotation;
        const nodeX = Math.cos(angle) * radius;
        const nodeY = Math.sin(angle) * radius;
        const layout = layoutRef.current;
        const originX = layout.radialCenterX + nodeX - layout.imageLeft;
        const originY = layout.radialCenterY + nodeY - layout.imageTop;

        image.style.transformOrigin = `${originX}px ${originY}px`;
      }
    });
  }, []);

  useEffect(() => {
    if (
      isMobile
      || window.matchMedia('(max-width: 768px)').matches
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    let cancelled = false;
    let resizeHandler;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default || gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const viewport = viewportRef.current;
      if (!section || !viewport) return;

      if (stRef.current) stRef.current.kill();
      if (transitionTimelineRef.current) transitionTimelineRef.current.kill();
      syncRadius();

      const infoLayers = projectInfoRefs.current.filter(Boolean);
      const imageLayers = projectImageRefs.current.filter(Boolean);
      const contentGroups = infoLayers.map((info) => Array.from(info.firstElementChild?.children || []));

      gsap.set(infoLayers, {
        opacity: 1,
        zIndex: 0,
        pointerEvents: 'none',
      });
      gsap.set(imageLayers, {
        opacity: 0,
        zIndex: 0,
        scale: 0.97,
        clipPath: 'inset(6% 8% 6% 0%)',
      });
      contentGroups.forEach((group) => gsap.set(group, { opacity: 0, x: 0, y: 0 }));

      gsap.set(infoLayers[0], { opacity: 1, zIndex: 2, pointerEvents: 'auto' });
      gsap.set(contentGroups[0], { opacity: 1, y: 0 });
      gsap.set(imageLayers[0], {
        opacity: 1,
        zIndex: 2,
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
      });

      const timelineClock = { value: 0 };
      const transitionTimeline = gsap.timeline({ paused: true });
      transitionTimeline.to(timelineClock, {
        value: 1,
        duration: TOTAL - 1,
        ease: 'none',
      }, 0);

      for (let index = 1; index < TOTAL; index += 1) {
        const start = index - 1;
        const outgoingInfo = infoLayers[index - 1];
        const incomingInfo = infoLayers[index];
        const outgoingImage = imageLayers[index - 1];
        const incomingImage = imageLayers[index];
        const direction = PROJECT_DIRECTIONS[index] || PROJECT_DIRECTIONS[1];

        transitionTimeline.to(contentGroups[index - 1], {
          opacity: 0,
          x: direction.outgoing.x,
          y: direction.outgoing.y,
          duration: 0.46,
          stagger: 0.018,
          ease: 'none',
        }, start + 0.05);
        transitionTimeline.to(outgoingImage, {
          opacity: 0,
          x: direction.imageOutgoing.x,
          y: direction.imageOutgoing.y,
          scale: 0.985,
          clipPath: 'inset(3% 3% 3% 0%)',
          duration: 0.56,
          ease: 'none',
        }, start + 0.08);
        transitionTimeline.set(outgoingInfo, {
          pointerEvents: 'none',
        }, start + 0.18);

        transitionTimeline.set(incomingInfo, {
          opacity: 1,
          zIndex: 3,
          pointerEvents: 'auto',
        }, start + 0.18);
        transitionTimeline.set(incomingImage, { zIndex: 3 }, start + 0.16);
        transitionTimeline.fromTo(contentGroups[index], {
          opacity: 0,
          x: direction.incoming.x,
          y: direction.incoming.y,
        }, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.52,
          stagger: 0.018,
          ease: 'none',
          immediateRender: false,
        }, start + 0.2);
        transitionTimeline.fromTo(incomingImage, {
          opacity: 0,
          x: direction.imageIncoming.x,
          y: direction.imageIncoming.y,
          scale: 0.97,
          clipPath: 'inset(6% 8% 6% 0%)',
        }, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.62,
          ease: 'none',
          immediateRender: false,
        }, start + 0.18);
        transitionTimeline.set([outgoingInfo, outgoingImage], { zIndex: 0 }, start + 0.82);
      }

      transitionTimelineRef.current = transitionTimeline;
      updateRadial(0);

      stRef.current = ScrollTrigger.create({
        animation: transitionTimeline,
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: viewport,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => updateRadial(self.progress),
      });

      resizeHandler = () => {
        syncRadius();
        updateRadial(stRef.current?.progress ?? 0);
      };
      window.addEventListener('resize', resizeHandler, { passive: true });
      ScrollTrigger.refresh();
    };

    initGSAP();

    return () => {
      cancelled = true;
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }
      if (transitionTimelineRef.current) {
        transitionTimelineRef.current.kill();
        transitionTimelineRef.current = null;
      }
    };
  }, [isMobile, syncRadius, updateRadial]);

  return (
    <div id="work">
      <section className={styles.mobileSection} aria-labelledby="selected-work-mobile-title">
        <div className={styles.container} data-mobile-work data-scroll-content>
          <div className={styles.sectionHeader}>
            <h2 className={styles.label} id="selected-work-mobile-title">SELECTED WORK</h2>
          </div>
          {projects.map((project, index) => (
            <article key={project.id} className={styles.mobileProject}>
              <span className={styles.mobileNumber}>{project.number} / {String(TOTAL).padStart(2, '0')}</span>
              <h3 className={styles.mobileTitle}>{project.title}</h3>
              <div className={styles.mobileImageWrap}>
                <Image
                  fill
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  sizes="calc(100vw - 32px)"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className={styles.mobileImage}
                />
              </div>
              <p className={styles.mobileDesc}>{project.description}</p>
              <div className={styles.mobileTech}>
                {project.technologies.map((tech) => (
                  <span key={tech} className={styles.techTag}>{tech}</span>
                ))}
              </div>
              <ProjectAction
                project={project}
                className={styles.mobileLink}
                unavailableClassName={styles.projectCtaUnavailable}
              >
                {project.link && project.link !== '#' ? 'VIEW GITHUB →' : 'VIEW ARCHITECTURE →'}
              </ProjectAction>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.section}
        ref={sectionRef}
        aria-labelledby="selected-work-desktop-title"
        style={{ '--project-count': TOTAL }}
      >
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.workScene} data-work-scene>
        <div className={styles.header}>
          <h2 className={styles.label} id="selected-work-desktop-title">SELECTED WORK</h2>
          <span className={styles.counter} ref={counterRef} aria-live="polite">01 / {String(TOTAL).padStart(2, '0')}</span>
        </div>

        <div className={styles.radialContainer} ref={radialContainerRef} aria-hidden="true">
          <div className={styles.orbit} ref={orbitRef}>
            <svg viewBox="0 0 700 700" className={styles.orbitSvg} focusable="false">
              <circle cx="350" cy="350" r="345" fill="none" stroke="var(--border)" strokeWidth="1" />
            </svg>
          </div>

          {projects.map((project, index) => (
            <div
              key={project.id}
              className={styles.node}
              ref={(node) => { nodeRefs.current[index] = node; }}
            >
              <span className={styles.nodeNumber}>{project.number}</span>
            </div>
          ))}
        </div>

        <div className={styles.projectInfoStage}>
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={styles.projectInfo}
              ref={(info) => { projectInfoRefs.current[index] = info; }}
              aria-hidden={index !== 0}
              inert={index !== 0}
            >
              <div className={styles.projectInfoContent}>
                <span className={styles.projectLabel}>PROJECT {project.number}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.projectTech}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
                <ProjectAction
                  project={project}
                  className={styles.projectCta}
                  unavailableClassName={styles.projectCtaUnavailable}
                >
                  {project.link && project.link !== '#' ? 'VIEW GITHUB' : 'VIEW ARCHITECTURE'}
                </ProjectAction>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.projectImageStage} ref={projectImageStageRef}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={styles.projectImageWrap}
              ref={(image) => { projectImageRefs.current[index] = image; }}
              aria-hidden={index !== 0}
            >
              <Image
                fill
                src={project.image}
                alt={`${project.title} interface preview`}
                sizes="(max-width: 1200px) 40vw, 560px"
                loading={index === 0 ? 'eager' : 'lazy'}
                className={styles.projectImage}
              />
            </div>
          ))}
        </div>
        </div>
      </div>
      </section>
    </div>
  );
}
