import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Flame, Zap, Gamepad2, MapPin, Check, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';

const StreetKettles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setSubscribed(true);
        console.log("Subscribed successfully!");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center transform -rotate-3">
                <Flame className="text-black w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter italic uppercase ml-2">
                Street<span className="text-yellow-400">Kettles</span>
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8 items-center">
              {['Flavor', 'Science', 'Story', 'Find Us'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-yellow-400 transition-colors">
                  {item}
                </a>
              ))}
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-full font-black uppercase tracking-wider transition-transform hover:scale-105 flex items-center gap-2">
                <ShoppingBag size={18} />
                Buy Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-yellow-400">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-b border-neutral-800">
            <div className="px-4 pt-2 pb-8 space-y-4">
              {['Flavor', 'Science', 'Story', 'Find Us'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-xl font-bold uppercase text-white hover:text-yellow-400" onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <button className="w-full bg-yellow-400 text-black py-3 rounded-lg font-black uppercase mt-4">
                Buy Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="inline-block px-4 py-1 border border-yellow-400/30 rounded-full bg-yellow-400/10 backdrop-blur-sm">
                <span className="text-yellow-400 font-bold text-xs uppercase tracking-[0.2em]">Launch Market: Austin, TX</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                STREET FOOD <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">SOUL.</span>
                <br />
                CLEAN HAND <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">CONFIDENCE.</span>
              </h1>
              
              <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
                The indulgent taste of <span className="text-white font-bold">Elote (Street Corn)</span> meets the glass-shattering crunch of a premium kettle chip. No mess. No grease. Just flavor.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full font-black uppercase tracking-wider transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                  Shop The Drop <ArrowRight size={20} />
                </button>
                <button className="border border-neutral-700 hover:border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                  <Gamepad2 size={20} className="text-green-400"/>
                  Gamer Approved
                </button>
              </div>
            </div>

            {/* Product Image Section */}
            <div className="relative group flex justify-center order-1 lg:order-2">
              {/* Adjusted Glow for wider images */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-green-400 rounded-[3rem] blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500 transform scale-90"></div>
              
              {/* The Package Image: Constrained height and flexible width */}
              <img 
                src="/package.jpg" 
                alt="Street Kettles - Garlic Butter & Roasted Corn" 
                className="relative z-10 w-full h-auto max-h-[500px] object-contain transform transition-transform duration-500 hover:scale-105 drop-shadow-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Package+Image"; // Fallback for preview
                }}
              />
              
              {/* Floating Element Decoration */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Flavor Profile Section */}
      <section id="flavor" className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Anatomy of the <span className="text-yellow-400">Flavor</span>
            </h2>
            <p className="text-neutral-400">A dinner side dish experience in a snack format.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌽", title: "Roasted Corn", desc: "Freeze-dried sweet corn powder base for authentic sweetness." },
              { icon: "🧈", title: "Creamy Butter", desc: "Rich, enzyme-modified butter notes that coat the palate." },
              { icon: "🧄", title: "Savory Garlic", desc: "A heavy dose of garlic & onion for that umami punch." },
              { icon: "🍋", title: "Zesty Lime", desc: "A mandatory acid finish to cut the richness." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-neutral-950 p-8 rounded-2xl border border-neutral-800 hover:border-yellow-400/50 transition-colors group">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold uppercase mb-3 text-white">{feature.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The USP / Gamer Section */}
      <section id="science" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-neutral-800/30 rounded-3xl p-8 md:p-16 border border-neutral-700 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-green-400 font-bold mb-6 tracking-widest uppercase text-sm">
                  <Zap size={16} /> 
                  Proprietary Tech
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                  The White Controller <br/>
                  <span className="text-white">Challenge.</span>
                </h2>
                <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                  We engineered a "Mess-Free" dry-dusting technology. Our seasoning adheres to the chip, not your fingers. 
                  Perfect for gaming sessions, coding marathons, or the morning commute.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "No greasy residue on keyboards",
                    "High-adhesion spice blend",
                    "Batch-fried for glass-shattering crunch"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-400">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check size={14} className="text-green-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-black rounded-2xl p-8 border border-neutral-800 aspect-square flex flex-col items-center justify-center text-center relative overflow-hidden">
                 {/* Decorative Grid */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                 
                 <Gamepad2 size={64} className="text-neutral-600 mb-6 relative z-10" />
                 <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Tested on Hardware</h3>
                 <p className="text-neutral-500 text-sm max-w-xs relative z-10">
                   "I ate a whole bag while playing ranked. My controller is still pristine." <br/>
                   <span className="text-yellow-400 mt-2 block">- Marcus, Austin TX</span>
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Launch / Find Us */}
      <section id="find us" className="py-24 bg-yellow-400 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            Austin, We Have Arrived.
          </h2>
          <p className="text-xl font-bold mb-12 max-w-2xl mx-auto">
            Launching exclusively at select Tech Campus cafeterias, Gaming Lounges, and Royal Blue Grocery.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto mb-16">
            {[
              { loc: "Royal Blue Grocery", addr: "Downtown & East 6th" },
              { loc: "Alienware Outpost", addr: "The Domain" },
              { loc: "Capital Factory", addr: "Brazos St" }
            ].map((place, i) => (
              <div key={i} className="bg-black/10 p-6 rounded-xl backdrop-blur-sm border border-black/10">
                <MapPin className="mb-4 text-black" size={24} />
                <h3 className="font-black text-xl uppercase">{place.loc}</h3>
                <p className="font-medium opacity-70">{place.addr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Newsletter */}
      <footer className="bg-neutral-950 pt-24 pb-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center transform -rotate-3">
                  <Flame className="text-black w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tighter italic uppercase text-white">
                  Street<span className="text-yellow-400">Kettles</span>
                </span>
              </div>
              <p className="text-neutral-500 max-w-sm mb-8">
                Premium kettle-cooked chips inspired by street food culture. 
                Made in small batches. Designed for clean hands and loud crunches.
              </p>
              <div className="flex space-x-6">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="text-neutral-400 hover:text-white transition-colors">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-2">Join "The Clean Break"</h3>
              <p className="text-neutral-400 mb-6 text-sm">Get notified about the Spicy Street Corn drop and pop-up locations.</p>
              
              {subscribed ? (
                <div className="bg-green-500/10 text-green-400 p-4 rounded-lg flex items-center gap-3 font-bold">
                  <Check size={20} /> You're on the list.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter email address" 
                    className="flex-1 bg-neutral-950 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-lg font-bold uppercase transition-colors">
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-neutral-600 text-sm">
            <p>&copy; 2026 Iron Kettle Collective. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StreetKettles;