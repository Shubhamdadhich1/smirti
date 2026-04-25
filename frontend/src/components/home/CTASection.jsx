import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-28 bg-gradient-to-br from-custom-teal to-custom-teal-600">
      <div className="max-w-4xl mx-auto px-8 text-center text-white">
        <h2 className="text-5xl font-black mb-6 font-heading">Ready to Get Started?</h2>
        <p className="text-2xl mb-12 opacity-95 font-subheading">
          Set up your first reminder in under 2 minutes. No credit card required.
        </p>
        <Link to="/get-started">
          <button className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0">
            Schedule Your First Reminder
          </button>
        </Link>
      </div>
    </section>
  );
}
