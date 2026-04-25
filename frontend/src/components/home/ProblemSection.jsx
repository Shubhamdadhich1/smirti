export default function ProblemSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black text-slate-900 font-heading mb-6">Why sMriti Matters</h2>
          <p className="text-xl text-slate-600 font-subheading max-w-3xl mx-auto">
            Medication non-adherence is a silent crisis affecting millions of elderly patients worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-lg">
            <div className="text-5xl font-black text-custom-teal mb-4">50%</div>
            <p className="text-lg text-slate-700 font-semibold mb-2">Non-Adherence Rate</p>
            <p className="text-slate-600 font-subheading">Of elderly patients don't take medications as prescribed</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-lg">
            <div className="text-5xl font-black text-custom-teal mb-4">125K</div>
            <p className="text-lg text-slate-700 font-semibold mb-2">Annual Deaths</p>
            <p className="text-slate-600 font-subheading">Due to medication non-compliance in the US alone</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-lg">
            <div className="text-5xl font-black text-custom-teal mb-4">₹300B</div>
            <p className="text-lg text-slate-700 font-semibold mb-2">Healthcare Cost</p>
            <p className="text-slate-600 font-subheading">Wasted annually due to missed medications</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-custom-teal to-custom-teal-700 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h3 className="text-3xl font-black mb-4 font-heading">Our Solution</h3>
          <p className="text-xl font-subheading leading-relaxed max-w-3xl mx-auto">
            sMriti bridges the gap with automated voice reminders, instant confirmation tracking, and real-time caregiver alerts — ensuring your loved ones never miss a dose.
          </p>
        </div>
      </div>
    </section>
  );
}
