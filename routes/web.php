<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// root + auth routes inside web middleware group
Route::middleware('web')->group(function () {

    Route::get('/', function () {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        return redirect()->route('login');
    });

    // dashboard & profile routes (already require auth)
    Route::middleware(['auth', 'verified'])->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard', [
                'auth' => [
                    'user' => Auth::user()
                ]
            ]);
        })->name('dashboard');

        // PROFILE
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // EMPLOYEE ROUTES — FIXED
        Route::resource('employees', EmployeeController::class)
            ->only(['index','store','show','destroy']);
    });

    // include Breeze auth routes
    require __DIR__ . '/auth.php';
});
