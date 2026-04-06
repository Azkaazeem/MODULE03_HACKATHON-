import { Navigate, Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/Forms';
import { Card } from '../components/Card';
import { useToast } from '../components/ToastProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAuthError, studentLogin } from '../redux/slices/authSlice';

export const StudentLoginPage = () => {
  const { student, status, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  if (student) return <Navigate replace to="/student/dashboard" />;

  return (
    <div className="page-shell relative flex min-h-[76vh] items-center justify-center py-10" data-motion="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[18%] h-28 w-28 rounded-full bg-emerald-400/10 blur-3xl" data-float="soft" />
        <div className="absolute right-[10%] bottom-[18%] h-24 w-24 rounded-full border border-white/10" data-spin="slow" />
      </div>
      <Card className="relative w-full max-w-2xl overflow-hidden p-8 sm:p-10" data-motion="hero-card">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-200" data-motion="copy">Student Login</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white" data-motion="heading">Welcome back</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400" data-motion="copy">Sign in with your CNIC and password to access your dashboard, admissions activity, and leave requests.</p>
        <div className="mt-8" data-motion="actions">
          <AuthForm
            buttonLabel="Login"
            fields={[
              { name: 'cnic', label: 'CNIC', placeholder: '42101-1234567-8' },
              { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' },
            ]}
            loading={status === 'loading'}
            onSubmit={async (values) => {
              const result = await dispatch(studentLogin(values));
              if (!result.error) {
                showToast('Student login successful.');
                navigate('/student/dashboard');
              }
            }}
          />
        </div>
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        <button className="mt-3 text-sm text-slate-400 underline decoration-white/20 underline-offset-4" onClick={() => dispatch(clearAuthError())} type="button">Clear message</button>
        <p className="mt-6 text-sm text-slate-400">Need an account? <Link className="text-violet-200" to="/signup">Signup here</Link></p>
      </Card>
    </div>
  );
};
