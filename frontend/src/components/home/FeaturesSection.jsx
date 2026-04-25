export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-slate-900 font-heading">Real-Time Status Tracking</h2>
          <p className="mt-5 text-xl text-slate-600 font-subheading">Monitor medication compliance at a glance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* TAKEN Status */}
          <div className="bg-slate-50 rounded-3xl p-8 border-2 border-slate-200">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900 text-lg">BP Medicine</p>
                  <p className="text-sm text-slate-500 mt-1">09:00 AM</p>
                </div>
                <div className="bg-custom-teal text-white px-4 py-2 rounded-xl font-bold text-sm">
                  TAKEN
                </div>
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 font-heading">Medicine Confirmed</h3>
            <p className="text-slate-600 leading-relaxed font-subheading">
              Patient pressed 1 to confirm. Caregiver notified of successful intake.
            </p>
          </div>

          {/* PENDING Status */}
          <div className="bg-slate-50 rounded-3xl p-8 border-2 border-slate-200">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900 text-lg">Vitamin D</p>
                  <p className="text-sm text-slate-500 mt-1">01:00 PM</p>
                </div>
                <div className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm">
                  PENDING
                </div>
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 font-heading">Awaiting Time</h3>
            <p className="text-slate-600 leading-relaxed font-subheading">
              Scheduled for later today. System will call at the designated time.
            </p>
          </div>

          {/* MISSED Status */}
          <div className="bg-slate-50 rounded-3xl p-8 border-2 border-slate-200">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900 text-lg">Insulin</p>
                  <p className="text-sm text-slate-500 mt-1">08:00 PM</p>
                </div>
                <div className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl font-bold text-sm">
                  MISSED
                </div>
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 font-heading">Alert Sent</h3>
            <p className="text-slate-600 leading-relaxed font-subheading">
              No response after 2 attempts. SMS alert sent to caregiver immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
