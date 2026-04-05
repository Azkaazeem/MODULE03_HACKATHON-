import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { HOME_UPDATES } from '../utils/constants';

export const HomePage = () => (
  <div className="page-shell space-y-10">
    <section className="grid items-center gap-8 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-200">8:00 am - 11:59 pm</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-tight text-white sm:text-6xl">
          Premium student operations for <span className="gradient-text">SMIT Connect Portal</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A modern web portal for course admissions, student access, leave management, and streamlined admin control.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/login"><Button>Student Login</Button></Link>
          <Link to="/signup"><Button variant="secondary">Signup</Button></Link>
          <Link to="/courses"><Button variant="ghost">View Courses</Button></Link>
        </div>
      </div>

      <Card className="rounded-[32px] p-6 sm:p-8">
        <div className="grid gap-4">
          {[
            'Students explore courses and apply in a modal flow',
            'Leave requests include approval tracking and attachments',
            'Admins manage students, courses, leaves, and settings',
          ].map((item) => (
            <div className="rounded-[24px] border border-white/8 bg-white/6 px-5 py-4 text-sm leading-6 text-slate-200" key={item}>{item}</div>
          ))}
        </div>
      </Card>
    </section>

    <section className="space-y-5 pb-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-200">Latest Updates</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Recent announcements</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {HOME_UPDATES.map((item) => (
          <Card className="hover-lift rounded-[28px] p-6" key={item.id}>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-200">{item.date}</p>
            <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.excerpt}</p>
          </Card>
        ))}
      </div>
    </section>
  </div>
);
