import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis 
} from 'recharts';

const Analytics = ({ users }) => {
  if (!users || users.length === 0) return <div className="text-gray-500">Loading analytics...</div>;

  // Prepare data for Attendance vs Performance Scatter Chart
  const scatterData = users.map(u => ({
    name: u.name,
    attendance: u.attendance,
    performance: u.performance,
    rewards: u.rewards
  }));

  // Prepare data for Badge Distribution
  const badgeCounts = users.reduce((acc, user) => {
    acc[user.badge] = (acc[user.badge] || 0) + 1;
    return acc;
  }, { Gold: 0, Silver: 0, Bronze: 0 });

  const barData = [
    { name: 'Gold (100 pts)', count: badgeCounts.Gold, fill: '#EAB308' },
    { name: 'Silver (50 pts)', count: badgeCounts.Silver, fill: '#9CA3AF' },
    { name: 'Bronze (20 pts)', count: badgeCounts.Bronze, fill: '#B45309' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
          <p className="font-bold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">Attendance: {data.attendance}%</p>
          <p className="text-sm text-gray-600">Performance: {data.performance}/100</p>
          <p className="text-sm font-semibold text-indigo-600 mt-1">Rewards: {data.rewards} pts</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Chart 1: Performance vs Attendance */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center">AI Analysis: Attendance vs Performance Mapping</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" domain={[50, 100]} />
              <YAxis type="number" dataKey="performance" name="Performance" domain={[50, 100]} />
              <ZAxis type="number" range={[100, 300]} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Employees" data={scatterData} fill="#4F46E5" opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Badge Distribution */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center">Reward Tier Distribution</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
