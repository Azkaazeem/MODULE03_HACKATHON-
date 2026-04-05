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
    <div className="page-shell flex min-h-[70vh] items-center justify-center py-8">
      <Card className="w-full max-w-xl rounded-[32px] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-200">Student Signup</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Create your account</h1>
        <div className="mt-8">
          <AuthForm
            buttonLabel="Signup"
            fields={[
              { name: 'cnic', label: 'CNIC' },
              { name: 'rollNumber', label: 'Roll Number' },
              { name: 'password', label: 'Password', type: 'password' },
            ]}
            helper="Only students added by admin can register"
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
