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
    <div className="page-shell flex min-h-[76vh] items-center justify-center py-10">
      <Card className="relative w-full max-w-2xl overflow-hidden p-8 sm:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-200">Admin Login</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">Secure admin access</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">Use your admin credentials to manage student records, admissions, and leave approval activity from the dashboard.</p>
        <div className="mt-8">
          <AuthForm
            buttonLabel="Login"
            fields={[
              { name: 'username', label: 'Username' },
              { name: 'password', label: 'Password', type: 'password' },
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
