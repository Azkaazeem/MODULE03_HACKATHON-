import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const getAxis = (origin) => {
  if (origin === 'left') return { x: -110, y: 26 };
  if (origin === 'right') return { x: 110, y: 26 };
  if (origin === 'down') return { x: 0, y: -80 };
  return { x: 0, y: 80 };
};

export const usePortalMotion = (scopeRef) => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (!scopeRef.current) return undefined;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scopeRef);
      const heading = q('[data-motion="heading"]');
      const copy = q('[data-motion="copy"]');
      const actions = q('[data-motion="actions"]');
      const heroCard = q('[data-motion="hero-card"]');
      const pageShell = q('[data-motion="page-shell"]');

      const introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (pageShell.length) introTimeline.from(pageShell, { opacity: 0, duration: 0.45 });
      if (heading.length) introTimeline.from(heading, { y: 42, opacity: 0, duration: 0.8 }, '-=0.22');
      if (copy.length) introTimeline.from(copy, { y: 28, opacity: 0, duration: 0.72, stagger: 0.08 }, '-=0.48');
      if (actions.length) introTimeline.from(actions, { y: 24, opacity: 0, duration: 0.68, stagger: 0.08 }, '-=0.42');
      if (heroCard.length) introTimeline.from(heroCard, { x: 72, opacity: 0, scale: 0.94, duration: 0.92 }, '-=0.62');

      gsap.utils.toArray(q('[data-motion="card"]')).forEach((item) => {
        const origin = item.getAttribute('data-origin') || 'up';
        const axis = getAxis(origin);
        gsap.from(item, {
          ...axis,
          opacity: 0,
          scale: origin === 'up' ? 0.98 : 0.96,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 84%',
          },
        });
      });

      gsap.utils.toArray(q('[data-motion="table"]')).forEach((item) => {
        gsap.from(item, {
          y: 90,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 86%',
          },
        });
      });

      gsap.utils.toArray(q('[data-float="soft"]')).forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -18 : 18,
          x: index % 2 === 0 ? 12 : -12,
          duration: 3.8 + (index % 3) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      gsap.utils.toArray(q('[data-wave="soft"]')).forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -14 : 14,
          rotation: index % 2 === 0 ? -6 : 6,
          duration: 2.4 + (index % 4) * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      gsap.utils.toArray(q('[data-spin="slow"]')).forEach((item, index) => {
        gsap.to(item, {
          rotate: index % 2 === 0 ? 360 : -360,
          duration: 16 + index * 2,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        });
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [location.pathname, scopeRef]);
};
