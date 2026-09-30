<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    /**
     * បង្ហាញទំព័រ Wishlist
     */
    public function index()
    {
        // Render ទៅកាន់ Page Component Resources/js/Pages/Wishlist.jsx
        return Inertia::render('Wishlist');
    }

    /**
     * រក្សាទុក ឬលុបចេញពី Wishlist (Database / Session)
     */
    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|integer',
        ]);

        // Logic រក្សាទុក ឬលុបចេញពី Database/Session

        return back()->with('message', 'បានធ្វើបច្ចុប្បន្នភាព Wishlist រួចរាល់');
    }
}