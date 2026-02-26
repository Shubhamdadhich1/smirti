import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000';

function App() {
  const [form, setForm] = useState({
    parentName: '',
    parentPhone: '',
    medicine: '',
    time: '',
    caregiverPhone: '',
    language: 'hi',
    repeatType: 'daily',
    daysOfWeek: [],
    dayOfMonth: ''
  });

  const [reminders, setReminders] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await axios.post(`${API}/schedule`, form);
    alert('Reminder Scheduled');
  };

  const fetchData = async () => {
    const res = await axios.get(`${API}/reminders`);
    setReminders(res.data);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>sMriti</h1>

      <h2>Schedule Reminder</h2>
      <input placeholder="Parent Name" name="parentName" onChange={handleChange} />
      <input placeholder="Parent Phone" name="parentPhone" onChange={handleChange} />
      <input placeholder="Medicine" name="medicine" onChange={handleChange} />
      <input type="time" name="time" onChange={handleChange} />
      <input placeholder="Caregiver Phone" name="caregiverPhone" onChange={handleChange} />
      
      {/* Language Toggle */}
      <select name="language" onChange={handleChange} value={form.language}>
        <option value="hi">Hindi</option>
        <option value="en">English</option>
      </select>
      {/* Language */}
      <select name="language" onChange={handleChange} value={form.language}>
        <option value="hi">Hindi</option>
        <option value="en">English</option>
      </select>

      {/* Repeat Type */}
      <select name="repeatType" onChange={handleChange} value={form.repeatType}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      {/* Weekly Days (0-6) */}
      {form.repeatType === 'weekly' && (
        <input
          placeholder="Days (0=Sun,1=Mon...)"
          onChange={(e) => setForm({ ...form, daysOfWeek: e.target.value.split(',').map(Number) })}
        />
      )}

      {/* Monthly Date */}
      {form.repeatType === 'monthly' && (
        <input
          placeholder="Date (1-31)"
          name="dayOfMonth"
          onChange={handleChange}
        />
      )}

      <button onClick={submit}>Schedule</button>

      <h2>Dashboard</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Medicine</th>
            <th>Time</th>
            <th>Repeat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map(r => {
            const getRepeatText = () => {
              if (r.repeatType === 'daily') return 'Daily';
              if (r.repeatType === 'weekly') return `Weekly (${r.daysOfWeek?.join(',')})`;
              if (r.repeatType === 'monthly') return `Monthly (Date ${r.dayOfMonth})`;
              return 'Once';
            };

            return (
              <tr key={r.id}>
                <td>{r.parentName}</td>
                <td>{r.medicine}</td>
                <td>{r.time}</td>
                <td>{getRepeatText()}</td>
                <td>{r.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;