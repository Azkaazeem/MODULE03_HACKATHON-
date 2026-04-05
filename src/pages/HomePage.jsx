import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FacebookFeed } from '../components/FacebookFeed';
import { HOME_UPDATES } from '../utils/constants';

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

export const HomePage = () => (
  <div className="page-shell space-y-14 pb-14">
    <section className="grid items-center gap-8 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-14">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-violet-200">Saylani Student Portal</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl xl:text-6xl">
          A modern student portal inspired by <span className="gradient-text">Saylani&apos;s mission of learning and opportunity</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          This portal helps students manage admissions, course access, and academic requests through a clearer digital experience.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/login"><Button>Student Login</Button></Link>
          <Link to="/signup"><Button variant="secondary">Create Student Account</Button></Link>
          <Link to="/courses"><Button variant="ghost">Browse Courses</Button></Link>
        </div>
      </div>

      <Card className="relative overflow-hidden p-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/60 via-sky-400/40 to-transparent" />
        <div className="grid gap-px bg-white/8 sm:grid-cols-2">
          <div className="bg-slate-950/26 p-6 sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">Portal Focus</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">Built to help students feel guided, informed, and supported.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Instead of scattered manual follow-up, the portal gives students one organized place to understand where they stand and what they need to do next.
            </p>
          </div>
          <div className="space-y-3 bg-white/5 p-6 sm:p-7">
            {[
              'Review active admissions and course options in one place.',
              'Apply with a smoother student-first flow.',
              'Track leave requests and academic updates with less confusion.',
            ].map((item) => (
              <div className="border border-white/8 bg-black/10 px-4 py-4 text-sm leading-6 text-slate-200" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </Card>
    </section>

    <section className="grid gap-5 md:grid-cols-3">
      {supportPillars.map((pillar) => (
        <Card className="relative overflow-hidden p-6" key={pillar.title}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-200">Why It Matters</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{pillar.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">{pillar.description}</p>
        </Card>
      ))}
    </section>

    <section>
      <Card className="relative overflow-hidden p-6 sm:p-7">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
        <FacebookFeed />
      </Card>
    </section>

    <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <Card className="relative overflow-hidden p-6 sm:p-7">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-200">Student Journey</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">How students move through the portal</h2>
        <div className="mt-6 space-y-4">
          {studentJourney.map((step, index) => (
            <div className="flex gap-4 border border-white/8 bg-white/5 p-4" key={step}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">{index + 1}</div>
              <p className="text-sm leading-7 text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="relative overflow-hidden p-6 sm:p-7">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-200">Student Benefits</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">What this experience is meant to solve</h2>
        <div className="mt-6 space-y-4">
          {studentBenefits.map((item) => (
            <div className="border border-white/8 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300" key={item}>{item}</div>
          ))}
        </div>
      </Card>
    </section>

    <section className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-200">Latest Updates</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Recent announcements</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-400">Important platform updates, admissions activity, and process improvements for students and administrators.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {HOME_UPDATES.map((item) => (
          <Card className="hover-lift relative overflow-hidden p-6" key={item.id}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
            <p className="text-xs uppercase tracking-[0.25em] text-blue-200">{item.date}</p>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.excerpt}</p>
          </Card>
        ))}
      </div>
    </section>
  </div>
);
