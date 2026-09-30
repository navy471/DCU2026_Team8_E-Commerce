import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header'; 
import { useWishlist } from '../Context/WishlistContext';
import { Heart, Trash2, ShoppingCart, ArrowLeft, Car, Eye, Sparkles } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <>
      <Head title="Wishlist - G4 Auto Care" />

      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-red-500 selection:text-white">
        {/* Header Navigation */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Top Header Banner & Navigation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-red-50 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-red-600 transition-colors mb-3 group"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Link>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                    <Heart className="w-6 h-6 fill-red-600" />
                  </div>
                  <span>Wishlist</span>
                  <span className="text-sm font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                    {wishlist?.length || 0}
                  </span>
                </h1>
              </div>

              {wishlist?.length > 0 && (
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Items in your wishlist
                </div>
              )}
            </div>
          </div>

          {/* Empty State UI */}
          {!wishlist || wishlist.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 sm:p-16 text-center shadow-sm border border-slate-200/80 my-4 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-red-100">
                <Heart className="w-12 h-12 stroke-[1.5]" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-slate-500 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                Browse our collection and add vehicles you like to your wishlist!
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-red-600/20 transition-all hover:scale-105 active:scale-95 text-sm"
              >
                <Car className="w-5 h-5" /> Browse Vehicles
              </Link>
            </div>
          ) : (
            /* Wishlist Items Grid Card */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={item.image || '/images/hero-car.png'}
                      alt={item.title || item.name || 'Vehicle'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop';
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Remove Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-3 right-3 p-2.5 bg-white/90 hover:bg-red-600 text-slate-600 hover:text-white rounded-2xl backdrop-blur-md shadow-md border border-white/50 transition-all duration-300 hover:scale-110 active:scale-90"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base group-hover:text-red-600 transition-colors line-clamp-1">
                        {item.title || item.name || 'Car Premium'}
                      </h3>
                      
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                        {item.subtitle || 'High-quality vehicle with comprehensive warranty'}
                      </p>

                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-red-600 tracking-tight">
                          ${item.price ? Number(item.price).toLocaleString() : 'N/A'}
                        </span>
                        {item.oldPrice && (
                          <span className="text-xs font-semibold text-slate-400 line-through">
                            ${Number(item.oldPrice).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                      <Link
                        href={`/products/${item.id}`}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" /> Details
                      </Link>
                      
                      <Link
                        href="/checkout"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 rounded-xl text-center shadow-md shadow-red-600/20 transition-all hover:shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}