import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const NotFoundPage = () => (
  <div className="page-shell flex min-h-[72vh] items-center justify-center py-8">
    <Card className="w-full max-w-2xl rounded-[36px] p-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-200">404 Error</p>
      <h1 className="mt-4 text-5xl font-extrabold text-white">Page Not Found</h1>
      <p className="mt-4 text-base leading-8 text-slate-400">The page you are looking for doesn’t exist or may have been moved.</p>
      <div className="mt-8"><Link to="/"><Button>Go Home</Button></Link></div>
    </Card>
  </div>
);
