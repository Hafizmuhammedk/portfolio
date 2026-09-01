'use client';

import { useState } from 'react';
import { technologyCards } from '@/lib/data';
import styles from './TechBlueprint.module.css';

const ICONS = {
  code: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-1 2.65V12h2a3 3 0 0 1 3 3 3 3 0 0 1-3 3h-2v1a3 3 0 0 1-6 0v-1H7a3 3 0 0 1 0-6h2V9.65A4 4 0 0 1 8 7V6a4 4 0 0 1 4-4z" /></svg>
  ),
  nodes: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="2" /><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M7.5 7.5l3 3m6-3-3 3m-6 6 3-3m6 3-3-3" /></svg>
  ),
};

export default function TechBlueprint() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const activeCard = hoveredCard ?? expandedCard;

  return (
    <section className={styles.section} id="technical-blueprint" aria-labelledby="technical-blueprint-title">
      <div className={styles.container} data-scroll-content>
        <h2 className={styles.label} id="technical-blueprint-title">TECHNICAL BLUEPRINT</h2>

        <div className={styles.grid}>
          {technologyCards.map((card, index) => {
            const isOpen = activeCard === index;
            const cardNumber = String(index + 1).padStart(2, '0');
            const detailId = `technology-detail-${index + 1}`;

            return (
              <article
                className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}
                key={card.name}
                onPointerEnter={(event) => {
                  if (
                    event.pointerType === 'mouse'
                    && window.matchMedia('(min-width: 1101px)').matches
                  ) {
                    setHoveredCard(index);
                  }
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === 'mouse') setHoveredCard(null);
                }}
              >
                <button
                  type="button"
                  className={styles.cardTrigger}
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  aria-label={`${isOpen ? 'Hide' : 'Show'} ${card.name} details`}
                  onClick={() => setExpandedCard((current) => (current === index ? null : index))}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') setExpandedCard(null);
                  }}
                >
                  <span className={styles.cardBase} aria-hidden={isOpen}>
                    <span className={styles.cardNumber}>{cardNumber}</span>
                    <span className={styles.icon}>{ICONS[card.icon]}</span>
                    <span className={styles.cardTitle}>{card.name}</span>
                    <span className={styles.hoverPrompt}>VIEW DETAILS ↗</span>
                  </span>
                </button>

                <div className={styles.cardDetail} id={detailId} aria-hidden={!isOpen}>
                  <div className={styles.detailClip}>
                    <div className={styles.detailInner}>
                      <span className={styles.detailNumber}>{cardNumber} / 05</span>
                      <h3 className={styles.detailTitle}>{card.name}</h3>
                      <div className={styles.detailContent}>
                        <p className={styles.detailDescription}>{card.description}</p>
                        <span className={styles.capabilityLabel}>CAPABILITIES</span>
                        <ul className={styles.capabilities}>
                          {card.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                        </ul>
                        <div className={styles.items}>
                          {card.items.map((item) => <span className={styles.item} key={item}>{item}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
