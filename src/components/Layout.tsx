import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Layout = ({ onToggleDarkMode, isDarkMode }: LayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-pink-50 to-blue-50'}`}>
      <Navbar onToggleDarkMode={onToggleDarkMode} isDarkMode={isDarkMode} />
      
      {/* <main className="flex-grow flex flex-1"> */}
        <Outlet />
      {/* </main> */}
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Layout;