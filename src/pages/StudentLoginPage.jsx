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
    <div className="page-shell flex min-h-[70vh] items-center justify-center py-8">
      <Card className="w-full max-w-xl rounded-[32px] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-200">Student Login</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Welcome back</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">Login with your CNIC and password to access your dashboard.</p>
        <div className="mt-8">
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
        <button className="mt-3 text-sm text-slate-400 underline" onClick={() => dispatch(clearAuthError())} type="button">Clear message</button>
        <p className="mt-6 text-sm text-slate-400">Need an account? <Link className="text-violet-200" to="/signup">Signup here</Link></p>
      </Card>
    </div>
  );
};
