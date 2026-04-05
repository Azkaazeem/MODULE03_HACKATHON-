import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../logo.png';
import { NAV_LINKS } from '../utils/constants';
import { Button } from './Button';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/55 backdrop-blur-xl">
      <div className="page-shell py-4">
        <div className="flex items-center justify-between gap-4">
          <Link className="flex items-center gap-4" to="/">
            <img alt="SMIT Connect Portal" className="h-11 w-auto object-contain sm:h-12" src={logo} />
            <div className="hidden border-l border-white/10 pl-4 sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">Student Portal</p>
              <p className="mt-1 text-sm font-medium text-slate-200">Admissions and operations hub</p>
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

          <div className="hidden items-center gap-3 sm:flex lg:hidden">
            <Link to="/login"><Button variant="secondary">Student Login</Button></Link>
            <Link to="/admin/login"><Button>Admin Panel</Button></Link>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/login"><Button variant="secondary">Student Login</Button></Link>
            <Link to="/admin/login"><Button>Admin Panel</Button></Link>
          </div>

          <button
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 text-white sm:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            <span className={`h-0.5 w-5 bg-current transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

        {menuOpen ? (
          <div className="mt-4 space-y-2 border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl sm:hidden">
            {NAV_LINKS.map((link) => (
              <NavLink
                className={({ isActive }) => `block border px-4 py-3 text-sm font-medium transition ${isActive ? 'border-white/10 bg-white/10 text-white' : 'border-transparent text-slate-300 hover:border-white/10 hover:bg-white/6'}`}
                key={link.to}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/login"><Button className="w-full px-4 py-2.5" variant="secondary">Login</Button></Link>
              <Link to="/admin/login"><Button className="w-full px-4 py-2.5">Admin</Button></Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};
