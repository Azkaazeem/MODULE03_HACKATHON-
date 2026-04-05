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
    <div className="page-shell flex min-h-[72vh] items-center justify-center py-8">
      <Card className="w-full max-w-xl rounded-[32px] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-violet-200">Admin Login</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Secure admin access</h1>
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
