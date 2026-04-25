export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-4 gap-16">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black text-slate-900 underline decoration-custom-teal decoration-2 underline-offset-4" style={{fontFamily: 'Lato, sans-serif'}}>sMriti</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-subheading">
              Voice-based medicine reminder system ensuring medication compliance for elderly parents.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-lg font-heading">Product</h4>
            <ul className="space-y-4 text-slate-600">
              <li><a href="#how-it-works" className="hover:text-custom-teal cursor-pointer transition-colors">How It Works</a></li>
              <li><a href="#features" className="hover:text-custom-teal cursor-pointer transition-colors">Features</a></li>
              <li className="hover:text-custom-teal cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-custom-teal cursor-pointer transition-colors">Demo</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-lg font-heading">Company</h4>
            <ul className="space-y-4 text-slate-600">
              <li className="hover:text-custom-teal cursor-pointer transition-colors">About Us</li>
              <li><a href="#contact" className="hover:text-custom-teal cursor-pointer transition-colors">Contact</a></li>
              <li className="hover:text-custom-teal cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-custom-teal cursor-pointer transition-colors">Terms</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-lg font-heading">Contact</h4>
            <ul className="space-y-4 text-slate-600">
              <li>support@smriti.health</li>
              <li>+91 90000 00000</li>
              <li>India</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-300 text-center text-slate-500">
          © 2026 sMriti. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
