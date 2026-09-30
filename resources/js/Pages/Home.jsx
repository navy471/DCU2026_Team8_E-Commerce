import React, { useState, createContext, useContext, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { 
  Search, 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  PhoneCall, 
  Car, 
  Bike, 
  Heart,
  RotateCcw,
  Headphones
} from 'lucide-react';

// ==========================================
// 1. WISHLIST CONTEXT & PROVIDER
// ==========================================
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('g4_wishlist');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('g4_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

// ==========================================
// 2. VEHICLE CARD COMPONENT WITH WISHLIST
// ==========================================
function VehicleCard({ vehicle, cardType = 'car' }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(vehicle.id);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 p-3 flex flex-col justify-between relative group hover:-translate-y-1">
      {/* Badge Tag */}
      {vehicle.tag && (
        <span className={`absolute top-2.5 left-2.5 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider z-10 shadow-sm ${
          cardType === 'car' ? 'bg-red-600' : 'bg-slate-900'
        }`}>
          {vehicle.tag}
        </span>
      )}

      {/* Wishlist Heart Button */}
      <button
        type="button"
        onClick={() => toggleWishlist(vehicle)}
        className="absolute top-2.5 right-2.5 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-slate-100 hover:bg-white text-slate-600 hover:text-red-500 transition-all duration-200 active:scale-90"
        title={isSaved ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isSaved ? 'text-red-500 fill-red-500' : 'text-slate-400'
          }`}
        />
      </button>

      <div>
        <div className="h-36 rounded-lg overflow-hidden bg-slate-50 mb-3 flex items-center justify-center relative">
          <img
            src={vehicle.img}
            alt={vehicle.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
        <h3 className="font-bold text-slate-900 text-xs truncate mb-1 group-hover:text-red-600 transition-colors">
          {vehicle.name}
        </h3>
        <p className="text-[10px] text-slate-500 mb-2 font-medium">{vehicle.specs}</p>
        <p className="text-red-600 font-black text-base mb-3">{vehicle.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100">
        <Link
          href={`/vehicles/${vehicle.id}`}
          className="text-center text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 rounded-lg transition-all"
        >
          View Details
        </Link>
        <Link
          href="/installment"
          className="text-center text-[10px] font-bold text-white bg-red-600 hover:bg-red-700 py-2 rounded-lg transition-all shadow-sm"
        >
          Book Drive
        </Link>
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN HOME CONTENT COMPONENT
// ==========================================
function HomeContent() {
  const [activeTab, setActiveTab] = useState('all');

  const carsData = [
    { id: 'c1', name: 'Toyota Prius Option 4', price: '$26,800', specs: 'Hybrid | Auto | 24.8 km/l', tag: 'BEST SELLER', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600' },
    { id: 'c2', name: 'Ford Raptor 3.0L V6', price: '$72,500', specs: 'Diesel | Auto | 17.4 km/l', tag: 'NEW', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600' },
    { id: 'c3', name: 'Lexus LX600 Kuro', price: '$185,000', specs: 'Petrol | Auto | 20.7 km/l', tag: 'PREMIUM', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600' },
    { id: 'c4', name: 'BMW M4 Competition', price: '$98,000', specs: 'Petrol | Auto | 18.4 km/l', tag: 'HOT', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600' },
    { id: 'c5', name: 'Hyundai Creta 2023', price: '$31,500', specs: 'Petrol | Auto | 19.4 km/l', tag: 'POPULAR', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=600' },
  ];

  const motorcyclesData = [
    { id: 'm1', name: 'Honda ADV 160cc 2024', price: '$4,300', specs: 'Automatic | 160cc', tag: 'HOT', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600' },
    { id: 'm2', name: 'Yamaha TMAX 560 Tech', price: '$12,800', specs: '560cc | Auto', tag: 'LUXURY', img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=600' },
    { id: 'm3', name: 'Honda Dream 125 2024', price: '$2,750', specs: 'Manual | 125cc', tag: 'POPULAR', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600' },
    { id: 'm4', name: 'BMW R1250 GS Adventure', price: '$24,500', specs: '1250cc | Manual', tag: 'TOURING', img: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=600' },
    { id: 'm5', name: 'Vespa Sprint 150 ABS', price: '$4,900', specs: 'Automatic | 150cc', tag: 'STYLE', img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=600' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 font-sans selection:bg-red-600 selection:text-white">
      {/* Notice Banner */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>For more information or urgent service, please contact us!</span>
          </div>
          <Link href="/contact" className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-3 py-1 rounded-md text-[11px] transition-all">
            Contact Us Now &rarr;
          </Link>
        </div>
      </div>

      {/* 1. Header Navigation */}
      <Header />

      <main className="flex-grow">
        {/* 2. Hero Section (Modern, Sleek & Premium Look) */}
        <section className="relative bg-[#0b0f19] text-white pt-16 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/20 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 backdrop-blur-md text-xs font-medium text-slate-300">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>Trusted Automotive Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase">
                DRIVE YOUR DREAM. <br />
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-500 bg-clip-text text-transparent">
                  LIVE YOUR STYLE.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
                Buy, sell, trade, and finance any type of vehicle with complete confidence, guaranteed quality, and unmatched market value.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-1">
                <Link
                  href="/categories"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-xl shadow-red-600/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Find Vehicles</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/installment"
                  className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 font-semibold px-7 py-3.5 rounded-xl text-sm border border-slate-700/80 backdrop-blur-md transition-all duration-300 hover:border-slate-500 hover:text-white"
                >
                  <Calculator className="w-4 h-4 text-slate-400" />
                  <span>Calculate Installment</span>
                </Link>
              </div>

              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Car, title: '100+ In Stock' },
                  { icon: ShieldCheck, title: '20+ Popular Brands' },
                  { icon: RotateCcw, title: 'Easy Trade-In' },
                  { icon: Zap, title: 'Quick Financing' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:border-red-500/30 hover:bg-slate-900/70"
                    >
                      <Icon className="w-5 h-5 text-red-500" />
                      <span className="text-[11px] font-semibold text-slate-300 text-center">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Hero Image */}
           <div className="lg:col-span-6 relative flex items-center justify-center py-4 select-none group">
  {/* 1. Ambient Glow ស្រទន់នៅខាងក្រោយ (ទំហំតូចល្មម) */}
                <div className="absolute w-2/3 h-2/3 bg-red-600/15 rounded-full blur-[70px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

                {/* 2. រូបភាពឡាន (កំណត់ max-w-md ឬ max-w-lg ដើម្បីឱ្យតូចបន្តិច និងគ្មានជ្រុង) */}
               <img
                src="/images/hero-car.png"
                alt="Luxury Car"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain relative z-10 transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1.5 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.12)] group-hover:drop-shadow-[0_20px_35px_rgba(220,38,38,0.2)]"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop";
                }}
                />

                {/* 3. ស្រមោលបាតខាងក្រោមយ៉ាងស្អាត */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/15 rounded-[100%] blur-md pointer-events-none" />
                </div>
          </div>
        </section>

        {/* 3. Floating Quick Search Box */}
        <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-slate-200">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-red-600 text-white p-2 rounded-lg">
                  <Search className="w-4 h-4" />
                </div>
                <h2 className="text-base font-extrabold text-slate-900">Find Your Perfect Vehicle</h2>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'all' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  All Vehicles
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('car')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'car' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Cars
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('moto')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'moto' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Motorcycles
                </button>
              </div>
            </div>

            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <select className="w-full rounded-xl border border-slate-300 bg-white text-slate-700 text-xs p-3 focus:ring-1 focus:ring-red-500 outline-none">
                  <option>Select Brand </option>
                  <option>Toyota / Lexus</option>
                  <option>Ford</option>
                  <option>Honda / Yamaha</option>
                </select>
              </div>

              <div>
                <select className="w-full rounded-xl border border-slate-300 bg-white text-slate-700 text-xs p-3 focus:ring-1 focus:ring-red-500 outline-none">
                  <option>Select Model </option>
                  <option>Prius / LX600 / Raptor</option>
                  <option>ADV / Dream / GS</option>
                </select>
              </div>

              <div>
                <select className="w-full rounded-xl border border-slate-300 bg-white text-slate-700 text-xs p-3 focus:ring-1 focus:ring-red-500 outline-none">
                  <option>Max Price (Maximum Price)</option>
                  <option>Under $5,000</option>
                  <option>$5,000 - $20,000</option>
                  <option>Over $20,000</option>
                </select>
              </div>

              <div>
                <button
                  type="button"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs py-3 shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <Search className="w-3.5 h-3.5" /> Search Vehicles
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 4. CARS SECTION */}
        {(activeTab === 'all' || activeTab === 'car') && (
          <section className="max-w-7xl mx-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <Car className="w-6 h-6 text-red-600" /> EXPLORE OUR POPULAR CARS
              </h2>
              <Link href="/categories?type=car" className="text-xs font-bold text-slate-600 hover:text-red-600 flex items-center gap-1 transition-all">
                View All Cars &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {carsData.map((car) => (
                <VehicleCard key={car.id} vehicle={car} cardType="car" />
              ))}
            </div>
          </section>
        )}

        {/* 5. MOTORCYCLES SECTION */}
        {(activeTab === 'all' || activeTab === 'moto') && (
          <section className="bg-slate-200/50 py-12 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <Bike className="w-6 h-6 text-red-600" /> EXPLORE OUR POPULAR MOTORCYCLES
                </h2>
                <Link href="/categories?type=moto" className="text-xs font-bold text-slate-600 hover:text-red-600 flex items-center gap-1 transition-all">
                  View All Motorcycles &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {motorcyclesData.map((moto) => (
                  <VehicleCard key={moto.id} vehicle={moto} cardType="moto" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. BRANDS GRID */}
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">OUR TOP BRANDS</h2>
            <Link href="/categories" className="text-xs font-bold text-red-600 hover:underline">View All Brands &rarr;</Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
            {['TOYOTA', 'FORD', 'LEXUS', 'HONDA', 'BMW', 'YAMAHA'].map((brand, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm font-black text-slate-700 text-sm hover:border-red-500 hover:text-red-600 transition-all cursor-pointer">
                {brand}
              </div>
            ))}
          </div>
        </section>

        {/* 7. WHY CHOOSE US */}
        <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide">WHY CHOOSE G4 AUTO CARE?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <Car className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-xs text-slate-900">Wide Range</h3>
              <p className="text-[10px] text-slate-500 mt-1">100+ Vehicles Available</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-xs text-slate-900">Best Price Guarantee</h3>
              <p className="text-[10px] text-slate-500 mt-1">Get the best deal always</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <Zap className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-xs text-slate-900">Easy Finance</h3>
              <p className="text-[10px] text-slate-500 mt-1">Flexible EMI options</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <RotateCcw className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-xs text-slate-900">Exchange Offers</h3>
              <p className="text-[10px] text-slate-500 mt-1">Best exchange value</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 md:col-span-1">
              <Headphones className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <h3 className="font-bold text-xs text-slate-900">24/7 Support</h3>
              <p className="text-[10px] text-slate-500 mt-1">Trusted service & support</p>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}

// ==========================================
// 4. MAIN EXPORT WRAPPED WITH WISHLIST PROVIDER
// ==========================================
export default function Home() {
  return (
    <WishlistProvider>
      <HomeContent />
    </WishlistProvider>
  );
}