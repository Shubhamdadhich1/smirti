export default function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'TAKEN': return 'bg-custom-teal text-white';
      case 'CALLING': return 'bg-yellow-500 text-white';
      case 'MISSED': return 'bg-slate-100 text-slate-500';
      case 'PENDING': return 'bg-slate-200 text-slate-700';
      default: return 'bg-slate-200 text-slate-700';
    }
  };

  return (
    <span className={`px-4 py-2 rounded-xl font-bold text-sm ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}
