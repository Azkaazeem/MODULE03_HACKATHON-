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
    <div className="page-shell flex gap-6 py-8">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <div className="glass-card mb-6 flex flex-col gap-4 rounded-[30px] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-violet-200">Signed In</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{admin?.name || 'Admin User'}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
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
  );
};
