import ReminderCard from './ReminderCard';

export default function ReminderList({ reminders }) {
  return (
    <div className="space-y-4">
      {reminders.map((reminder) => (
        <ReminderCard key={reminder.id} reminder={reminder} />
      ))}
    </div>
  );
}
