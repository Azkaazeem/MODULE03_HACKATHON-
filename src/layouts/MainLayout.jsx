import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export const MainLayout = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pb-14 pt-6 sm:pt-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);
