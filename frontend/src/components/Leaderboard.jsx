import React from 'react';
import { Trophy } from 'lucide-react';

const Leaderboard = ({ users, currentUser }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Leaderboard
        </h3>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        {users.map((u, index) => (
          <div 
            key={u._id} 
            className={`flex items-center justify-between p-3 rounded-lg border ${u._id === currentUser._id ? 'border-indigo-200 bg-indigo-50' : 'border-gray-50 bg-white hover:bg-gray-50'} transition-colors`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                index === 1 ? 'bg-gray-200 text-gray-700' : 
                index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-blue-50 text-blue-600'
              }`}>
                #{index + 1}
              </div>
              <div>
                <p className={`text-sm font-semibold ${u._id === currentUser._id ? 'text-indigo-900' : 'text-gray-900'}`}>
                  {u.name} {u._id === currentUser._id && '(You)'}
                </p>
                <p className="text-xs text-gray-500">{u.badge}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{u.rewards}</p>
              <p className="text-xs text-gray-400">pts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
