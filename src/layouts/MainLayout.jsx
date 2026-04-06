import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { usePortalMotion } from '../hooks/usePortalMotion';

export const MainLayout = () => {
  const layoutRef = useRef(null);
  usePortalMotion(layoutRef);

  return (
    <div className="relative min-h-screen overflow-hidden" ref={layoutRef}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-24 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" data-float="soft" />
        <div className="absolute right-[-5rem] top-40 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" data-float="soft" />
        <div className="absolute left-[18%] top-[26rem] h-24 w-24 rounded-full border border-white/10" data-spin="slow" />
        <div className="absolute right-[12%] top-[36rem] h-20 w-20 rounded-full border border-emerald-300/15" data-spin="slow" />
      </div>
      <Navbar />
      <main className="relative pb-14 pt-6 sm:pt-8" data-motion="page-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
