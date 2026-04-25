import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/">
            <span className="text-3xl font-black text-slate-900 tracking-tight underline decoration-custom-teal decoration-2 underline-offset-4 hover:text-custom-teal hover:scale-105 transition-all cursor-pointer" style={{fontFamily: 'Lato, sans-serif'}}>sMriti</span>
          </Link>
        </div>

        {isHome ? (
          <>
            <div className="hidden md:flex gap-10 text-slate-600 font-medium text-sm">
              <a href="#home" className="hover:text-custom-teal cursor-pointer transition-colors">Home</a>
              <a href="#how-it-works" className="hover:text-custom-teal cursor-pointer transition-colors">How It Works</a>
              <a href="#features" className="hover:text-custom-teal cursor-pointer transition-colors">Features</a>
              <a href="#contact" className="hover:text-custom-teal cursor-pointer transition-colors">Contact</a>
              <Link to="/dashboard" className="hover:text-custom-teal cursor-pointer transition-colors">Dashboard</Link>
            </div>

            <Link to="/get-started">
              <button className="bg-slate-900 text-white px-7 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
                Get Started
              </button>
            </Link>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/dashboard" className={`font-semibold text-sm transition-colors ${isDashboard ? 'text-custom-teal border-b-2 border-custom-teal' : 'text-slate-600 hover:text-custom-teal'}`}>
              Dashboard
            </Link>
            <Link to="/" className={`font-medium text-sm transition-colors ${!isDashboard ? 'text-custom-teal border-b-2 border-custom-teal' : 'text-slate-600 hover:text-custom-teal'}`}>
              Home
            </Link>
            {!isDashboard && (
               <Link to="/get-started" className="ml-4">
                  <button className="bg-slate-900 text-white px-5 py-2 text-sm rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0">
                    Get Started
                  </button>
               </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
