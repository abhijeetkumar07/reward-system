import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Award } from 'lucide-react';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-indigo-600 mr-2" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">T-System Rewards</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
              <span className="text-xs text-gray-500">{user?.designation}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
