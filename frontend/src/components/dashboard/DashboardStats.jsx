export default function DashboardStats({ reminders }) {
  const total = reminders.length;
  const taken = reminders.filter(r => r.status === 'TAKEN').length;
  const pending = reminders.filter(r => r.status === 'PENDING').length;
  const missed = reminders.filter(r => r.status === 'MISSED').length;

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-4xl font-black text-custom-teal mb-2">{total}</p>
        <p className="text-sm text-slate-600 font-bold">Total Reminders</p>
      </div>
      <div className="bg-white rounded-2xl p-6 border-2 border-custom-teal/20 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-4xl font-black text-custom-teal mb-2">{taken}</p>
        <p className="text-sm text-slate-600 font-bold">Taken Today</p>
      </div>
      <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-4xl font-black text-slate-400 mb-2">{pending}</p>
        <p className="text-sm text-slate-600 font-bold">Pending</p>
      </div>
      <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <p className="text-4xl font-black text-slate-400 mb-2">{missed}</p>
        <p className="text-sm text-slate-600 font-bold">Missed</p>
      </div>
    </div>
  );
}
