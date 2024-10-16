// src/components/GoalSetting.tsx

import React, { useState } from 'react';
import { Clock, Target } from 'react-feather'; // Import icons
// import { useAuth } from '../context/AuthContext';

interface Goal {
  type: string;
  target: number;
  period: 'weekly' | 'monthly';
  reminderTime?: string;  // Optional reminder time
  reminderMessage?: string; // Optional reminder message
}

interface GoalSettingProps {
  onAddGoal: (goal: Goal) => void;
}

const GoalSetting: React.FC<GoalSettingProps> = ({ onAddGoal }) => {
  // const  user  = useAuth();
  const [goal, setGoal] = useState<Goal>({
    type: '',
    target: 0,
    period: 'weekly',
    reminderTime: '', // Initialize reminder time
    reminderMessage: '' // Initialize reminder message
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onAddGoal(goal); // Call the passed function to add the goal
    setGoal({
      type: '',
      target: 0,
      period: 'weekly',
      reminderTime: '', 
      reminderMessage: '' 
    });
  };

  return (
    <div className="max-w-md mx-auto mb-6 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Target className="mr-2 text-blue-500" />
        Set Fitness Goal
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block mb-1">Goal Type</label>
          <select
            id="type"
            name="type"
            value={goal.type}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select a goal type</option>
            <option value="Workout Minutes">Workout Minutes</option>
            <option value="Calories Burned">Calories Burned</option>
            <option value="Workouts Completed">Workouts Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="target" className="block mb-1">Target</label>
          <input
            type="number"
            id="target"
            name="target"
            value={goal.target}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="period" className="block mb-1">Period</label>
          <select
            id="period"
            name="period"
            value={goal.period}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label htmlFor="reminderTime" className=" mb-1 flex items-center">
            <Clock className="mr-2 text-gray-600" />
            Reminder Time (HH:MM)
          </label>
          <input
            type="text"
            id="reminderTime"
            name="reminderTime"
            placeholder="e.g., 14:30"
            value={goal.reminderTime}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Reminder Message Input */}
        <div>
          <label htmlFor="reminderMessage" className="block mb-1">Reminder Message</label>
          <input
            type="text"
            id="reminderMessage"
            name="reminderMessage"
            value={goal.reminderMessage}
            onChange={handleInputChange}
            placeholder="What do you want to be reminded about?"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Set Goal
        </button>
      </form>
    </div>
  );
};

export default GoalSetting;
