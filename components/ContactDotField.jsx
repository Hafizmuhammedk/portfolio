'use client';

import { useEffect, useRef } from 'react';
import styles from './Contact.module.css';

export default function ContactDotField() {
  const fieldRef = useRef(null);

  useEffect(() => {
    const field = fieldRef.current;
    const section = field?.closest('section');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (!field || !section || !finePointer.matches) return;

    const controller = new AbortController();
    let fieldRect = field.getBoundingClientRect();
    let frameId = null;
    let pointerClientX = window.innerWidth / 2;
    let pointerClientY = window.innerHeight / 2;

    const updateBounds = () => {
      fieldRect = field.getBoundingClientRect();
    };

    const syncPointer = () => {
      updateBounds();
      const pointerX = pointerClientX - fieldRect.left;
      const pointerY = pointerClientY - fieldRect.top;

      field.style.setProperty('--pointer-x', `${pointerX}px`);
      field.style.setProperty('--pointer-y', `${pointerY}px`);
    };

    const updatePointer = (event) => {
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
      syncPointer();
    };

    const syncAfterScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        syncPointer();
      });
    };

    section.addEventListener('pointerenter', syncPointer, { signal: controller.signal });
    window.addEventListener('pointermove', updatePointer, { passive: true, signal: controller.signal });
    window.addEventListener('scroll', syncAfterScroll, { passive: true, signal: controller.signal });
    window.addEventListener('resize', syncAfterScroll, { passive: true, signal: controller.signal });

    return () => {
      controller.abort();
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className={styles.technicalField} data-contact-field aria-hidden="true" ref={fieldRef}>
      <span className={styles.dotMotion}>
        <span className={`${styles.dotLayer} ${styles.baseDots}`} />
        <span className={`${styles.dotLayer} ${styles.hoverDots}`} />
      </span>
    </div>
  );
}
