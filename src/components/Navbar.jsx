import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../utils/constants';
import { Button } from './Button';

export const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/55 backdrop-blur-xl">
    <div className="page-shell flex items-center justify-between gap-4 py-4">
      <Link className="flex items-center gap-3" to="/">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 font-extrabold text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)]">
          S
        </div>
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] text-slate-300">SMIT</p>
          <p className="text-base font-bold text-white">Connect Portal</p>
        </div>
      </Link>

      <nav className="hidden items-center gap-2 lg:flex">
        {NAV_LINKS.map((link) => (
          <NavLink
            className={({ isActive }) => `rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/6'}`}
            key={link.to}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="hidden gap-3 sm:flex">
        <Link to="/login"><Button variant="secondary">Student Login</Button></Link>
        <Link to="/admin/login"><Button>Admin Panel</Button></Link>
      </div>
    </div>
  </header>
);
