import { Navigate, Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/Forms';
import { Card } from '../components/Card';
import { useToast } from '../components/ToastProvider';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { studentSignup } from '../redux/slices/authSlice';

export const StudentSignupPage = () => {
  const { student, status, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  if (student) return <Navigate replace to="/student/dashboard" />;

  return (
    <div className="page-shell relative flex min-h-[76vh] items-center justify-center py-10" data-motion="page-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[8%] top-[16%] h-28 w-28 rounded-full bg-sky-400/10 blur-3xl" data-float="soft" />
        <div className="absolute left-[12%] bottom-[16%] h-24 w-24 rounded-full border border-white/10" data-spin="slow" />
      </div>
      <Card className="relative w-full max-w-2xl overflow-hidden p-8 sm:p-10" data-motion="hero-card">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/55 via-sky-400/35 to-transparent" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-200" data-motion="copy">Student Signup</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white" data-motion="heading">Create your account</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400" data-motion="copy">Register your approved student profile to access admissions, records, and portal support features.</p>
        <div className="mt-8" data-motion="actions">
          <AuthForm
            buttonLabel="Signup"
            fields={[
              { name: 'cnic', label: 'CNIC' },
              { name: 'rollNumber', label: 'Roll Number' },
              { name: 'password', label: 'Password', type: 'password' },
            ]}
            helper="Only students who were already added by the administration can create an account."
            loading={status === 'loading'}
            onSubmit={async (values) => {
              const result = await dispatch(studentSignup(values));
              if (!result.error) {
                showToast('Signup successful.');
                navigate('/student/dashboard');
              }
            }}
          />
        </div>
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        <p className="mt-6 text-sm text-slate-400">Already registered? <Link className="text-violet-200" to="/login">Login</Link></p>
      </Card>
    </div>
  );
};
