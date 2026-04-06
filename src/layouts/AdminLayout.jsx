import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logoutAdmin } from '../redux/slices/authSlice';

export const AdminLayout = () => {
  const admin = useAppSelector((state) => state.auth.admin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-5rem] top-24 h-52 w-52 rounded-full bg-emerald-400/8 blur-3xl" data-float="soft" />
        <div className="absolute right-[-4rem] top-40 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" data-float="soft" />
        <div className="absolute left-[9%] top-[20rem] h-24 w-24 rounded-full border border-white/8" data-spin="slow" />
      </div>
      <div className="page-shell relative flex gap-6 py-8" data-motion="page-shell">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <div className="glass-card mb-6 flex flex-col gap-4 rounded-[30px] p-5 sm:flex-row sm:items-center sm:justify-between" data-motion="hero-card">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-violet-200" data-motion="copy">Signed In</p>
              <h2 className="mt-2 text-2xl font-bold text-white" data-motion="heading">{admin?.name || 'Admin User'}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3" data-motion="actions">
              <Button
                onClick={() => {
                  dispatch(logoutAdmin());
                  navigate('/admin/login');
                }}
                variant="secondary"
              >
                Logout
              </Button>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
