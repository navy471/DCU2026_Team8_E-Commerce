import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Heart, ShoppingCart, Menu, X, User, LogIn, UserPlus } from 'lucide-react';
import { useWishlist } from '@/Context/WishlistContext'; // ត្រូវប្រាកដថា Path នេះត្រឹមត្រូវ

export default function Header() {
  const { auth, cartCount = 0 } = usePage().props; // ទាញ cartCount ចេញពី props (ប្រសិនបើមាន)
  const { wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 text-gray-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-4">
          
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="G4 Auto Care Logo" 
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-wider uppercase text-gray-900 leading-none">
                G4 <span className="text-red-600">AUTO CARE</span>
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-gray-500 uppercase mt-0.5">
                Premium Automotive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-700">
            <Link href="/" className="hover:text-red-600 transition-colors">HOME</Link>
            <Link href="/categories" className="hover:text-red-600 transition-colors">VEHICLE TYPE</Link>
            <Link href="/installment" className="hover:text-red-600 transition-colors">INSTALLMENT</Link>
            <Link href="/trade-in" className="hover:text-red-600 transition-colors">TRADE-IN</Link>
            <Link href="/contact" className="hover:text-red-600 transition-colors">CONTACT</Link>
          </nav>

          {/* User Actions, Wishlist & Cart */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Wishlist Button (បេះដូង) */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 transition-all duration-300 hover:scale-105 active:scale-95"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 transition-colors ${wishlist?.length > 0 ? 'text-red-600 fill-red-600' : 'text-gray-600'}`} />
              {wishlist?.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-red-500/30">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button (កន្ត្រក) */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 transition-all duration-300 hover:scale-105 active:scale-95"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-red-500/30">
                {cartCount}
              </span>
            </Link>

            {/* Authentication UI */}
            {auth?.user ? (
              <Link
                href="/account"
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-800 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all duration-300"
              >
                <User className="w-4 h-4 text-red-600" />
                <span className="truncate max-w-[120px]">{auth.user.name}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link 
                  href="/login" 
                  className="text-sm font-bold text-gray-700 hover:text-red-600 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-red-600/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Quick Icons */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Wishlist Quick Icon */}
            <Link href="/wishlist" className="relative p-2 text-gray-600">
              <Heart className={`w-5 h-5 ${wishlist?.length > 0 ? 'text-red-600 fill-red-600' : ''}`} />
              {wishlist?.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Mobile Cart Quick Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 hover:text-red-600 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-300 shadow-lg">
          <nav className="flex flex-col space-y-1 text-sm font-semibold">
            <Link href="/" className="block py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-red-600">Home</Link>
            <Link href="/categories" className="block py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-red-600">Vehicle Types</Link>
            <Link href="/installment" className="block py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-red-600">Installment</Link>
            <Link href="/trade-in" className="block py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-red-600">Trade-In</Link>
            <Link href="/contact" className="block py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-red-600">Contact</Link>
          </nav>
          
          <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col space-y-3">
            {auth?.user ? (
              <Link href="/account" className="flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-xl text-gray-800 font-bold">
                <User className="w-4 h-4 text-red-600" />
                My Account ({auth.user.name})
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" className="flex items-center justify-center gap-2 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-bold">
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>
                <Link href="/register" className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md shadow-red-600/20">
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}