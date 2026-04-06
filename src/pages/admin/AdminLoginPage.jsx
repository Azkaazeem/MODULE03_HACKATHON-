import { Navigate, useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { AuthForm } from '../../components/Forms';
import { useToast } from '../../components/ToastProvider';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { adminLogin } from '../../redux/slices/authSlice';

export const AdminLoginPage = () => {
  const { admin, status, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  if (admin) return <Navigate replace to="/admin/dashboard" />;

  return (
    <div className="page-shell relative flex min-h-[76vh] items-center justify-center py-10" data-motion="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[22%] h-32 w-32 rounded-full bg-emerald-400/8 blur-3xl" data-float="soft" />
        <div className="absolute right-[12%] bottom-[18%] h-24 w-24 rounded-full border border-white/10" data-spin="slow" />
      </div>
      <Card className="relative w-full max-w-2xl overflow-hidden p-8 sm:p-10" data-motion="hero-card">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-200" data-motion="copy">Admin Login</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white" data-motion="heading">Secure admin access</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400" data-motion="copy">Use your admin credentials to manage student records, admissions, and leave approval activity from the dashboard.</p>
        <div className="mt-8" data-motion="actions">
          <AuthForm
            buttonLabel="Login"
            fields={[
              { name: 'username', label: 'Username', placeholder: 'admin' },
              { name: 'password', label: 'Password', type: 'password', placeholder: 'admin123' },
            ]}
            loading={status === 'loading'}
            onSubmit={async (values) => {
              const result = await dispatch(adminLogin(values));
              if (!result.error) {
                showToast('Admin login successful.');
                navigate('/admin/dashboard');
              }
            }}
          />
        </div>
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      </Card>
    </div>
  );
};
