<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes - G4 Auto Care
|--------------------------------------------------------------------------
*/

// ==========================================
// 1. PUBLIC ROUTES (ទំព័រសាសារណៈ)
// ==========================================

// ទំព័រដើម (Home Page)
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// ទំព័រប្រភេទយានយន្ត/ទំនិញ (Categories)
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');

// ទំព័របង្ហាញលម្អិតទំនិញ (Product Details)
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');

// ទំព័របង់រំលោះ (Installment Calculator/Info)
Route::get('/installment', function () {
    return Inertia::render('Installment');
})->name('installment');

// ទំព័រវៃដូរ/លក់ចូល (Trade-In Form/Info)
Route::get('/trade-in', function () {
    return Inertia::render('TradeIn');
})->name('tradein');

// ទំព័រទំនាក់ទំនង (Contact Us)
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');


// ==========================================
// 2. SHOPPING CART, WISHLIST & CHECKOUT
// ==========================================

// កន្ត្រកទំនិញ (Cart)
Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

// ទំព័រ និងមុខងារ Wishlist
Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist');
Route::post('/wishlist/toggle', [WishlistController::class, 'toggle'])->name('wishlist.toggle');

// ទំព័របំពេញ Form បញ្ជាទិញ / ស្នើសុំ (Checkout Page)
Route::get('/checkout', [OrderController::class, 'showCheckout'])->name('checkout');

// បញ្ជូនទិន្នន័យ Checkout -> ជូនដំណឹងទៅ Telegram Admin
Route::post('/checkout', [OrderController::class, 'store'])->name('checkout.store');


// ==========================================
// 3. AUTHENTICATED USER ROUTES (សម្រាប់សមាជិក/អតិថិជន)
// ==========================================

Route::middleware(['auth'])->group(function () {
    // គណនីខ្ញុំ (ប្រវត្តិបញ្ជាទិញ/សំណើវៃដូរ-រំលោះ)
    Route::get('/account', [OrderController::class, 'userOrders'])->name('account.orders');
});


// ==========================================
// 4. ADMIN DASHBOARDS (គ្រប់គ្រងប្រព័ន្ធ)
// ==========================================

// Branch Admin Dashboard (សម្រាប់ Admin តាមសាខា)
Route::middleware(['auth', 'can:access-branch-admin'])->group(function () {
    Route::get('/admin-branch', function () {
        return Inertia::render('AdminBranchDashboard');
    })->name('admin.branch');
});

// Super Admin Dashboard (សម្រាប់ Admin ធំ)
Route::middleware(['auth', 'can:access-super-admin'])->group(function () {
    Route::get('/admin-super', function () {
        return Inertia::render('AdminSuperDashboard');
    })->name('admin.super');
});

// Auth Routes (Login, Register, Logout) បង្កើតដោយ Laravel Breeze/Fortify
require __DIR__.'/auth.php';