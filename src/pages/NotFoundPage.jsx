import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { usePortalMotion } from '../hooks/usePortalMotion';

export const NotFoundPage = () => {
  const pageRef = useRef(null);
  usePortalMotion(pageRef);

  return (
    <div className="page-shell relative flex min-h-[72vh] items-center justify-center py-8" data-motion="page-shell" ref={pageRef}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[24%] h-24 w-24 rounded-full bg-emerald-400/10 blur-3xl" data-float="soft" />
        <div className="absolute right-[16%] bottom-[18%] h-24 w-24 rounded-full border border-white/10" data-spin="slow" />
      </div>
      <Card className="w-full max-w-2xl rounded-[36px] p-10 text-center" data-motion="hero-card">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-200" data-motion="copy">404 Error</p>
        <h1 className="mt-4 text-5xl font-extrabold text-white" data-motion="heading">Page Not Found</h1>
        <p className="mt-4 text-base leading-8 text-slate-400" data-motion="copy">The page you are looking for doesn’t exist or may have been moved.</p>
        <div className="mt-8" data-motion="actions"><Link to="/"><Button>Go Home</Button></Link></div>
      </Card>
    </div>
  );
};
