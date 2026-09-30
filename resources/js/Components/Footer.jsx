import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: About & Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black text-red-500">G4</span>
              <span className="text-lg font-bold text-white">AUTO CARE</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A center for buying, selling, trading, and financing all types of vehicles, offering fast, reliable service and a high level of trust.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick link</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">VEHICLE TYPE</Link></li>
              <li><Link href="/installment" className="hover:text-white transition">INSTALLMENT</Link></li>
              <li><Link href="/trade-in" className="hover:text-white transition">TRADE-IN</Link></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Product Category</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories?type=car" className="hover:text-white transition">Cars</Link></li>
              <li><Link href="/categories?type=moto" className="hover:text-white transition">Motorcycles</Link></li>
              <li><Link href="/categories?type=bicycle" className="hover:text-white transition">Bicycles</Link></li>
              <li><Link href="/categories?type=parts" className="hover:text-white transition">Auto Parts</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact Information</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Location: Phnom Penh, Cambodia</li>
              <li>📞 Phone: 012 345 678 / 098 765 432</li>
              <li>✉️ Email: info@g4autocare.com</li>
              <li>💬 Telegram: @G4AutoCareAdmin</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} G4 Auto Care. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}