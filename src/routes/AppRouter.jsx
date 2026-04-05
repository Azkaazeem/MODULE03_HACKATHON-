import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { MainLayout } from '../layouts/MainLayout';
import { AdminCoursesPage } from '../pages/admin/AdminCoursesPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminLeavesPage } from '../pages/admin/AdminLeavesPage';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminStudentsPage } from '../pages/admin/AdminStudentsPage';
import { CoursesPage } from '../pages/CoursesPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { StudentDashboardPage } from '../pages/StudentDashboardPage';
import { StudentLoginPage } from '../pages/StudentLoginPage';
import { StudentSignupPage } from '../pages/StudentSignupPage';
import { ProtectedRoute } from './ProtectedRoute';

export const appRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'courses', element: <CoursesPage /> },
        { path: 'login', element: <StudentLoginPage /> },
        { path: 'signup', element: <StudentSignupPage /> },
        { path: 'admin/login', element: <AdminLoginPage /> },
        {
          element: <ProtectedRoute role="student" />,
          children: [{ path: 'student/dashboard', element: <StudentDashboardPage /> }],
        },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
    {
      element: <ProtectedRoute role="admin" />,
      children: [
        {
          path: '/admin',
          element: <AdminLayout />,
          children: [
            { path: 'dashboard', element: <AdminDashboardPage /> },
            { path: 'students', element: <AdminStudentsPage /> },
            { path: 'courses', element: <AdminCoursesPage /> },
            { path: 'leaves', element: <AdminLeavesPage /> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  },
);
