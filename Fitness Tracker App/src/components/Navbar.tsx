import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, BarChart2, Target, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className="text-3xl font-bold text-green-400 hover:text-green-300 transition-colors">
          The Fitness Club
        </Link>

        {/* Navigation Links */}
        {user ? (
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="flex items-center hover:text-green-400 transition-colors">
              <Activity className="mr-1 text-green-400" size={20} />
              Dashboard
            </Link>
            <Link to="/workout-log" className="flex items-center hover:text-blue-400 transition-colors">
              <BarChart2 className="mr-1 text-blue-400" size={20} />
              Log Workout
            </Link>
            <Link to="/statistics" className="flex items-center hover:text-purple-400 transition-colors">
              <BarChart2 className="mr-1 text-purple-400" size={20} />
              Statistics
            </Link>
            <Link to="/goals" className="flex items-center hover:text-yellow-400 transition-colors">
              <Target className="mr-1 text-yellow-400" size={20} />
              Goals
            </Link>
            <button
              onClick={logout}
              className="flex items-center hover:text-red-400 transition-colors focus:outline-none"
            >
              <LogOut className="mr-1 text-red-400" size={20} />
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-6 flex">
        
            <Link
              to="/signup"
              className="flex items-center bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              <UserPlus className="mr-2" size={20} />
              Sign Up
            </Link>
            <Link
              to="/login"
              className="flex items-center bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              <LogIn className="mr-2" size={20} />
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
