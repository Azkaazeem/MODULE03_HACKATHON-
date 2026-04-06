import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FacebookFeed } from '../components/FacebookFeed';
import { HOME_UPDATES } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const supportPillars = [
  {
    title: 'Accessible learning',
    description: 'Saylani is known for opening doors to practical education for students who want skills, structure, and real opportunity.',
  },
  {
    title: 'Career-focused programs',
    description: 'From technology tracks to vocational pathways, students can build confidence around skills that matter in real work environments.',
  },
  {
    title: 'Student support flow',
    description: 'This portal is designed to reduce confusion around admissions, leave requests, and academic coordination for enrolled learners.',
  },
];

const studentJourney = [
  'Explore available courses and understand what fits your goals.',
  'Create your student account after approval from the administration.',
  'Apply for admissions, track submissions, and stay updated inside the portal.',
  'Request leave when needed and keep your academic record organized.',
];

const studentBenefits = [
  'One place for courses, applications, and leave records.',
  'Clear visibility into what has been submitted and what is still pending.',
  'Less back-and-forth with administration for everyday student needs.',
  'A more reliable student experience built around clarity and speed.',
];

const homeBackground = 'https://sbs.iba.edu.pk/images/bg-about.jpg';

export const HomePage = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTimeline
        .from('[data-hero-badge]', { y: 36, opacity: 0, duration: 0.7 })
        .from('[data-hero-title]', { y: 56, opacity: 0, duration: 0.95 }, '-=0.35')
        .from('[data-hero-copy]', { y: 34, opacity: 0, duration: 0.75 }, '-=0.45')
        .from('[data-hero-actions]', { y: 28, opacity: 0, duration: 0.7 }, '-=0.35')
        .from('[data-hero-panel]', { x: 88, opacity: 0, scale: 0.92, duration: 1.05 }, '-=0.72');

      gsap.to('[data-float-orb="left"]', {
        y: -26,
        x: 20,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('[data-float-orb="right"]', {
        y: 30,
        x: -22,
        duration: 5.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('[data-rotate-ring]', {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });

      gsap.to('[data-wave-chip]', {
        y: 'random(-14, 14)',
        rotation: 'random(-8, 8)',
        duration: 2.8,
        stagger: 0.22,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('[data-hero-bg]', {
        yPercent: 8,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-hero-section]',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      });

      gsap.utils.toArray('[data-support-card]').forEach((card, index) => {
        gsap.from(card, {
          x: index % 2 === 0 ? -120 : 120,
          y: 36,
          opacity: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
          },
        });
      });

      gsap.from('[data-facebook-card]', {
        y: 100,
        opacity: 0,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-facebook-card]',
          start: 'top 84%',
        },
      });

      gsap.from('[data-journey-card]', {
        x: -120,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-journey-card]',
          start: 'top 82%',
        },
      });

      gsap.from('[data-benefits-card]', {
        x: 120,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-benefits-card]',
          start: 'top 82%',
        },
      });

      gsap.utils.toArray('[data-update-card]').forEach((card, index) => {
        gsap.from(card, {
          y: 85,
          rotateX: 20,
          opacity: 0,
          duration: 0.95,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-14 pb-14" ref={pageRef}>
      <section className="relative left-1/2 right-1/2 min-h-[calc(100vh-88px)] w-screen -translate-x-1/2 overflow-hidden" data-hero-section>
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat will-change-transform"
            data-hero-bg
            style={{ backgroundImage: `url(${homeBackground})` }}
          />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-emerald-500/18 via-transparent to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[28%] bg-gradient-to-l from-sky-500/18 via-transparent to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[6%] top-[19%] h-40 w-40 rounded-full border border-emerald-300/20 bg-emerald-400/10 blur-xl" data-float-orb="left" />
          <div className="absolute bottom-[14%] left-[12%] h-24 w-24 rounded-full border border-white/10 bg-sky-400/10 blur-lg" data-wave-chip />
          <div className="absolute right-[9%] top-[18%] h-48 w-48 rounded-full border border-sky-300/20 bg-sky-400/10 blur-2xl" data-float-orb="right" />
          <div className="absolute bottom-[12%] right-[14%] h-20 w-20 rounded-full border border-emerald-200/20 bg-emerald-300/10 blur-md" data-wave-chip />
          <div className="absolute right-[18%] top-[11%] h-40 w-40 rounded-full border border-white/10" data-rotate-ring />
          <div className="absolute left-[44%] top-[16%] h-3 w-24 rounded-full bg-white/10" data-wave-chip />
          <div className="absolute left-[48%] top-[22%] h-3 w-16 rounded-full bg-emerald-300/20" data-wave-chip />
          <div className="absolute left-[62%] bottom-[18%] h-3 w-20 rounded-full bg-sky-300/20" data-wave-chip />
        </div>

        <div className="page-shell flex min-h-[calc(100vh-88px)] items-center py-10">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-emerald-100" data-hero-badge>Saylani Student Portal</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-slate-50 sm:text-5xl xl:text-6xl" data-hero-title>
                A modern student portal inspired by <span className="gradient-text">Saylani&apos;s mission of learning and opportunity</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100/95" data-hero-copy>
                This portal helps students manage admissions, course access, and academic requests through a clearer digital experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-hero-actions>
                <Link to="/login"><Button>Student Login</Button></Link>
                <Link to="/signup"><Button variant="secondary">Create Student Account</Button></Link>
                <Link to="/courses"><Button variant="ghost">Browse Courses</Button></Link>
              </div>
            </div>

            <Card className="relative overflow-hidden border-white/20 bg-white/70 p-0 backdrop-blur-md" data-hero-panel>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/60 via-sky-400/40 to-transparent" />
              <div className="grid gap-px bg-slate-900/6 sm:grid-cols-2">
                <div className="bg-white/34 p-6 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">Portal Focus</p>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">Built to help students feel guided, informed, and supported.</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    Instead of scattered manual follow-up, the portal gives students one organized place to understand where they stand and what they need to do next.
                  </p>
                </div>
                <div className="space-y-3 bg-white/28 p-6 sm:p-7">
                  {[
                    'Review active admissions and course options in one place.',
                    'Apply with a smoother student-first flow.',
                    'Track leave requests and academic updates with less confusion.',
                  ].map((item) => (
                    <div className="border border-slate-300/60 bg-white/34 px-4 py-4 text-sm leading-6 text-slate-800" data-wave-chip key={item}>{item}</div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="page-shell space-y-14">
        <section className="grid gap-5 md:grid-cols-3">
          {supportPillars.map((pillar) => (
            <Card className="relative overflow-hidden border-white/12 bg-slate-950/38 p-6 backdrop-blur-xl" data-support-card key={pillar.title}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200">Why It Matters</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{pillar.description}</p>
            </Card>
          ))}
        </section>

        <section>
          <Card className="relative overflow-hidden border-white/12 bg-slate-950/40 p-6 sm:p-7 backdrop-blur-xl" data-facebook-card>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
            <FacebookFeed />
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Card className="relative overflow-hidden border-white/12 bg-slate-950/38 p-6 sm:p-7 backdrop-blur-xl" data-journey-card>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200">Student Journey</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">How students move through the portal</h2>
            <div className="mt-6 space-y-4">
              {studentJourney.map((step, index) => (
                <div className="flex gap-4 border border-white/10 bg-white/8 p-4" key={step}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/14 text-sm font-semibold text-white">{index + 1}</div>
                  <p className="text-sm leading-7 text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="relative overflow-hidden border-white/12 bg-slate-950/38 p-6 sm:p-7 backdrop-blur-xl" data-benefits-card>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200">Student Benefits</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">What this experience is meant to solve</h2>
            <div className="mt-6 space-y-4">
              {studentBenefits.map((item) => (
                <div className="border border-white/10 bg-white/8 px-4 py-4 text-sm leading-7 text-slate-300" key={item}>{item}</div>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald-200">Latest Updates</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Recent announcements</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">Important platform updates, admissions activity, and process improvements for students and administrators.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {HOME_UPDATES.map((item) => (
              <Card className="hover-lift relative overflow-hidden border-white/12 bg-slate-950/38 p-6 backdrop-blur-xl" data-update-card key={item.id}>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
                <p className="text-xs uppercase tracking-[0.25em] text-blue-200">{item.date}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.excerpt}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
