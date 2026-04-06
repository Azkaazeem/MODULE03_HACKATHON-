import { Link } from 'react-router-dom';

const footerColumns = [
  {
    title: 'About The Portal',
    items: [
      'A student-centered experience for admissions, leave requests, and academic coordination.',
      'Designed to help Saylani learners navigate their progress with more clarity and less friction.',
    ],
  },
  {
    title: 'Student Access',
    items: [
      'Browse available courses',
      'Create your student account after approval',
      'Track requests and stay informed',
    ],
  },
  {
    title: 'Support Focus',
    items: [
      'Clearer communication between students and admin teams',
      'Better visibility into admissions and leave activity',
      'A cleaner digital layer for everyday student needs',
    ],
  },
];

export const Footer = () => (
  <footer className="relative border-t border-white/8 bg-slate-950/55" data-motion="card" data-origin="up">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[8%] top-10 h-28 w-28 rounded-full bg-emerald-400/8 blur-3xl" data-float="soft" />
      <div className="absolute right-[10%] top-16 h-24 w-24 rounded-full bg-sky-400/10 blur-3xl" data-float="soft" />
      <div className="absolute right-[18%] bottom-12 h-20 w-20 rounded-full border border-white/10" data-spin="slow" />
    </div>
    <div className="page-shell py-12">
      <div className="pointer-events-none absolute inset-0 z-[60] flex items-center justify-center overflow-hidden">
        <span className="whitespace-nowrap text-[15vw] font-black tracking-tighter text-[#fff] opacity-30">SMIT PORTAL</span>
      </div>
      <div className="relative overflow-hidden border border-white/8 bg-white/[0.03] p-7 sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-violet-200">Saylani Student Portal</p>
            <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-white">A smoother digital experience for students who need clarity, support, and momentum.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              The portal is designed to make the student journey feel more structured, less confusing, and more reliable across admissions, requests, records, and communication.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300" data-wave="soft">
              <Link className="hover:text-white" to="/courses">Explore Courses</Link>
              <Link className="hover:text-white" to="/login">Student Login</Link>
              <Link className="hover:text-white" to="/signup">Signup</Link>
              <Link className="hover:text-white" to="/admin/login">Admin Access</Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {footerColumns.map((column, index) => (
              <div className="border border-white/8 bg-white/5 p-5" data-motion="card" data-origin={index % 2 === 0 ? 'up' : 'right'} key={column.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">{column.title}</p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  {column.items.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>SMIT Connect Portal for student admissions, requests, and academic operations.</p>
          <p>Crafted for a cleaner, student-first workflow.</p>
        </div>
      </div>
    </div>
  </footer>
);
