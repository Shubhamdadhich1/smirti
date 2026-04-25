import StatusBadge from '../ui/StatusBadge';

export default function ReminderCard({ reminder }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-slate-200 hover:border-custom-teal transition-all hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-custom-teal/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-custom-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-slate-900 font-heading">{reminder.medicine}</h3>
              <p className="text-sm text-slate-500">{reminder.parentName}</p>
            </div>
            <StatusBadge status={reminder.status} />
          </div>
          
          <div className="grid grid-cols-4 gap-4 bg-slate-50 rounded-xl p-4">
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-1">TIME</p>
              <p className="text-base font-bold text-slate-900">{reminder.time}</p>
            </div>
            
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-1">SCHEDULE</p>
              <p className="text-base font-bold text-slate-900 capitalize">{reminder.repeatType}</p>
            </div>
            
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-1">LANGUAGE</p>
              <p className="text-base font-bold text-slate-900">{reminder.language === 'hi' ? 'Hindi' : 'English'}</p>
            </div>
            
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-1">ATTEMPTS</p>
              <p className="text-base font-bold text-slate-900">{reminder.attempts} / {reminder.maxAttempts}</p>
            </div>
          </div>

          {reminder.lastCalledAt && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last called: {new Date(reminder.lastCalledAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
