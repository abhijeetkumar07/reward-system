import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import Analytics from './Analytics';
import { Briefcase, Calendar, TrendingUp, Award, Star, Cpu } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(loggedInUser));
      fetchLeaderboard();
    }
  }, [navigate]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setAllUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
    }
  };

  if (!user) return null;

  const StatCard = ({ icon: Icon, title, value, subtitle, colorClass }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start space-x-4 transition-transform hover:-translate-y-1 hover:shadow-md">
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name} 👋</h1>
          <p className="text-gray-500 mt-1">Here is your performance overview and reward status.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Briefcase} 
            title="Experience" 
            value={user.experience} 
            subtitle={user.company}
            colorClass="bg-blue-50 text-blue-600"
          />
          <StatCard 
            icon={Calendar} 
            title="Attendance" 
            value={`${user.attendance}%`} 
            subtitle="Current Year"
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard 
            icon={TrendingUp} 
            title="Performance" 
            value={`${user.performance}/100`} 
            subtitle="Latest Appraisal"
            colorClass="bg-purple-50 text-purple-600"
          />
          <StatCard 
            icon={Award} 
            title="Total Points" 
            value={user.rewards} 
            subtitle={`${user.badge} Tier`}
            colorClass="bg-orange-50 text-orange-600"
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: AI Explanation & Badge Status */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star className="w-24 h-24" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                Current Tier
              </h3>
              <div className="flex items-end space-x-2 mt-4">
                <span className="text-4xl font-extrabold text-indigo-600">{user.badge}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">You've earned {user.rewards} points so far.</p>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-indigo-500" />
                  AI Decision Logic
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  Our AI system calculates rewards transparently based on two key metrics to ensure fairness:
                </p>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span> &gt;90% Att. &amp; &gt;85% Perf. = Gold (100 pts)</li>
                  <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span> &gt;75% Att. = Silver (50 pts)</li>
                  <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-700 mr-2"></span> Default = Bronze (20 pts)</li>
                </ul>
              </div>
            </div>

            <Leaderboard users={allUsers} currentUser={user} />
          </div>

          {/* Right Column: Analytics */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Company Analytics</h3>
              <Analytics users={allUsers} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
