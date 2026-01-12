import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flame, Zap, Gamepad2, MapPin, Check, ArrowRight, Instagram, Twitter, Facebook, CreditCard, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';


const StreetKettles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const navigateTo = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const addToCart = () => {
    const existingItem = cart.find(item => item.id === 'sk-001');
    if (existingItem) {
      setCart(cart.map(item => item.id === 'sk-001' ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { id: 'sk-001', name: 'Street Kettles™ - Elote Edition', price: 4.99, qty: 1, image: 'package.jpg' }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) setSubscribed(true);
    } catch (error) {
      setSubscribed(true); 
    }
  };


  const Navbar = () => (
    <nav className="fixed w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Click to go Home */}
          <button onClick={() => navigateTo('home')} className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform">
              <Flame className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic uppercase ml-2">
              Street<span className="text-yellow-400">Kettles</span>
            </span>
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => navigateTo('home')} className={`text-sm font-bold uppercase tracking-widest hover:text-yellow-400 transition-colors ${activePage === 'home' ? 'text-white' : 'text-neutral-400'}`}>
              Home
            </button>
            <button onClick={() => navigateTo('vision')} className={`text-sm font-bold uppercase tracking-widest hover:text-yellow-400 transition-colors ${activePage === 'vision' ? 'text-white' : 'text-neutral-400'}`}>
              Our Vision
            </button>
            <button onClick={() => navigateTo('product')} className={`text-sm font-bold uppercase tracking-widest hover:text-yellow-400 transition-colors ${activePage === 'product' ? 'text-white' : 'text-neutral-400'}`}>
              The Product
            </button>
            
            {/* Cart / Buy Button */}
            <div className="flex items-center gap-4">
              {cart.length > 0 && (
                <button onClick={() => navigateTo('checkout')} className="relative p-2 text-neutral-400 hover:text-white">
                  <ShoppingBag size={20} />
                  <span className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.reduce((a, b) => a + b.qty, 0)}
                  </span>
                </button>
              )}
              <button 
                onClick={() => navigateTo('product')} 
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-full font-black uppercase tracking-wider transition-transform hover:scale-105 flex items-center gap-2"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {cart.length > 0 && (
                <button onClick={() => navigateTo('checkout')} className="relative p-2 text-white">
                  <ShoppingBag size={24} />
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.reduce((a, b) => a + b.qty, 0)}
                  </span>
                </button>
              )}
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
            <button onClick={() => navigateTo('home')} className="block w-full text-left text-xl font-bold uppercase text-white hover:text-yellow-400">Home</button>
            <button onClick={() => navigateTo('vision')} className="block w-full text-left text-xl font-bold uppercase text-white hover:text-yellow-400">Our Vision</button>
            <button onClick={() => navigateTo('product')} className="block w-full text-left text-xl font-bold uppercase text-white hover:text-yellow-400">The Product</button>
            <button onClick={() => navigateTo('product')} className="w-full bg-yellow-400 text-black py-3 rounded-lg font-black uppercase mt-4">Buy Now</button>
          </div>
        </div>
      )}
    </nav>
  );


  const HomePage = () => (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                <button onClick={() => navigateTo('product')} className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full font-black uppercase tracking-wider transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                  Shop The Drop <ArrowRight size={20} />
                </button>
                <button className="border border-neutral-700 hover:border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                  <Gamepad2 size={20} className="text-green-400"/>
                  Gamer Approved
                </button>
              </div>
            </div>
            <div className="relative group flex justify-center order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-green-400 rounded-[3rem] blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500 transform scale-90"></div>
              <img 
                src="package.jpg" 
                alt="Street Kettles" 
                className="relative z-10 w-full h-auto max-h-[500px] object-contain transform transition-transform duration-500 hover:scale-105 drop-shadow-2xl"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Package+Image"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flavor Profile */}
      <section className="py-24 bg-neutral-900">
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

      {/* Tech / USP */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-neutral-800/30 rounded-3xl p-8 md:p-16 border border-neutral-700 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-green-400 font-bold mb-6 tracking-widest uppercase text-sm">
                  <Zap size={16} /> Proprietary Tech
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                  The White Controller <br/><span className="text-white">Challenge.</span>
                </h2>
                <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                  We engineered a "Mess-Free" dry-dusting technology. Our seasoning adheres to the chip, not your fingers.
                </p>
                <button onClick={() => navigateTo('product')} className="text-white border-b-2 border-yellow-400 pb-1 font-bold hover:text-yellow-400 transition-colors">
                  Try It Yourself
                </button>
              </div>
              <div className="bg-black rounded-2xl p-8 border border-neutral-800 aspect-square flex flex-col items-center justify-center text-center relative overflow-hidden">
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

      {/* Locations */}
      <section className="py-24 bg-yellow-400 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Austin, We Have Arrived.</h2>
          <p className="text-xl font-bold mb-12 max-w-2xl mx-auto">Launching exclusively at select Tech Campus cafeterias, Gaming Lounges, and Royal Blue Grocery.</p>
          <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
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
    </>
  );

  const VisionPage = () => (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigateTo('home')} className="flex items-center text-neutral-400 hover:text-white mb-8 group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            The <span className="text-yellow-400">Vision</span>
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            We are bridging the gap between "Novelty" and "Comfort". Street Kettles isn't just a chip; it's a culinary intervention for the modern snacker.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800">
             <h3 className="text-2xl font-black uppercase italic mb-4 text-white">The Concept</h3>
             <p className="text-neutral-400 leading-relaxed mb-6">
                Street Kettles brings the vibrant, savory soul of street food to the fastest-growing snack category: the kettle chip. We are moving beyond standard "Cheese" or "BBQ" by capturing the indulgent taste of Elote (Street Corn) without the mess.
             </p>
             <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800">
             <h3 className="text-2xl font-black uppercase italic mb-4 text-white">Why It Wins</h3>
             <p className="text-neutral-400 leading-relaxed mb-6">
                Data shows consumers are craving Savory and Comfort flavors. Street Kettles targets this exact intersection: it offers the novelty of a trending street food flavor with the familiar, high-volume appeal of a premium potato chip.
             </p>
             <div className="w-16 h-1 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Story / Origin */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800">
          <div className="grid md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <h3 className="text-3xl font-black uppercase mb-6">Iron Kettle Collective</h3>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Founded in Austin, Texas, the Iron Kettle Collective was born from a simple observation: gaming and snacking are fundamental partners, but they have a "greasy" relationship problem.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                We set out to engineer a snack that delivers the "umami" punch of a dinner side dish in a format that respects your hardware.
              </p>
            </div>
            <div className="bg-neutral-800 min-h-[300px] relative overflow-hidden flex items-center justify-center">
              <img 
               src="logo.jpg" 
               alt="Street Kettles Package" 
               className="w-full max-w-md object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
               onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Package+Image"; }}
             />
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  const ProductPage = () => (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigateTo('home')} className="flex items-center text-neutral-400 hover:text-white mb-8 group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Product Image Gallery */}
          <div className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 flex items-center justify-center relative group">
             <div className="absolute inset-0 bg-yellow-400/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <img 
               src="package.jpg" 
               alt="Street Kettles Package" 
               className="w-full max-w-md object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
               onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Package+Image"; }}
             />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-yellow-400 text-black px-3 py-1 rounded text-xs font-black uppercase tracking-widest">Flagship Launch</span>
                <span className="text-green-400 text-xs font-bold uppercase tracking-widest border border-green-400/30 px-3 py-1 rounded">In Stock</span>
              </div>
              <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-2">Street Kettles™</h1>
              <p className="text-2xl text-neutral-400 mb-6">The Elote Edition</p>
              <div className="text-4xl font-bold text-yellow-400">$4.99</div>
            </div>

            <p className="text-lg text-neutral-300 leading-relaxed border-t border-neutral-800 pt-8">
              A rich, savory blast of roasted corn sweetness and creamy butter, grounded by a heavy dose of garlic. 
              Thick-cut, batch-fried kettle chips that offer a loud, glass-shattering crunch.
            </p>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                 <div className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Weight</div>
                 <div className="font-bold">5oz (142g)</div>
               </div>
               <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                 <div className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Serving</div>
                 <div className="font-bold">Sharing Size</div>
               </div>
            </div>

            <div className="pt-8 border-t border-neutral-800 space-y-4">
              <button 
                onClick={() => { addToCart(); navigateTo('checkout'); }}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-xl font-black uppercase tracking-wider text-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                <ShoppingBag size={24} /> Add to Cart & Checkout
              </button>
              <p className="text-center text-neutral-500 text-sm">Free shipping on orders over $25 in Austin metro area.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CheckoutPage = () => {
    const [success, setSuccess] = useState(false);

    const handleCheckout = (e) => {
      e.preventDefault();
      setTimeout(() => setSuccess(true), 1500);
    };

    if (success) return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg px-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Check size={40} className="text-black" />
          </div>
          <h1 className="text-4xl font-black uppercase italic mb-4">Order Confirmed!</h1>
          <p className="text-neutral-400 mb-8">
            Your "Mess-Free" snacks are on the way. Prepare your controller.
            <br/>Order #SK-{Math.floor(Math.random() * 10000)}
          </p>
          <button onClick={() => { setCart([]); setSuccess(false); navigateTo('home'); }} className="bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-3 rounded-full font-bold uppercase transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    );

    if (cart.length === 0) return (
       <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center">
         <ShoppingBag size={64} className="text-neutral-700 mb-6" />
         <h2 className="text-3xl font-black uppercase mb-4">Your Cart is Empty</h2>
         <button onClick={() => navigateTo('product')} className="text-yellow-400 hover:underline">Start Shopping</button>
       </div>
    );

    return (
      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black uppercase italic mb-12">Checkout</h1>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Shipping */}
              <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><MapPin size={20} className="text-yellow-400"/> Shipping Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" required className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg w-full focus:outline-none focus:border-yellow-400 transition-colors" />
                  <input type="text" placeholder="Last Name" required className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg w-full focus:outline-none focus:border-yellow-400 transition-colors" />
                  <input type="text" placeholder="Address" required className="col-span-2 bg-neutral-950 border border-neutral-800 p-3 rounded-lg w-full focus:outline-none focus:border-yellow-400 transition-colors" />
                  <input type="text" placeholder="City" required className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg w-full focus:outline-none focus:border-yellow-400 transition-colors" />
                  <input type="text" placeholder="ZIP Code" required className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg w-full focus:outline-none focus:border-yellow-400 transition-colors" />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><CreditCard size={20} className="text-green-400"/> Payment Method</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Card Number" required className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg w-full focus:outline-none focus:border-green-400 transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" required className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg w-full focus:outline-none focus:border-green-400 transition-colors" />
                    <input type="text" placeholder="CVC" required className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg w-full focus:outline-none focus:border-green-400 transition-colors" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-xl font-black uppercase tracking-wider text-lg transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                Pay ${cartTotal.toFixed(2)}
              </button>
            </form>

            {/* Order Summary */}
            <div>
              <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 sticky top-32">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-black rounded-lg p-2 border border-neutral-800">
                        <img src={item.image} alt="product" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <div className="text-yellow-400 text-sm">${item.price}</div>
                      </div>
                      <div className="flex items-center gap-3 bg-neutral-950 rounded-lg p-1 border border-neutral-800">
                        <button onClick={() => item.qty > 1 ? updateQty(item.id, -1) : removeFromCart(item.id)} className="p-1 hover:text-red-400 transition-colors">
                          {item.qty > 1 ? <Minus size={14}/> : <Trash2 size={14}/>}
                        </button>
                        <span className="text-sm font-mono w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-green-400 transition-colors">
                          <Plus size={14}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-neutral-800 pt-4 space-y-2 text-neutral-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-white font-black text-xl pt-4 border-t border-neutral-800 mt-4">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-yellow-400 selection:text-black">
      <Navbar />
      
      <main>
        {activePage === 'home' && <HomePage />}
        {activePage === 'vision' && <VisionPage />}
        {activePage === 'product' && <ProductPage />}
        {activePage === 'checkout' && <CheckoutPage />}
      </main>

      {/* Footer / Newsletter (Shared) */}
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