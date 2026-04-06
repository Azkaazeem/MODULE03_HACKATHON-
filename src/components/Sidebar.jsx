import { ADMIN_LINKS } from '../utils/constants';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => (
  <aside className="glass-card hidden w-72 shrink-0 rounded-[30px] p-5 xl:block" data-motion="card" data-origin="left">
    <div className="mb-8 rounded-[24px] bg-gradient-to-br from-violet-500/20 to-blue-500/20 p-5" data-float="soft">
      <p className="text-xs uppercase tracking-[0.3em] text-violet-200">Admin Space</p>
      <h2 className="mt-3 text-2xl font-bold text-white">SMIT Control</h2>
    </div>

    <nav className="space-y-2">
      {ADMIN_LINKS.map((item) => (
        <NavLink
          className={({ isActive }) => `block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/6'}`}
          key={item.to}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);
