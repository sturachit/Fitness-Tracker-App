import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await signUp(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-8 rounded-lg shadow-md border border-gray-300 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-700 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 text-gray-600 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none bg-white"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-gray-600 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none bg-white"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-2 text-gray-600 font-semibold">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none bg-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Sign Up
        </button>
      </form>
      {/* Link to Login page */}
      <p className="text-center text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-gray-800 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
