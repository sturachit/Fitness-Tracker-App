// src/App.tsx

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import WorkoutLog from './components/WorkoutLog';
import Statistics from './components/Statistics';
import GoalSetting from './components/GoalSetting';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState } from 'react';

interface Goal {
  type: string;
  target: number;
  period: 'weekly' | 'monthly';
  reminderTime?: string;
  reminderMessage?: string;
}

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth(); // Get the current user from context
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [goals, setGoals] = useState<Goal[]>([]); // State to hold the goals

  const handleAddGoal = (goal: Goal) => {
    setGoals(prevGoals => [...prevGoals, goal]); // Update the goals state
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/workout-log"
                element={
                  <PrivateRoute>
                    <WorkoutLog />
                  </PrivateRoute>
                }
              />
              <Route
                path="/statistics"
                element={
                  <PrivateRoute>
                    <Statistics />
                  </PrivateRoute>
                }
              />
              <Route
                path="/goals"
                element={
                  <PrivateRoute>
                    <GoalSetting onAddGoal={handleAddGoal} /> 
                  </PrivateRoute>
                }
              />

              {/* Default route redirect */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
