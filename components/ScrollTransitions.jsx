'use client';

import { useEffect } from 'react';

function selectContent(section) {
  return section?.querySelector('[data-scroll-content]') || section;
}

export default function ScrollTransitions() {
  useEffect(() => {
    let cancelled = false;
    let context;

    const init = async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      const gsap = gsapModule.default || gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const work = document.querySelector('#work');
        const about = document.querySelector('#about');
        const experience = document.querySelector('#experience');
        const blueprint = document.querySelector('#technical-blueprint');
        const contact = document.querySelector('#contact');
        const footer = document.querySelector('footer');
        const workScene = work?.querySelector('[data-work-scene]');
        const mobileWork = work?.querySelector('[data-mobile-work]');

        const addTransition = ({
          trigger,
          incoming,
          outgoing,
          from,
          out = { y: -18, opacity: 0.58 },
          start = 'top 92%',
          end = 'top 35%',
        }) => {
          if (!trigger || !incoming) return;

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger,
              start,
              end,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          if (outgoing) timeline.to(outgoing, out, 0);
          timeline.fromTo(incoming, from, { x: 0, y: 0, opacity: 1 }, 0);
        };

        const media = gsap.matchMedia();

        media.add('(min-width: 769px)', () => {
          addTransition({
            trigger: work,
            incoming: workScene,
            from: { x: 52, y: 0, opacity: 0.72 },
            start: 'top bottom',
            end: 'top 28%',
          });

          addTransition({
            trigger: about,
            incoming: selectContent(about),
            outgoing: workScene,
            from: { x: 0, y: 56, opacity: 0.68 },
            out: { x: -26, y: -12, opacity: 0.5 },
          });

          addTransition({
            trigger: experience,
            incoming: selectContent(experience),
            outgoing: selectContent(about),
            from: { x: 50, y: 0, opacity: 0.68 },
            out: { x: -22, y: -8, opacity: 0.56 },
          });

          addTransition({
            trigger: blueprint,
            incoming: selectContent(blueprint),
            outgoing: selectContent(experience),
            from: { x: -34, y: 24, opacity: 0.7 },
            out: { x: 16, y: -18, opacity: 0.56 },
          });

          if (contact) {
            const contactContent = selectContent(contact);
            const contactTimeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: contact,
                start: 'top 92%',
                end: 'top 32%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            contactTimeline.to(selectContent(blueprint), { y: -28, opacity: 0.5 }, 0);
            contactTimeline.fromTo(
              contactContent,
              { scale: 0.88 },
              { scale: 1 },
              0,
            );
            contactTimeline.fromTo(
              contact.querySelector('[data-contact-heading]'),
              { y: -44, opacity: 0.62 },
              { y: 0, opacity: 1 },
              0,
            );
            contactTimeline.fromTo(
              contact.querySelector('[data-contact-action]'),
              { y: 44, opacity: 0.62 },
              { y: 0, opacity: 1 },
              0,
            );
          }

          addTransition({
            trigger: footer,
            incoming: footer?.querySelector('[data-footer-content]'),
            outgoing: selectContent(contact),
            from: { x: 0, y: 20, opacity: 0.72 },
            out: { x: 0, y: -14, opacity: 0.64 },
            start: 'top 96%',
            end: 'top 72%',
          });
        });

        media.add('(max-width: 768px)', () => {
          [mobileWork, selectContent(about), selectContent(experience), selectContent(blueprint), selectContent(contact)]
            .filter(Boolean)
            .forEach((incoming) => {
              const trigger = incoming.closest('section') || incoming;
              const isContact = trigger === contact;
              gsap.fromTo(incoming, { y: 18, opacity: 0.82, scale: isContact ? 0.94 : 1 }, {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger,
                  start: 'top 94%',
                  end: 'top 72%',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              });
            });
        });

        ScrollTrigger.refresh();
        return () => media.revert();
      });
    };

    init();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return null;
}
