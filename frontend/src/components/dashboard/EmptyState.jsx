import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-20 text-center border-2 border-slate-200">
      <div className="w-32 h-32 bg-custom-teal/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="w-16 h-16 text-custom-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-3xl font-black text-slate-900 mb-4 font-heading">No Reminders Yet</h3>
      <p className="text-lg text-slate-600 mb-10 font-subheading max-w-md mx-auto">Start by scheduling your first medicine reminder to keep your loved ones safe</p>
      <Link to="/get-started">
        <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0">
          Schedule First Reminder
        </button>
      </Link>
    </div>
  );
}
