import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const Statistics: React.FC = () => {
  // Mock data (replace with actual data from API)
  const workoutTrends = [
    { date: '2024-03-01', duration: 30 },
    { date: '2024-03-02', duration: 45 },
    { date: '2024-03-03', duration: 60 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Workout Statistics</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Workout Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={workoutTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="duration" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      
    </div>
  );
};

export default Statistics;