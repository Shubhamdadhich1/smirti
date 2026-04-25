import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section id="home" className="max-w-7xl mx-auto px-8 py-28 grid md:grid-cols-2 gap-20 items-center">
      <div>
        <div className="inline-flex items-center gap-2 bg-custom-teal/10 text-custom-teal-700 px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-custom-teal/20">
          <div className="w-2 h-2 bg-custom-teal rounded-full animate-pulse"></div>
          Trusted by 500+ Families
        </div>
        
        <h1 className="text-7xl font-black leading-[1.1] text-slate-900 font-heading tracking-tight">
          Never Miss a
          <br />
          <span className="text-custom-teal">Dose Again</span>
        </h1>

        <p className="mt-8 text-2xl text-slate-600 leading-relaxed font-subheading">
          Voice-based medicine reminders for elderly parents with automated calls, confirmation tracking, and instant caregiver alerts.
        </p>

        <div className="mt-12">
          <Link to="/get-started">
            <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0">
              Schedule a Reminder
            </button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-black text-custom-teal">98%</p>
            <p className="text-sm text-slate-500 mt-2 font-medium">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-custom-teal">2 Min</p>
            <p className="text-sm text-slate-500 mt-2 font-medium">Setup Time</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-custom-teal">24/7</p>
            <p className="text-sm text-slate-500 mt-2 font-medium">Monitoring</p>
          </div>
        </div>
      </div>

      {/* Dashboard Preview - Screenshot Style */}
      <div className="relative pointer-events-none select-none">
        {/* Browser Chrome */}
        <div className="bg-white/60 backdrop-blur-xl rounded-t-2xl p-3 border border-slate-200/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-md px-3 py-1 text-xs text-slate-400 ml-2">
              smriti.health/dashboard
            </div>
          </div>
        </div>
        
        {/* Screenshot Content */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-b-3xl shadow-2xl p-10 border-x border-b border-slate-200/50">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-custom-teal via-custom-teal-600 to-custom-teal"></div>
          
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">Today's Status</h3>
            <div className="flex items-center gap-2 bg-custom-teal/10 backdrop-blur-sm text-custom-teal-700 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-custom-teal rounded-full"></div>
              <span className="text-xs font-bold">LIVE</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm p-5 rounded-2xl border-2 border-slate-200/50">
              <div>
                <p className="font-bold text-slate-900 text-lg">BP Medicine</p>
                <p className="text-sm text-slate-500 mt-1">09:00 AM • Daily</p>
              </div>
              <div className="bg-custom-teal text-white px-4 py-2 rounded-xl font-bold text-sm">
                TAKEN
              </div>
            </div>

            <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm p-5 rounded-2xl border-2 border-slate-200/50">
              <div>
                <p className="font-bold text-slate-900 text-lg">Vitamin D</p>
                <p className="text-sm text-slate-500 mt-1">01:00 PM • Daily</p>
              </div>
              <div className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm">
                PENDING
              </div>
            </div>

            <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm p-5 rounded-2xl border-2 border-slate-200/50">
              <div>
                <p className="font-bold text-slate-900 text-lg">Insulin</p>
                <p className="text-sm text-slate-500 mt-1">08:00 PM • Daily</p>
              </div>
              <div className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl font-bold text-sm">
                MISSED
              </div>
            </div>
          </div>
          
          {/* Demo Watermark */}
          <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-medium">
            Demo Data
          </div>
        </div>
      </div>
    </section>
  );
}
