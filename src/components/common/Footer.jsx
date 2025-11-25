import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Contact Section */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8">Contact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm">
                  The Millenium Circle, 409, 150 Feet Ring Rd, nr. Nana Mava,
                  Padmi Society, Mavdi, Rajkot, Gujarat 360005
                </p>
              </div>
              <div>
                <a
                  href="mailto:info@navkalpit.com"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  info@navkalpit.com
                </a>
              </div>
              <div>
                <a
                  href="tel:+919999999999"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  +91 88491 07626
                </a>
              </div>
            </div>
            <button className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-700 transition-colors">
              Get a Quote
            </button>
          </div>

          {/* Be in the Know Section */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8">
              Be in the Know
            </h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto consequuntur, quod aut officiis, voluptatem fugit reprehenderit soluta culpa, beatae modi quidem? Possimus repellat tempora ipsum quos voluptatum laborum nesciunt alias.</p>
            {/* <form className="space-y-6">
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm a paragraph. Click here to add your own text and edit me.
                Let your users get to know you.
              </p>
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder=""
                  className="w-full px-4 py-3 bg-transparent border border-slate-600 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="subscribe"
                  className="w-5 h-5 border border-slate-600 rounded accent-white"
                />
                <label htmlFor="subscribe" className="text-sm text-slate-400">
                  Yes, subscribe me to your newsletter.
                </label>
              </div>
              <button
                type="submit"
                className="px-8 py-2 bg-white text-slate-900 font-bold rounded-full hover:shadow-lg transition-all"
              >
                Submit
              </button>
            </form> */}
          </div>

          {/* Menu Section */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8">Menu</h3>
            <nav className="space-y-4">
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                
              </ul>
            </nav>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8">Follow us on</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.facebook.com/share/19tdFeRrnR/" target="_blank"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                >
                   Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/navkalpit2610?igsh=MTlveXRwdjRubWR0dQ==" target="_blank"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@navkalpitofficial?si=2qpautCVcytz4wuS" target="_blank"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  Youtube
                </a>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 pt-8 mt-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
          <p>© {currentYear} Navkalpit 3D Printing. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Shipping Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
