import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import DashboardStats from '../components/dashboard/DashboardStats';
import ReminderList from '../components/dashboard/ReminderList';
import EmptyState from '../components/dashboard/EmptyState';

export default function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
    const interval = setInterval(fetchReminders, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reminders`);
      setReminders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navbar />

      {/* Dashboard Content */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 font-heading mb-2">My Reminders</h1>
            <p className="text-lg text-slate-600 font-subheading">Track your medication schedule in real-time</p>
          </div>
          <Link to="/get-started">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0">
              + Add Reminder
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-custom-teal border-t-transparent"></div>
            <p className="mt-6 text-lg text-slate-600 font-semibold">Loading your reminders...</p>
          </div>
        ) : reminders.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            <DashboardStats reminders={reminders} />
            <ReminderList reminders={reminders} />
          </div>
        )}
      </section>
    </div>
  );
}