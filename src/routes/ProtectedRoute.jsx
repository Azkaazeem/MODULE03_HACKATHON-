import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export const ProtectedRoute = ({ role }) => {
  const { student, admin } = useAppSelector((state) => state.auth);

  if (role === 'student' && !student) return <Navigate replace to="/login" />;
  if (role === 'admin' && !admin) return <Navigate replace to="/admin/login" />;
  return <Outlet />;
};
