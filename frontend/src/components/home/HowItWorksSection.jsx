export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-24">
          <h2 className="text-6xl font-black text-slate-900 font-heading mb-6">How It Works</h2>
          <p className="text-xl text-slate-600 font-subheading max-w-2xl mx-auto">Three simple steps to ensure your loved ones never miss their medication</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-custom-teal/20 via-custom-teal to-custom-teal/20"></div>
          
          <div className="grid md:grid-cols-3 gap-16 relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-48 h-48 bg-gradient-to-br from-custom-teal to-custom-teal-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-custom-teal">
                    <span className="text-3xl font-black text-custom-teal">1</span>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 font-heading">Schedule</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-subheading">
                  Set up reminders with parent's details, medicine name, and preferred time in just 2 minutes
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-48 h-48 bg-gradient-to-br from-custom-teal to-custom-teal-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-custom-teal">
                    <span className="text-3xl font-black text-custom-teal">2</span>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 font-heading">Call</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-subheading">
                  Automated voice call in Hindi or English reminds them to take medicine at the exact time
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-48 h-48 bg-gradient-to-br from-custom-teal to-custom-teal-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-custom-teal">
                    <span className="text-3xl font-black text-custom-teal">3</span>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 font-heading">Confirm</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-subheading">
                  They press 1 to confirm. You get instant alerts if medicine is missed after 2 attempts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
