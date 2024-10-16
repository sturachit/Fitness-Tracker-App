import { Activity, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { user } = useAuth();

  // State to manage recent workouts
  const [recentWorkouts, setRecentWorkouts] = useState([
    { id: 1, type: 'Running', duration: 30, date: '2024-10-14' },
    { id: 2, type: 'Cardio', duration: 20, date: '2024-10-12' },
    { id: 3, type: 'Cycling', duration: 60, date: '2024-10-10' },
    { id: 4, type: 'Dumbbells', duration: 20, date: '2024-10-15' },
  ]);

  const [newWorkout, setNewWorkout] = useState({
    type: '',
    duration: 0,
    date: '',
  });

  // Weekly goal target
  const weeklyGoal = { target: 150 };
  
  // State for current week's total duration
  const [currentWeeklyDuration, setCurrentWeeklyDuration] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value,
    }));
  };

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const newWorkoutEntry = { 
      id: Date.now(), // Use timestamp as unique ID
      ...newWorkout
    };
    setRecentWorkouts(prev => [...prev, newWorkoutEntry]);
    setNewWorkout({ type: '', duration: 0, date: '' }); // Reset form
  };

  // Function to calculate total duration for the current week
  const calculateWeeklyProgress = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Get the start of the week (Sunday)
    const totalDuration = recentWorkouts.reduce((total, workout) => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= startOfWeek ? total + workout.duration : total;
    }, 0);
    setCurrentWeeklyDuration(totalDuration);
  };

  // Effect to recalculate weekly progress whenever recentWorkouts changes
  useEffect(() => {
    calculateWeeklyProgress();
  }, [recentWorkouts]);

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Welcome, {user?.email}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Workouts */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <Activity className="mr-2 text-green-500" />
            Recent Workouts
          </h2>
          <ul className="space-y-4">
            {recentWorkouts.map((workout) => (
              <li key={workout.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300">
                <span className="font-medium text-gray-800">{workout.type}</span>
                <span className="text-gray-500">{workout.duration} mins</span>
                <span className="text-sm text-gray-400">{workout.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weekly Goal Progress */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <Target className="mr-2 text-blue-500" />
            Weekly Goal Progress
          </h2>
          <div className="mb-4">
            <div className="flex justify-between mb-2 text-gray-700">
              <span>{currentWeeklyDuration} / {weeklyGoal.target} minutes</span>
              <span>{Math.round((currentWeeklyDuration / weeklyGoal.target) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-width duration-500 ease-in-out" 
                style={{ width: `${(currentWeeklyDuration / weeklyGoal.target) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">Keep it up! You're on track to meet your weekly goal.</p>
        </div>
      </div>

      {/* Add Workout Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Workout</h2>
        <form onSubmit={handleAddWorkout} className="space-y-4">
          <div>
            <label className="block mb-1">Workout Type</label>
            <input 
              type="text"
              name="type"
              value={newWorkout.type}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Duration (in minutes)</label>
            <input 
              type="number"
              name="duration"
              value={newWorkout.duration}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Date</label>
            <input 
              type="date"
              name="date"
              value={newWorkout.date}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Add Workout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
