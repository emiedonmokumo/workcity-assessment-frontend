import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const ProtectedLayout = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <Outlet />
      </div>
    </main>
  );
};

export default ProtectedLayout;
